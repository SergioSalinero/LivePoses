import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import RoutineInHistory from '@/components/RoutineInHistory';

import { GET_EXERCISES_URL, GET_ROUTINE_HISTORY_URL, POST_RESET_HISTORY_URL } from '@/utils/Config';

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
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import {
    BACKGROUND_COLOR,
    SIDE_BAR_COLOR,
    SIDE_BAR_BUTTON_COLOR,
    SIDE_BAR_BUTTON_HOVER_COLOR,
    SIDE_BAR_TEX_COLOR,
    FLOATING_CONTAINER_COLOR,
    DANGER_BUTTON_COLOR,
    SECTION_TEXT_COLOR,
} from '@/utils/Colors';


export default function RoutineHistory() {

    const router = useRouter();

    const [routines, setRoutines] = useState([]);
    var intRoutines;

    const [exercises, setExercises] = useState([]);

    var [token, setToken] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = BACKGROUND_COLOR;

        const storedToken = localStorage.getItem('accessToken');
        if (storedToken !== null && storedToken !== undefined) {
            setToken(storedToken);
            token = storedToken;
        }
        else {
            router.push('/Login');
        }
    })

    useEffect(() => {
        async function fetchRoutineHistory() {
            try {
                const response = await fetch(GET_ROUTINE_HISTORY_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                intRoutines = await response.json();
                setRoutines(intRoutines);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        async function fetchExerciseData() {
            try {
                const response = await fetch(GET_EXERCISES_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setExercises(jsonData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchExerciseData();
        fetchRoutineHistory();
    }, []);

    async function handleResetHistory() {
        try {
            const response = await fetch(POST_RESET_HISTORY_URL, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                router.push('/RoutineHistory');
            } else if (response.status === 500) {
                setError('Internal server error. Please try again later.');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error('Error processing request:', error);
            setError('Error processing request. Please try again later.');
        }
    }

    function handleRoutineClick(index) {
    }

    const StyleSheet = {
        content: {
            display: 'flex',
            flex: 1,
        },
        routines: {
            backgroundColor: 'transparent',
        },
        sectionTitle: {
            color: SECTION_TEXT_COLOR,
            fontSize: '30px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            marginTop: '0px',
        },
        floatingContainer: {
            backgroundColor: FLOATING_CONTAINER_COLOR,
            borderRadius: '20px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        },
        showRoutines: {
            flex: 3,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '50px',
        }
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    return (

        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={8}>
                    <Item>size=8</Item>
                </Grid>
                <Grid size={4} alignItems={'left'}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: SIDE_BAR_BUTTON_COLOR,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                            },
                            fontSize: '18px',
                            width: '100%'
                        }}
                        onClick={() => router.push('/Profile')}
                    >
                        <PersonIcon fontSize="medium" /> Profile
                    </Button>
                </Grid>
                <Grid size={2}>
                    <Stack spacing={2} direction="column">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: SIDE_BAR_BUTTON_COLOR,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                },
                                fontSize: '18px',
                                textAlign: 'right'
                            }}
                            onClick={() => router.push('/Home')}
                        >
                            <ClassIcon fontSize="large" /> Exercise categories
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: SIDE_BAR_BUTTON_COLOR,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                },
                                fontSize: '18px',
                                textAlign: 'right'
                            }}
                            onClick={() => router.push('/RoutineBuilding')}
                        >
                            <AddIcon fontSize="large" /> Create your own rutine
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: SIDE_BAR_BUTTON_COLOR,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                },
                                fontSize: '18px',
                                textAlign: 'right'
                            }}
                            onClick={() => router.push('/PublishRoutine')}
                        >
                            <PublishIcon fontSize="large" /> Publish a routine
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: SIDE_BAR_BUTTON_COLOR,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                },
                                fontSize: '18px',
                                textAlign: 'right'
                            }}
                            onClick={() => router.push('/Statistics')}
                        >
                            <BarChartIcon fontSize="large" /> Show statistics
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: SIDE_BAR_BUTTON_COLOR,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                },
                                fontSize: '18px',
                                textAlign: 'right'
                            }}
                            onClick={() => router.push('/RoutineHistory')}
                        >
                            <HistoryIcon fontSize="large" /> Show your history
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: SIDE_BAR_BUTTON_COLOR,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                },
                                fontSize: '18px',
                                textAlign: 'right'
                            }}
                            onClick={() => router.push('/ExerciseManagement')}
                        >
                            <FormatListNumberedIcon fontSize="large" /> Exercise management
                        </Button>
                    </Stack>
                </Grid>
                <Grid size={10}>
                    <div style={StyleSheet.routines}>
                        <div style={StyleSheet.floatingContainer}>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <p style={StyleSheet.sectionTitle}>Your history</p>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: DANGER_BUTTON_COLOR,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                        },
                                        fontSize: '18px',
                                        marginTop: '-15px'
                                    }}
                                    onClick={() => handleResetHistory()}
                                >
                                    RESET HISTORY
                                </Button>
                            </div>

                            <div style={StyleSheet.showRoutines}>
                                {routines.map((item, index) => (
                                    <RoutineInHistory
                                        key={index}
                                        onclick={() => handleRoutineClick(index)}
                                        routine={item}
                                        exercises={exercises}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}