import React, { useState, useEffect } from 'react';
import { FaRegTrashCan, FaArrowUp, FaArrowDown } from 'react-icons/fa6'

export default function RoutineExercise({ exercise, exercises }) {
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseSrc, setExerciseSrc] = useState('');

    
    useEffect(() => {
        const matchingExercise = exercises.find(item => item.id === exercise.exerciseId);
        if (matchingExercise) {
            setExerciseName(matchingExercise.name);
            setExerciseSrc(matchingExercise.src);
        }
    }, [exercise.exerciseId, exercises]);

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
            //padding: '1px',
            margin: '15px'
        },
        image: {
            width: '45px',
            marginLeft: '10px',
            borderRadius: '10px',
            padding: '5px'
        }
    }

    return (
        <div style={StyleSheet.containerStyle}>
            <p style={StyleSheet.text}>{exercise.repetitions} x </p>
            <img src={exerciseSrc} style={StyleSheet.image}></img>
            <p style={StyleSheet.text}>{exerciseName}</p>
        </div>
    );
}