import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaRegTrashCan, FaArrowUp, FaArrowDown } from 'react-icons/fa6'

import { POST_CURRENT_ROUTINE_URL } from '@/utils/Config';

import RoutineExercise from '@/components/RoutineExercise';

export default function Routine({ exercises, routine }) {
    const router = useRouter();
    var [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken !== null && storedToken !== undefined) {
            setToken(storedToken);
            token = storedToken;
        }
        else {
            router.push('/Login');
        }
    },[]);

    async function handleRoutineClicked() {
        const currentRoutine = {
            exercises: [],
            breakTime: routine.breakTime
        }

        for(let i=0; i<routine.exercises.length; i++) {
            const exerciseData = {
                exerciseId: routine.exercises[i].exerciseId,
                repetitions: routine.exercises[i].repetitions
            }
            currentRoutine.exercises.push(exerciseData);
        }

        if (currentRoutine.exercises.length > 0) {
            try {
                const response = await fetch(POST_CURRENT_ROUTINE_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentRoutine),
                });

                if (response.ok) {
                    router.push('/PoseRecognition');
                } else if (response.status === 500) {
                    console.log('Internal server error. Please try again later.');
                } else {
                    console.log('Invalid credentials');
                }
            } catch (error) {
                console.error('Error processing request:', error);
                console.log('Error processing request. Please try again later.');
            }
        }
    }

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
            scrollbarColor: 'rgba(255, 255, 255, 0.8) transparent',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'right',
        },
        descriptionStyle: {
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
            color: '#f7f7f7',
            fontSize: '16px',
            marginLeft: '10px'
        },
    }

    return (
        <button
            style={StyleSheet.containerStyle}
            onClick={handleRoutineClicked}
        >
            <p style={StyleSheet.descriptionStyle}>
                {routine.description ? (
                    <>
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Description:</span> {routine.description}
                    </>
                ) : (
                    <>
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Description:</span> Ø
                    </>
                )}
            </p>
            {routine.exercises.map((item, index) => (
                <RoutineExercise
                    key={index}
                    exercise={item}
                    exercises={exercises}
                />
            ))}

            <p style={StyleSheet.descriptionStyle}>
                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Break Time: {routine.breakTime} secs</span></p>
        </button>
    );
}