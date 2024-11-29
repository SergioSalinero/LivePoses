import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6'
import { IoMdAdd } from "react-icons/io";
import { MdPublish } from "react-icons/md";

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


import { GET_EXERCISES_URL, POST_PUBLISH_ROUTINE_URL } from '@/utils/Config';
import AddExercise from '@/components/AddExercise';

import { BACKGROUND_COLOR } from '@/utils/Colors';
import { SIDE_BAR_COLOR } from '@/utils/Colors';
import { SIDE_BAR_BUTTON_COLOR } from '@/utils/Colors';
import { SIDE_BAR_BUTTON_HOVER_COLOR } from '@/utils/Colors';
import { SIDE_BAR_TEX_COLOR } from '@/utils/Colors';
import { FLOATING_CONTAINER_COLOR } from '@/utils/Colors';
import { SECTION_TEXT_COLOR } from '@/utils/Colors';
import { SECTION_BUTTON_COLOR } from '@/utils/Colors';
import { SECTION_BUTTON_HOVER_COLOR } from '@/utils/Colors';
import { START_ROUTINE_BUTTON_COLOR } from '@/utils/Colors';
import { START_ROUTINE_BUTTON_HOVER_COLOR } from '@/utils/Colors';


export default function PublishRoutine() {

    const router = useRouter();
    const [exerciseComponents, setExerciseComponents] = useState([]);
    const [idComponent, setIdComponent] = useState(0);
    const [exercises, setExercises] = useState();
    const [loading, setLoading] = useState();
    const [breakTime, setBreakTime] = useState(0);
    const [routineDescription, setRoutineDescription] = useState('');

    const maxWords = 100;
    const [wordsRemaining, setWordsRemaining] = useState(maxWords);

    var [selectedCategory, setSelectedCategory] = useState('Rehabilitation');

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
            breakTime: breakTime,
            description: routineDescription,
            category: selectedCategory.replace(/\s+/g, '')
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
                const response = await fetch(POST_PUBLISH_ROUTINE_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentRoutine),
                });

                if (response.ok) {
                    router.push('/Home');
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

    const handleDescriptionChange = (event) => {
        setRoutineDescription(event.target.value);
        
        const wordsUsed = event.target.value.trim().split(/\s+/).length;
        setWordsRemaining(maxWords - wordsUsed);
    };

    const StyleSheet = {
        backgroundContainer: {
            height: '100vh',
            //width: '100vw',
            backgroundColor: BACKGROUND_COLOR,
            marginTop: '-16px',
            marginRight: '-8px',
            //paddingBottom: '0px',
            userSelect: 'none',
            fontFamily: 'Roboto, sans-serif',
            //overflowY: 'scroll'
        },
        mainContainer: {
            marginTop: '-10px',
            marginLeft: '-10px',
            //marginRight: '-8px',
            marginBottom: '-10px',
            backgroundColor: BACKGROUND_COLOR,
        },
        content: {
            display: 'flex',
            flex: 1,
        },
        sidebar: {
            flex: '0 0 300px',
            padding: '1rem',
            backgroundColor: SIDE_BAR_COLOR,
            height: '100%',
            position: 'fixed',
            //marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            //boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
        },
        sidebarTitle: {
            color: SIDE_BAR_TEX_COLOR,
            fontSize: '36px',
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            marginLeft: '5px',
            marginTop: '30px',
            width: '220px'
        },
        sidebarButton: {
            border: 'none',
            cursor: 'pointer',
            marginBottom: '10px',
            fontSize: '20px',
            textAlign: 'center',
            padding: '20px 10px 20px 10px',
            backgroundColor: SIDE_BAR_BUTTON_COLOR,
            color: SIDE_BAR_TEX_COLOR,
            borderRadius: '20px',
        },
        spanIcon: {
            fontSize: '40px',
        },
        sidebarDivider: {
            margin: '10px 5px 10px 5px',
            backgroundColor: "rgba(255, 255, 255, 0.2)"
        },
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
        sectionDivider: {
            width: '99%',
            marginTop: '-20px',
            marginBottom: '15px'
        },
        sidebarButtonHover: {
            backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
        },
        addButton: {
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
            marginBottom: '10px',
            fontSize: '25px',
            fontWeight: 600,
            backgroundColor: SECTION_BUTTON_COLOR,
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '15px',
            cursor: 'pointer'
        },
        restTimeSlider: {
            width: '99%',
            padding: '5px',
            borderRadius: '10px',
            background: `linear-gradient(to right, #FF6200 ${breakTime}%, #E0E0DF ${breakTime}%)`,
            transition: 'background-color 0.3s ease',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            appearance: 'none',
            cursor: 'pointer',
            outline: 'none',
        },
        restTimeSliderNumber: {
            width: '45px',
            height: '20px',
            background: `linear-gradient(to right, transparent ${breakTime}%, transparent ${breakTime}%)`,
            background: 'white',
            transition: 'background-color 0.3s ease',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            appearance: 'none',
            cursor: 'pointer',
            outline: 'none',
            border: 'none',
            borderRadius: '20px',
            fontSize: '18px'
        },
        startRoutineButton: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '30px',
            display: 'block',
            marginBottom: '10px',
            fontSize: '28px',
            fontWeight: 600,
            backgroundColor: START_ROUTINE_BUTTON_COLOR,
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '15px',
            cursor: 'pointer',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            width: '50%'
        },
        startRoutineButtonHover: {
            backgroundColor: START_ROUTINE_BUTTON_HOVER_COLOR,
        },
        floatingContainer: {
            backgroundColor: FLOATING_CONTAINER_COLOR,
            borderRadius: '5px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
        },
        textarea: {
            width: '70%',
            height: '100px',
            padding: '10px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px',
            display: 'block',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'none',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
        },
    
        wordsRemaining: {
            width: '85%',
            textAlign: 'right',
            color: '#F5F5F5',
            fontSize: '14px',
        },
        floatingContainer: {
            backgroundColor: FLOATING_CONTAINER_COLOR,
            borderRadius: '5px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px'
        },
        selectCategory: {
            backgroundColor: SECTION_BUTTON_COLOR,
            color: 'white',
            height: '50px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            fontFamily: 'Roboto, sans-serif',
            marginRight: '20px',
            cursor: 'pointer'
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
                                        color: '#4caf50', // Cambia el color principal (track y thumb)
                                        '& .MuiSlider-thumb': {
                                            backgroundColor: '#388e3c', // Color del thumb
                                        },
                                        '& .MuiSlider-rail': {
                                            backgroundColor: '#bdbdbd', // Color de la pista no activa
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: '#4caf50', // Color de la pista activa
                                        },
                                    }}
                                    onChange={(event) => setBreakTime(event.target.value)}
                                    value={breakTime}
                                />
                            </Box>
                        </div>

                        <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Give a description</p>

                        <textarea
                            value={routineDescription}
                            onChange={handleDescriptionChange}
                            placeholder="Write a description..."
                            style={StyleSheet.textarea}
                        />
                        <p style={StyleSheet.wordsRemaining}>{wordsRemaining} words remaining</p>
                    </div>

                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Select a category</p>

                        <select
                            style={StyleSheet.selectCategory}
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}>
                                <option value="Rehabilitation">Rehabilitation</option>
                                <option value="Flexibility & Mobility">Flexibility & Mobility</option>
                                <option value="Muscle & Strenght">Muscle & Strenght</option>
                                <option value="Equilibrium">Equilibrium</option>
                        </select>
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
                                width: '50%'
                            }}
                            onClick={handleStartRoutine}
                        >
                            Start routine
                        </Button>

                    </div>

                </Grid>
            </Grid>
        </Box>
    );
        /*<div style={StyleSheet.backgroundContainer}>
            <div style={StyleSheet.mainContainer}>
                <div style={StyleSheet.content}>
                    <div style={StyleSheet.sidebar}>
                        <p style={StyleSheet.sidebarTitle}>Live Poses</p>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                            onClick={() => router.push('/Home')}
                        >
                            <span style={StyleSheet.spanIcon}><FaArrowLeft /></span>
                            <br></br>
                            Back to Home
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                            onClick={() => router.push('RoutineBuilding')}
                        >
                            <span style={StyleSheet.spanIcon}><IoMdAdd /></span>
                            <br></br>
                            Create your own rutine
                        </button>
                        <hr style={StyleSheet.sidebarDivider} />
                        <button
                            style={{
                                ...StyleSheet.sidebarButton,
                                marginTop: '10px',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                            onClick={() => router.push('/Profile')}
                        >
                            Profile
                        </button>
                    </div>
                </div>

                <div style={StyleSheet.addExerciseContainer}>
                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Routine construction to be published</p>

                        {exerciseComponents}
                        <button
                            style={StyleSheet.addButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = SECTION_BUTTON_HOVER_COLOR}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.addButton.backgroundColor}
                            onClick={handleAddExercise}
                        >
                            Add exercise
                        </button>
                    </div>

                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Set rest time (secs)</p>
                        <hr style={StyleSheet.sectionDivider} />

                        <input
                            type="number"
                            value={breakTime}
                            style={{ ...StyleSheet.restTimeSliderNumber, marginLeft: `calc(${breakTime}% - 22px)` }}
                        />

                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={breakTime}
                            style={StyleSheet.restTimeSlider}
                            onChange={(event) => setBreakTime(event.target.value)}
                        />
                    </div>

                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Give a description</p>

                        <textarea
                            value={routineDescription}
                            onChange={handleDescriptionChange}
                            placeholder="Write a description..."
                            style={StyleSheet.textarea}
                        />
                        <p style={StyleSheet.wordsRemaining}>{wordsRemaining} words remaining</p>
                    </div>

                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Select a category</p>

                        <select
                            style={StyleSheet.selectCategory}
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}>
                                <option value="Rehabilitation">Rehabilitation</option>
                                <option value="Flexibility & Mobility">Flexibility & Mobility</option>
                                <option value="Muscle & Strenght">Muscle & Strenght</option>
                                <option value="Equilibrium">Equilibrium</option>
                        </select>
                    </div>

                    <button
                        style={StyleSheet.startRoutineButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.startRoutineButtonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.startRoutineButton.backgroundColor}
                        onClick={handleStartRoutine}
                    >
                        Publish routine
                    </button>

                </div>
            </div>
        </div>*/
    
}