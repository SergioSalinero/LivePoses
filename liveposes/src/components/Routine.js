import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaRegTrashCan, FaArrowUp, FaArrowDown } from 'react-icons/fa6'

import { POST_CURRENT_ROUTINE_URL, POST_DELETE_CATEGORY_ROUTINE_URL } from '@/utils/Config';


import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions'

import {
    SIDE_BAR_BUTTON_HOVER_COLOR,
    START_ROUTINE_BUTTON_COLOR,
    DANGER_BUTTON_COLOR
} from '@/utils/Colors';

import RoutineExercise from '@/components/RoutineExercise';

export default function Routine({ exercises, routine, category }) {
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
    }, []);

    async function handleRoutineClicked() {
        const currentRoutine = {
            exercises: [],
            breakTime: routine.breakTime
        }

        for (let i = 0; i < routine.exercises.length; i++) {
            const exerciseData = {
                exerciseId: routine.exercises[i].exerciseId,
                repetitions: routine.exercises[i].repetitions,
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

    async function handleDeleteRoutine() {
        try {
            const response = await fetch(POST_DELETE_CATEGORY_ROUTINE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: routine.id,
            });

            if (response.ok) {
                router.push('/CategoryRoutines?category=' + category);
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

    return (
        <Card sx={{
            maxWidth: 345,
            width: 'auto',
            height: '100%',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: '#0D0D0D',
            border: 'none',
            outline: 'none',
            borderRadius: '5px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            marginRight: '20px',
            fontFamily: 'Roboto, sans-serif',
            justifyContent: 'flex-start'
        }}
        >
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {routine.description ? (
                            <>
                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Description:</span> <span style={{ opacity: 0.7 }}>{routine.description}</span>
                            </>
                        ) : (
                            <>
                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Description:</span> Ø
                            </>
                        )}
                    </Typography>

                    <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Break Time:</span> {routine.breakTime} secs
                    </Typography>

                    <Typography gutterBottom variant="h6" component="div">
                        {routine.exercises.map((item, index) => (
                            <RoutineExercise
                                key={index}
                                exercise={item}
                                exercises={exercises}
                            />
                        ))}
                    </Typography>

                </CardContent>

                <CardActions
                    sx={{
                        justifyContent: 'space-between',
                        width: '95%',
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: DANGER_BUTTON_COLOR,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                            },
                            fontSize: '16px',
                        }}
                        onClick={handleDeleteRoutine}
                    >
                        Delete
                    </Button>

                    <Button
                        size="medium"
                        color="primary"
                        sx={{
                            backgroundColor: START_ROUTINE_BUTTON_COLOR,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                            },
                            fontSize: '16px',
                        }}
                        onClick={handleRoutineClicked}
                    >
                        Access
                    </Button>
                </CardActions>
            </CardActionArea>

        </Card>

    );
}