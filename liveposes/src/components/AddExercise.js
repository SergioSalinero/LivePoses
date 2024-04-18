import React, { useState } from 'react';
import { FaRegTrashCan, FaArrowUp, FaArrowDown } from 'react-icons/fa6'

export default function handleAddExercise(props) {
    const [repetitions, setRepetitions] = useState(0);
    const [selectedExercise, setSelectedExercise] = useState('1');

    function handleAddRepetition() {
        setRepetitions(repetitions + 1);
        props.onUpdate(props.id, repetitions + 1, selectedExercise);
    }

    function handleSubtractRepetition() {
        if (repetitions > 0) {
            setRepetitions(repetitions - 1);
            props.onUpdate(props.id, repetitions - 1, selectedExercise);
        }
    }

    function handleRemoveExercise() {
        props.onRemove(props.id);
    }

    function handleExerciseChange(event) {
        setSelectedExercise(event.target.value);
        props.onUpdate(props.id, repetitions, event.target.value);
    }

    function handleMoveUpExercise() {
        props.onReorder(props.id, 'up');
    }

    function handleMoveDownExercise() {
        props.onReorder(props.id, 'down');
    }

    const StyleSheet = {
        containerStyle: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'blue'
        },
        repetitionCounterStyle: {
            color: 'white'
        }
    }

    return (
        <div style={StyleSheet.containerStyle}>
            <p style={StyleSheet.repetitionCounterStyle}>{repetitions} x </p>
            <select value={selectedExercise} onChange={handleExerciseChange}>
                {props.exercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                        {exercise.name}
                    </option>
                ))}
            </select>
            <button onClick={handleAddRepetition}>+</button>
            <button onClick={handleSubtractRepetition}>-</button>
            <button onClick={handleRemoveExercise}>
                <FaRegTrashCan />
            </button>
            <button onClick={handleMoveUpExercise}>
                <FaArrowUp />
            </button>
            <button onClick={handleMoveDownExercise}>
                <FaArrowDown />
            </button>
        </div>
    );
}