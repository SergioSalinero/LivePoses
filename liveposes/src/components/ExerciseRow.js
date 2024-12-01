import React, { useState, useEffect } from 'react';
import { FaRegTrashCan, FaArrowUp, FaArrowDown } from 'react-icons/fa6'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ExerciseRow({ exercise }) {


    const StyleSheet = {
        containerStyle: {
            backgroundColor: '#171717',
            borderRadius: '5px',
            marginBottom: '15px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            width: 'auto',
            fontSize: '15px',
            fontWeight: '600',
            color: '#f7f7f7',
            padding: '1px',
            display: 'flex',
            alignItems: 'center'
        },
        text: {
            margin: '5px 5px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        image: {
            width: '45px',
            marginLeft: '10px',
            borderRadius: '10px',
            padding: '5px'
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={exercise.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {exercise.name}
                            </TableCell>
                            <TableCell align="right">{exercise.name}</TableCell>
                            <TableCell align="right">{exercise.name}</TableCell>
                            <TableCell align="right">{exercise.name}</TableCell>
                            <TableCell align="right"><img src={exercise.src} style={StyleSheet.image}></img></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
    /*<div style={StyleSheet.containerStyle}>
        <p style={StyleSheet.text}>{exercise.id}</p>
        <p style={StyleSheet.text}>{exercise.name}</p>
        <p style={StyleSheet.text}>{exercise.src}</p>
        <img src={exercise.src} style={StyleSheet.image}></img>
    </div>*/
}