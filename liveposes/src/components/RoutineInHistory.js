import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaRegTrashCan, FaArrowUp, FaArrowDown } from 'react-icons/fa6'

import { POST_CURRENT_ROUTINE_URL } from '@/utils/Config';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import ClassIcon from '@mui/icons-material/Class';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions'

import {
    BACKGROUND_COLOR,
    SIDE_BAR_COLOR,
    SIDE_BAR_BUTTON_COLOR,
    SIDE_BAR_BUTTON_HOVER_COLOR,
    SIDE_BAR_TEX_COLOR,
    FLOATING_CONTAINER_COLOR,
    SECTION_TEXT_COLOR,
    START_ROUTINE_BUTTON_COLOR,
    START_ROUTINE_BUTTON_HOVER_COLOR
} from '@/utils/Colors';

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
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Accuracy:</span> {routine.accuracy}%
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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Button
                        size="medium"
                        color="primary"
                        sx={{
                            backgroundColor: START_ROUTINE_BUTTON_COLOR,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: START_ROUTINE_BUTTON_HOVER_COLOR,
                            },
                            fontSize: '18px',
                            textAlign: 'right'
                        }}
                        onClick={handleRoutineClicked}
                    >
                        Access
                    </Button>
                </CardActions>
            </CardActionArea>

        </Card >

    );
    /*<button
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
);*/
}