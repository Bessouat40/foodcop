from sqlalchemy import create_engine, text
from dotenv import load_dotenv, find_dotenv
from os import environ
import json

load_dotenv(find_dotenv())

POSTGRES_USER=environ.get("POSTGRES_USER")
POSTGRES_PASSWORD=environ.get("POSTGRES_PASSWORD")
POSTGRES_DB=environ.get("POSTGRES_DB")
HOST=environ.get("HOST")
PORT=environ.get("PORT")

class Database() :
    
    def __init__(self):

        self.engine = create_engine(f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{HOST}:{PORT}/{POSTGRES_DB}")
        self.conn = self.engine.connect()
        self.add_data = []

    def require(self) :
        """Require informations to Postgres database

                Returns:
            data: data stored in Postgres database
        """
        query1 = text("SELECT * FROM weekMenus")
        query2 = text("SELECT * FROM menus")
        weekMenus = self.conn.execute(query1).fetchall()
        menus = self.conn.execute(query2).fetchall()
        return weekMenus, menus
    
    def addMenuToDayPhase(self, menu, day, phase, menuDetails, intakes) :
        ingredients, quantite = [], []
        menuDetails = json.loads(menuDetails)
        for aliment in menuDetails :
            ingredients.append(aliment["ALIMENT"].replace("'", " "))
            quantite.append(str(aliment["QUANTITY"]))
        ingredients = '#@&@#'.join(ingredients)
        quantite = ','.join(quantite)
        query1 = text(f"UPDATE weekMenus SET menu='{menu}' WHERE weekMenus.phase='{phase}' AND weekMenus.jour='{day}'")
        self.conn.execute(query1)
        query2 = text(f"INSERT INTO menus (id, menu, ingredients, quantite, intakes) VALUES (default, '{menu}', '{ingredients}', '{quantite}', '{intakes}')")
        # query2 = text(f"INSERT INTO menus (menu, ingredients, quantite, intakes) SELECT '{menu}', '{ingredients}', '{quantite}', '{intakes}' WHERE NOT EXISTS ( SELECT menu, ingredients FROM menus WHERE menu = '{menu}' AND ingredients = '{ingredients}');")
        self.conn.execute(query2)

    def delete_menu_from_menu_list(self, menu_name):
        query = text(f"UPDATE weekMenus SET menu='' WHERE weekMenus.menu='{menu_name}'")
        self.conn.execute(query)
        query = text(f"DELETE FROM menus WHERE menu='{menu_name}'")
        self.conn.execute(query)
    
    def delete_menu_from_week_calendar(self, menu_name, phase, jour):
        query = text(f"UPDATE weekMenus SET menu='' WHERE weekMenus.menu='{menu_name}' AND weekMenus.jour='{jour}' AND weekMenus.phase='{phase}'")
        self.conn.execute(query)
