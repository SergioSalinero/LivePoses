import React, { useState, useEffect } from 'react';
import { FaRegTrashCan, FaArrowUp, FaArrowDown } from 'react-icons/fa6'

export default function RoutineExercise({ exercise, exercises }) {
    const [exerciseName, setExerciseName] = useState('');
    
    //console.log(exercise);

    
    useEffect(() => {
        const matchingExercise = exercises.find(item => item.id === exercise.exerciseId);
        if (matchingExercise) {
            setExerciseName(matchingExercise.name);
        }
    }, [exercise.exerciseId, exercises]);

    const StyleSheet = {
        containerStyle: {
            backgroundColor: '#171717',
            borderRadius: '20px',
            marginBottom: '15px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            width: '380px',
            fontSize: '20px',
            fontWeight: '600',
            color: '#f7f7f7',
            padding: '1px'
        },
        text: {
            //padding: '1px',
            margin: '15px'
        }
    }

    return (
        <div style={StyleSheet.containerStyle}>
            <p style={StyleSheet.text}>{exercise.repetitions}x {exerciseName}</p>
        </div>
    );
}