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
import TextField from '@mui/material/TextField';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EditIcon from '@mui/icons-material/Edit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ExerciseRow from '../components/ExerciseRow';

import {
    GET_EXERCISES_URL,
    POST_DELETE_EXERCISE_URL
} from '@/utils/Config';

import {
    BACKGROUND_COLOR,
    FLOATING_CONTAINER_COLOR,
    SECTION_TEXT_COLOR,
    SECTION_BUTTON_COLOR,
    SECTION_BUTTON_HOVER_COLOR,
    DANGER_BUTTON_COLOR,
    SIDE_BAR_BUTTON_COLOR,
    SIDE_BAR_BUTTON_HOVER_COLOR,
    START_ROUTINE_BUTTON_COLOR,
    START_ROUTINE_BUTTON_HOVER_COLOR
} from '@/utils/Colors';



export default function ExerciseManagement() {

    const [error, setError] = useState(null);
    const router = useRouter();

    var [token, setToken] = useState('');

    const [exercises, setExercises] = useState([]);

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

        async function fetchExercises() {
            try {
                const response = await fetch(GET_EXERCISES_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    //router.push('/Login');
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setExercises(jsonData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchExercises();
    }, []);

    function handleAddExercise() {
        router.push('/AddExerciseManagement');
    }

    async function handleRemoveExercise(id) {
        try {
            const response = await fetch(POST_DELETE_EXERCISE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: id,
            });

            if (response.ok) {
                router.push('/ExerciseManagement');
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

    function handleEditExercise(id) {
        router.push('/EditExercise?id=' + id);
    }

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

    const StyleSheet = {
        container: {
            backgroundColor: BACKGROUND_COLOR,
            //height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: SECTION_TEXT_COLOR,
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: FLOATING_CONTAINER_COLOR,
            borderRadius: '5px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
        },
        profileBox: {
            backgroundColor: FLOATING_CONTAINER_COLOR,
            padding: '30px',
            borderRadius: '8px',
            textAlign: 'center',
            width: '320px',
        },
        header: {
            color: SECTION_TEXT_COLOR,
            fontSize: '24px',
            marginBottom: '20px',
        },
        infoContainer: {
            marginBottom: '20px',
            fontSize: '22px'
        },
        label: {
            color: SECTION_TEXT_COLOR,
            fontSize: '22px',
            marginBottom: '10px',
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        button: {
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: SECTION_BUTTON_COLOR,
            color: SECTION_TEXT_COLOR,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        deleteButton: {
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: DANGER_BUTTON_COLOR,
            color: SECTION_TEXT_COLOR,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        weightDiv: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            marginLeft: '20px'
        },
        buttonHover: {
            backgroundColor: SECTION_BUTTON_HOVER_COLOR,
        },
        deleteButtonHover: {
            backgroundColor: '#FF1744', // Color de hover para el botón de eliminación
        },
        inputStyle: {
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '2px solid #ccc',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#f9f9f9',
        },
        inputFocusStyle: {
            border: '2px solid #4caf50',
            boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)',
        },
        exercises: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        },
        image: {
            width: '50px',
            marginLeft: '10px',
            borderRadius: '10px',
            padding: '5px'
        },
        sectionTitle: {
            color: SECTION_TEXT_COLOR,
            fontSize: '30px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            marginTop: '0px',
        },
    };


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

                    <div style={StyleSheet.container}>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                                gap: '10px'
                            }}
                        >

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <p style={StyleSheet.sectionTitle}>Current exercises</p>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: START_ROUTINE_BUTTON_COLOR,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: START_ROUTINE_BUTTON_HOVER_COLOR,
                                        },
                                        fontSize: '18px',
                                        marginTop: '-15px'
                                    }}
                                    onClick={() => handleAddExercise()}
                                >
                                    ADD EXERCISE
                                </Button>
                            </div>


                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>ID</TableCell>
                                            <TableCell align="right">Name</TableCell>
                                            <TableCell align="right">Image</TableCell>
                                            <TableCell align="right">Right Keypoint 1</TableCell>
                                            <TableCell align="right">Right Keypoint 2</TableCell>
                                            <TableCell align="right">Right Keypoint 3</TableCell>
                                            <TableCell align="right">Right Keypoint Distance 1</TableCell>
                                            <TableCell align="right">Right Keypoint Distance 2</TableCell>
                                            <TableCell align="right">Left Keypoint 1</TableCell>
                                            <TableCell align="right">Left Keypoint 2</TableCell>
                                            <TableCell align="right">Left Keypoint 3</TableCell>
                                            <TableCell align="right">Left Keypoint Distance 1</TableCell>
                                            <TableCell align="right">Left Keypoint Distance 2</TableCell>
                                            <TableCell align="right">Upper Angle Max</TableCell>
                                            <TableCell align="right">Upper Angle Min</TableCell>
                                            <TableCell align="right">Lower Angle Max</TableCell>
                                            <TableCell align="right">Lower Angle Min</TableCell>
                                            <TableCell align="right">Recognition Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {exercises.map((item) => (
                                            <TableRow
                                                key={item.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            backgroundColor: '#E0E0E0',
                                                            color: 'black',
                                                            '&:hover': {
                                                                backgroundColor: '#B3B2B2',
                                                            },
                                                            fontSize: '15px',
                                                        }}
                                                        onClick={() => handleEditExercise(item.id)}
                                                    >
                                                        <EditIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            backgroundColor: DANGER_BUTTON_COLOR,
                                                            color: 'white',
                                                            '&:hover': {
                                                                backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                                            },
                                                            fontSize: '15px',
                                                        }}
                                                        onClick={() => handleRemoveExercise(item.id)}
                                                    >
                                                        X
                                                    </Button>
                                                </TableCell>
                                                <TableCell component="th" scope="row">{item.id}</TableCell>
                                                <TableCell align="right">{item.name}</TableCell>
                                                <TableCell align="right"><img src={item.src} style={StyleSheet.image}></img></TableCell>
                                                <TableCell align="right">{item.rightKeyPoint1}</TableCell>
                                                <TableCell align="right">{item.rightKeyPoint2}</TableCell>
                                                <TableCell align="right">{item.rightKeyPoint3}</TableCell>
                                                <TableCell align="right">{item.rightKeyPointDistance1}</TableCell>
                                                <TableCell align="right">{item.rightKeyPointDistance2}</TableCell>
                                                <TableCell align="right">{item.leftKeyPoint1}</TableCell>
                                                <TableCell align="right">{item.leftKeyPoint2}</TableCell>
                                                <TableCell align="right">{item.leftKeyPoint3}</TableCell>
                                                <TableCell align="right">{item.leftKeyPointDistance1}</TableCell>
                                                <TableCell align="right">{item.leftKeyPointDistance2}</TableCell>
                                                <TableCell align="right">{item.upperAngleMax}</TableCell>
                                                <TableCell align="right">{item.upperAngleMin}</TableCell>
                                                <TableCell align="right">{item.lowerAngleMax}</TableCell>
                                                <TableCell align="right">{item.lowerAngleMin}</TableCell>
                                                <TableCell align="right">{item.recognitionType}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div>


                        <div style={StyleSheet.exercises}>

                            {/*exercises.map((item, index) => (
                                <ExerciseRow
                                    key={index}
                                    /*onclick={() => handleRoutineClick(index)}*
                                    exercise={item}
                                />
                            ))*/}
                        </div>
                    </div>

                </Grid>
            </Grid>
        </Box>
    );
};
