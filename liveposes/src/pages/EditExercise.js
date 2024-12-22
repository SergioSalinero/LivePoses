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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {
    POST_EXERCISE_URL,
    GET_EXERCISE_URL,
    POST_EDIT_EXERCISE_URL
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
import handleAddExercise from '@/components/AddExercise';



export default function EditExercise() {

    const [error, setError] = useState(null);
    const router = useRouter();
    var { id } = router.query;


    var [token, setToken] = useState('');

    var [name, setName] = useState('');
    var [src, setSrc] = useState('');
    var [rightKeyPoint1, setRightKeyPoint1] = useState();
    var [rightKeyPoint2, setRightKeyPoint2] = useState();
    var [rightKeyPoint3, setRightKeyPoint3] = useState();
    var [rightKeyPointDistance1, setRightKeyPointDistance1] = useState();
    var [rightKeyPointDistance2, setRightKeyPointDistance2] = useState();
    var [leftKeyPoint1, setLeftKeyPoint1] = useState();
    var [leftKeyPoint2, setLeftKeyPoint2] = useState();
    var [leftKeyPoint3, setLeftKeyPoint3] = useState();
    var [leftKeyPointDistance1, setLeftKeyPointDistance1] = useState();
    var [leftKeyPointDistance2, setLeftKeyPointDistance2] = useState();
    var [upperAngleMax, setUpperAngleMax] = useState();
    var [upperAngleMin, setUpperAngleMin] = useState();
    var [lowerAngleMax, setLowerAngleMax] = useState();
    var [lowerAngleMin, setLowerAngleMin] = useState();
    var [recognitionType, setRecognitionType] = useState('');

    var [exercise, setExercise] = useState([])

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

        async function fetchExercise() {
            try {
                const url = `${GET_EXERCISE_URL}?id=${id}`;
                const response = await fetch(url, {
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
                setExercise(jsonData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchExercise();
    }, [id]);

    useEffect(() => {
        if (exercise && Object.keys(exercise).length > 0) {
            setName(exercise.name || '');
            setSrc(exercise.src || '');
            setRightKeyPoint1(exercise.rightKeyPoint1);
            setRightKeyPoint2(exercise.rightKeyPoint2);
            setRightKeyPoint3(exercise.rightKeyPoint3);
            setRightKeyPointDistance1(exercise.rightKeyPointDistance1);
            setRightKeyPointDistance2(exercise.rightKeyPointDistance2);
            setLeftKeyPoint1(exercise.leftKeyPoint1);
            setLeftKeyPoint2(exercise.leftKeyPoint2);
            setLeftKeyPoint3(exercise.leftKeyPoint3);
            setLeftKeyPointDistance1(exercise.leftKeyPointDistance1);
            setLeftKeyPointDistance2(exercise.leftKeyPointDistance2);
            setUpperAngleMax(exercise.upperAngleMax);
            setUpperAngleMin(exercise.upperAngleMin);
            setLowerAngleMax(exercise.lowerAngleMax);
            setLowerAngleMin(exercise.lowerAngleMin);
            setRecognitionType(exercise.recognitionType || '');
        }
    }, [exercise]);


    async function handleEditExercise() {
        const body = {
            id: id,
            name: name,
            src: src,
            rightKeyPoint1: rightKeyPoint1,
            rightKeyPoint2: rightKeyPoint2,
            rightKeyPoint3: rightKeyPoint3,
            rightKeyPointDistance1: rightKeyPointDistance1,
            rightKeyPointDistance2: rightKeyPointDistance2,
            leftKeyPoint1: leftKeyPoint1,
            leftKeyPoint2: leftKeyPoint2,
            leftKeyPoint3: leftKeyPoint3,
            leftKeyPointDistance1: leftKeyPointDistance1,
            leftKeyPointDistance2: leftKeyPointDistance2,
            upperAngleMax: upperAngleMax,
            upperAngleMin: upperAngleMin,
            lowerAngleMax: lowerAngleMax,
            lowerAngleMin: lowerAngleMin,
            recognitionType: recognitionType
        }

        try {
            const response = await fetch(POST_EDIT_EXERCISE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '0 auto'
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
        inputDiv: {
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
            padding: '6px 8px',
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
                        <div sx={{
                            with: '100%'
                        }}>
                            <p style={StyleSheet.sectionTitle}>Current exercises</p>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
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
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <input
                                                    type="text"
                                                    placeholder={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="text"
                                                    placeholder={src}
                                                    onChange={(e) => setSrc(e.target.value)}
                                                    value={src}
                                                    style={{ ...StyleSheet.inputStyle, width: '200px' }}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={rightKeyPoint1}
                                                    onChange={(e) => setRightKeyPoint1(e.target.value)}
                                                    value={rightKeyPoint1}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={rightKeyPoint2}
                                                    onChange={(e) => setRightKeyPoint2(e.target.value)}
                                                    value={rightKeyPoint2}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={rightKeyPoint3}
                                                    onChange={(e) => setRightKeyPoint3(e.target.value)}
                                                    value={rightKeyPoint3}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={rightKeyPointDistance1}
                                                    onChange={(e) => setRightKeyPointDistance1(e.target.value)}
                                                    value={rightKeyPointDistance1}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={rightKeyPointDistance2}
                                                    onChange={(e) => setRightKeyPointDistance2(e.target.value)}
                                                    value={rightKeyPointDistance2}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right"><input
                                                type="number"
                                                placeholder={leftKeyPoint1}
                                                onChange={(e) => setLeftKeyPoint1(e.target.value)}
                                                value={leftKeyPoint1}
                                                style={StyleSheet.inputStyle}
                                            >
                                            </input></TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={leftKeyPoint2}
                                                    onChange={(e) => setLeftKeyPoint2(e.target.value)}
                                                    value={leftKeyPoint2}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={leftKeyPoint3}
                                                    onChange={(e) => setLeftKeyPoint3(e.target.value)}
                                                    value={leftKeyPoint3}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={leftKeyPointDistance1}
                                                    onChange={(e) => setLeftKeyPointDistance1(e.target.value)}
                                                    value={leftKeyPointDistance1}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={leftKeyPointDistance2}
                                                    onChange={(e) => setLeftKeyPointDistance2(e.target.value)}
                                                    value={leftKeyPointDistance2}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={upperAngleMax}
                                                    onChange={(e) => setUpperAngleMax(e.target.value)}
                                                    value={upperAngleMax}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={upperAngleMin}
                                                    onChange={(e) => setUpperAngleMin(e.target.value)}
                                                    value={upperAngleMin}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={lowerAngleMax}
                                                    onChange={(e) => setLowerAngleMax(e.target.value)}
                                                    value={lowerAngleMax}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="number"
                                                    placeholder={lowerAngleMin}
                                                    onChange={(e) => setLowerAngleMin(e.target.value)}
                                                    value={lowerAngleMin}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                            <TableCell align="right">
                                                <input
                                                    type="text"
                                                    placeholder={recognitionType}
                                                    onChange={(e) => setRecognitionType(e.target.value)}
                                                    value={recognitionType}
                                                    style={StyleSheet.inputStyle}
                                                >
                                                </input>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <div style={StyleSheet.profileBox}>
                                <div style={StyleSheet.buttonsContainer}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: START_ROUTINE_BUTTON_COLOR,
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: START_ROUTINE_BUTTON_HOVER_COLOR,
                                            },
                                            fontSize: '18px',
                                        }}
                                        onClick={() => handleEditExercise()}
                                    >
                                        EDIT EXERCISE
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Grid>
            </Grid>
        </Box>
    );
};
