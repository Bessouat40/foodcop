import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const WeekMenus = () => {
  const [rows, setRows] = useState();
  const joursSemaine = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ];

  useEffect(() => {
    const sendFetch = async () => {
      const resp = await fetch('http://localhost:8000/requireWeekMenus', {
        method: 'POST',
      });
      const data = await resp.json();
      return data;
    };

    /**
     * Receive data to display
     */
    const getData = async () => {
      const data = await sendFetch();
      const row = [];
      data.forEach((d) => {
        row.push(d);
      });
      formatData(row);
    };

    getData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#423325',
      color: 'white',
      borderRight: '1px solid white',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const formatData = (_rows) => {
    const phaseMenus = { matin: [], midi: [], soir: [] };

    _rows.forEach((dict) => {
      phaseMenus[dict['phase']].push(dict['menu']);
    });
    setRows(phaseMenus);
  };

  return (
    <Stack
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {rows ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center"></StyledTableCell>
                {joursSemaine.map((jour) => (
                  <StyledTableCell align="center">{jour}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(rows).map((phase) => (
                <TableRow key={phase}>
                  <TableCell
                    sx={{ backgroundColor: '#423325', color: 'white' }}
                    align="center"
                  >
                    {phase}
                  </TableCell>
                  {rows[phase].map((menu) => (
                    <TableCell
                      sx={{
                        borderRight: '1px solid grey',
                        borderBottom: '1px solid grey',
                      }}
                      align="center"
                    >
                      {menu}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Stack>
  );
};

export default WeekMenus;
