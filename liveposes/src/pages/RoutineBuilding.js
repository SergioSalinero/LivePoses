import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
import Slider from '@mui/material/Slider';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import { GET_EXERCISES_URL, POST_CURRENT_ROUTINE_URL } from '@/utils/Config';
import AddExercise from '@/components/AddExercise';

import { 
    BACKGROUND_COLOR, 
    SIDE_BAR_COLOR, 
    SIDE_BAR_BUTTON_COLOR, 
    SIDE_BAR_BUTTON_HOVER_COLOR, 
    SIDE_BAR_TEX_COLOR, 
    FLOATING_CONTAINER_COLOR, 
    SECTION_TEXT_COLOR, 
    SECTION_BUTTON_COLOR, 
    START_ROUTINE_BUTTON_COLOR, 
    START_ROUTINE_BUTTON_HOVER_COLOR 
  } from '@/utils/Colors';
  


export default function RoutineBuilding() {

    const router = useRouter();
    const [exerciseComponents, setExerciseComponents] = useState([]);
    const [idComponent, setIdComponent] = useState(0);
    const [exercises, setExercises] = useState();
    const [loading, setLoading] = useState();
    const [breakTime, setBreakTime] = useState(0);

    const [error, setError] = useState(null);
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

        async function fetchData() {
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
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!exercises) {
        return <div>No data available</div>
    }

    function handleAddExercise() {
        var key = exerciseComponents.length;
        console.log("Exercises:" + exercises)
        const newComponent = (
            <AddExercise
                key={key}
                id={idComponent}
                exercises={exercises}
                onRemove={(idToRemove) => handleRemoveExercise(idToRemove)}
                onUpdate={(id, repetitions, selectedExercise) => handleUpdateExerciseComponent(id, repetitions, selectedExercise)}
                onReorder={(id, direction) => handleReorderExerciseComponent(id, direction)}
            />
        );

        setIdComponent(idComponent + 1);
        setExerciseComponents([...exerciseComponents, newComponent]);
    }

    function handleRemoveExercise(idToRemove) {
        setExerciseComponents(prevComponents => {
            return prevComponents.filter((component) => component.props.id !== idToRemove);
        });
    }

    function handleUpdateExerciseComponent(id, repetitions, selectedExercise) {
        setExerciseComponents((prevComponents) => {
            return prevComponents.map((component) => {
                if (component.props.id === id) {
                    return React.cloneElement(component, { repetitions, selectedExercise });
                }

                return component;
            });
        });
    }

    function handleReorderExerciseComponent(id, direction) {
        setExerciseComponents((prevComponents) => {
            const index = prevComponents.findIndex((component) => component.props.id === id);
            if (index === -1) return prevComponents;

            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= prevComponents.length) return prevComponents;

            const updatedComponents = [...prevComponents];
            const removedComponent = updatedComponents.splice(index, 1)[0];
            updatedComponents.splice(newIndex, 0, removedComponent);

            return updatedComponents;
        });
    }

    async function handleStartRoutine() {
        const filteredExerciseComponents = exerciseComponents.filter(component => {
            return component.props.selectedExercise !== undefined && component.props.repetitions !== undefined && component.props.repetitions !== 0;
        });

        const currentRoutine = {
            exercises: [],
            breakTime: breakTime
        }

        filteredExerciseComponents.forEach(component => {
            const exerciseData = {
                exerciseId: component.props.selectedExercise,
                repetitions: component.props.repetitions
            };
            currentRoutine.exercises.push(exerciseData);
        });

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
                    setError('Internal server error. Please try again later.');
                } else {
                    setError('Invalid credentials');
                }
            } catch (error) {
                console.error('Error processing request:', error);
                setError('Error processing request. Please try again later.');
            }
        }
    }

    const StyleSheet = {
        addExerciseContainer: {
            backgroundColor: FLOATING_CONTAINER_COLOR,
            borderRadius: '5px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
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
            borderRadius: '5px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
        },
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
                    <div style={StyleSheet.addExerciseContainer}>
                        <div style={StyleSheet.floatingContainer}>
                            <p style={StyleSheet.sectionTitle}>Routine building</p>

                            {exerciseComponents}

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: SIDE_BAR_BUTTON_COLOR,
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                    },
                                    fontSize: '18px',
                                    textAlign: 'right',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    display: 'block'
                                }}
                                onClick={handleAddExercise}
                            >
                                Add exercise
                            </Button>

                        </div>


                        <div style={StyleSheet.floatingContainer}>
                            <p style={StyleSheet.sectionTitle}>Set rest time (secs)</p>

                            <Box sx={{ width: '100%' }}>
                                <Slider
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    getAriaValueText={(value) => `${value} secs`}
                                    valueLabelDisplay="auto"
                                    shiftStep={30}
                                    step={1}
                                    min={0}
                                    max={120}
                                    sx={{
                                        color: '#4caf50', 
                                        '& .MuiSlider-thumb': {
                                            backgroundColor: '#388e3c', 
                                        },
                                        '& .MuiSlider-rail': {
                                            backgroundColor: '#bdbdbd',
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: '#4caf50',
                                        },
                                    }}
                                    onChange={(event) => setBreakTime(event.target.value)}
                                    value={breakTime}
                                />
                            </Box>
                        </div>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: SIDE_BAR_BUTTON_COLOR,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                },
                                fontSize: '18px',
                                textAlign: 'center',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                display: 'block',
                                marginTop: '30px',
                                marginBottom: '10px',
                                fontSize: '28px',
                                fontWeight: 600,
                                backgroundColor: START_ROUTINE_BUTTON_COLOR,
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '15px',
                                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
                            }}
                            onClick={handleStartRoutine}
                        >
                            START ROUTINE
                        </Button>

                    </div>

                </Grid>
            </Grid>
        </Box>
    );
}