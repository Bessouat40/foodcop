from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from json import loads
from typing import List
from pydantic import BaseModel

from back import Configuration
from back import Menu

Configuration("/Users/labess40/dev/projet-patate/back/data/aliments.csv")

app = FastAPI()

class Item(BaseModel):
    QUANTITY: str
    id: str
    ALIMENT: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/require')
async def get_data():
    data = loads(Configuration().get_food_json())
    return data

@app.post('/menu')
async def get_data(items: List[Item]):
    food_dict = {}
    for item in items :
        food_dict[item.ALIMENT] = float(item.QUANTITY)
    menu = Menu(food_dict)
    print(menu.intakes)
    return menu.intakes