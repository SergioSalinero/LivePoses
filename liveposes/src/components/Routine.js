import React, { useState } from 'react';
import { FaRegTrashCan, FaArrowUp, FaArrowDown } from 'react-icons/fa6'

import RoutineExercise from '@/components/RoutineExercise';

export default function Routine({ exercises, routine }) {
    const [repetitions, setRepetitions] = useState(0);
    const [selectedExercise, setSelectedExercise] = useState('1');

    console.log(routine);

    const StyleSheet = {
        containerStyle: {
            backgroundColor: '#4A4A4A',
            borderRadius: '20px',
            marginBottom: '15px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            width: '400px',
            maxHeight: '300px',
            padding: '10px',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(248, 248, 248, 0.8) transparent'
        },
        descriptionStyle: {
            wordWrap: 'break-word',    
            wordBreak: 'break-all',  
            whiteSpace: 'normal',  
            color: '#FFFFFF',    
        },
    }

    return (
        <div style={StyleSheet.containerStyle}>
            <p style={StyleSheet.descriptionStyle}>Description: {routine.description}</p>
            {routine.exercises.map((item, index) => (
                <RoutineExercise
                    key={index}
                    exercise={item}
                    exercises={exercises}
                />
            ))}

            <p>Break Time: {routine.breakTime}</p>
        </div>
    );
}