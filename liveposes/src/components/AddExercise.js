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
            backgroundColor: '#4A4A4A',
            borderRadius: '20px',
            marginBottom: '15px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
        },
        contentContainer: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '20px',
        },
        repetitionCounterStyle: {
            color: 'white',
            fontSize: '30px',
            fontFamily: 'Roboto, sans-serif',
            marginRight: '20px'
        },
        selectExercise: {
            backgroundColor: '#2F2F2F',
            color: 'white',
            height: '50px',
            border: 'none',
            borderRadius: '20px',
            fontSize: '18px',
            fontFamily: 'Roboto, sans-serif',
            marginRight: '20px',
            cursor: 'pointer'
        },
        button: {
            backgroundColor: '#2F2F2F',
            color: 'white',
            borderRadius: '20px',
            border: 'none',
            fontSize: '24px',
            fontFamily: 'Roboto, sans-serif',
            marginRight: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            cursor: 'pointer'
        },
        sidebarButtonHover: {
            backgroundColor: '#4A4A4A',
        },
    }

    return (
        <div style={StyleSheet.containerStyle}>
            <div style={StyleSheet.contentContainer}>
                <p style={StyleSheet.repetitionCounterStyle}>{repetitions} x </p>
                <select style={StyleSheet.selectExercise} value={selectedExercise} onChange={handleExerciseChange}>
                    {props.exercises.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                            {exercise.name}
                        </option>
                    ))}
                </select>
                <button
                    style={StyleSheet.button}
                    onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.button.backgroundColor}
                    onClick={handleAddRepetition}
                >
                    &nbsp;+&nbsp;
                </button>
                <button
                    style={StyleSheet.button}
                    onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.button.backgroundColor}
                    onClick={handleSubtractRepetition}
                >
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                </button>
                <button
                    style={StyleSheet.button}
                    onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.button.backgroundColor}
                    onClick={handleRemoveExercise}
                >
                    <FaRegTrashCan />
                </button>
                <button
                    style={StyleSheet.button}
                    onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.button.backgroundColor}
                    onClick={handleMoveUpExercise}
                >
                    <FaArrowUp />
                </button>
                <button
                    style={StyleSheet.button}
                    onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.button.backgroundColor}
                    onClick={handleMoveDownExercise}
                >
                    <FaArrowDown />
                </button>
            </div>
        </div>
    );
}