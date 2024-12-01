import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa6'
import { IoMdAdd } from "react-icons/io";
import { MdPublish } from "react-icons/md";

import Routine from '@/components/Routine';

import { GET_EXERCISES_URL, GET_CATEGORY_ROUTINE_URL, POST_RESET_CATEGORY_ROUTINE_URL } from '@/utils/Config';

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
    SECTION_BUTTON_COLOR,
    SECTION_BUTTON_HOVER_COLOR,
    START_ROUTINE_BUTTON_COLOR,
    START_ROUTINE_BUTTON_HOVER_COLOR
 } from '@/utils/Colors';



export default function CategoryRoutines() {

    const router = useRouter();
    var { category } = router.query;
    var prevCategory = category;
    var [categoryForComponent, setCategoryForComponent] = useState("");
    

    const [routines, setRoutines] = useState([]);
    var intRoutines;

    const [exercises, setExercises] = useState([]);

    var [token, setToken] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        document.body.style.backgroundColor = BACKGROUND_COLOR;
        setCategoryForComponent(encodeURIComponent(prevCategory));

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
        if (category) {
            category = category.replace(/\s+/g, '')
            const encodedCategory = encodeURIComponent(category);
            const url = `${GET_CATEGORY_ROUTINE_URL}?${"category=" + encodedCategory}`;

            async function fetchCategoryCount() {
                try {
                    const response = await fetch(url, {
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
            fetchCategoryCount();
        }
    }, [category]);

    async function handleResetCategory() {
        try {
            const encodedCategory = encodeURIComponent(prevCategory);
            const body = prevCategory.replace(/\s+/g, "");

            const response = await fetch(POST_RESET_CATEGORY_ROUTINE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (response.ok) {
                router.push('/CategoryRoutines?category=' + encodedCategory);
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
            height: '100%',
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
        sidebarButtonHover: {
            backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR
        },
        sidebarDivider: {
            margin: '10px 5px 10px 5px',
            backgroundColor: "rgba(255, 255, 255, 0.2)"
        },
        routines: {
            backgroundColor: 'transparent',
        },
        sectionTitle: {
            color: SECTION_TEXT_COLOR,
            fontSize: '35px',
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
                                <p style={StyleSheet.sectionTitle}>{category}</p>
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
                                    onClick={() => handleResetCategory()}
                                >
                                    RESET CATEGORY
                                </Button>
                            </div>

                            <div style={StyleSheet.showRoutines}>
                                {routines.map((item, index) => (
                                    <Routine
                                        key={index}
                                        onclick={() => handleRoutineClick(index)}
                                        routine={item}
                                        exercises={exercises}
                                        category={categoryForComponent}
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