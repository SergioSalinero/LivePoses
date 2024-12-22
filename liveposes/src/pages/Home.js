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
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import ExerciseCategory from "@/components/ExerciseCategory";

import {
    GET_CATEGORY_COUNT_URL,
    GET_BASIC_STATISTICS_URL,
    GET_STATISTICS_URL
} from '@/utils/Config';

import frontLegRaiseImage from "../../public/images/exercises/FrontLegRaise.gif";
import lungesImage from "../../public/images/exercises/Lunges.gif";
import hamstringsImage from "../../public/images/exercises/Hamstrings.gif";
import tiryakTasadanImage from "../../public/images/exercises/TiryakTasadan.gif";
import pullUpsImage from "../../public/images/exercises/PullUps.gif";
import bicepsCurlImage from "../../public/images/exercises/BicepsCurl.gif";
import stantingCrunchImage from "../../public/images/exercises/StandingCrunch.gif";


import {
    BACKGROUND_COLOR,
    SIDE_BAR_COLOR,
    SIDE_BAR_BUTTON_COLOR,
    SIDE_BAR_BUTTON_HOVER_COLOR,
    SIDE_BAR_TEX_COLOR,
    FLOATING_CONTAINER_COLOR,
    SECTION_TEXT_COLOR
} from '@/utils/Colors';


export default function Home() {

    const [strenghtCounter, setStrenghtCounter] = useState(0);
    const [flexibilityCounter, setFlexibilityCounter] = useState(0);
    const [rehabilitationCounter, setRehabilitationCounter] = useState(0);
    const [equilibriumCounter, setEquilibriumCounter] = useState(0);

    var categoryCounter;

    var [basicStatistics, setBasicStatistics] = useState([]);
    var [statistics, setStatistics] = useState([]);
    var [routineStatistics, setRoutineStatistics] = useState([]);
    var [timeStatistics, setTimeStatistics] = useState([]);
    var [caloriesStatistics, setCaloriesStatistics] = useState([]);

    var [token, setToken] = useState('');
    const router = useRouter();

    console.log(frontLegRaiseImage.src);

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

        async function fetchCategoryCount() {
            try {
                const response = await fetch(GET_CATEGORY_COUNT_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                categoryCounter = await response.json();

                categoryCounter.forEach((element) => {
                    if (element.category == 'Muscle&Strenght')
                        setStrenghtCounter(element.count);
                    else if (element.category == 'Flexibility&Mobility')
                        setFlexibilityCounter(element.count);
                    else if (element.category == 'Rehabilitation')
                        setRehabilitationCounter(element.count);
                    else
                        setEquilibriumCounter(element.count);
                })
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        async function fetchBasicStatistics() {
            try {
                const response = await fetch(GET_BASIC_STATISTICS_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json()
                data['averageAccuracy'] = data['averageAccuracy'].toFixed(2);
                data['caloriesCounter'] = data['caloriesCounter'].toFixed(2);
                data['timeCounter'] = (data['timeCounter'] / 60).toFixed(2);
                data['breakCounter'] = (data['breakCounter'] / 60).toFixed(2);
                setBasicStatistics(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        async function fetchStatistics() {
            try {
                const response = await fetch(GET_STATISTICS_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setStatistics(data);

                const routineS = data.map((element) => {
                    return [element[2].split(" ")[0], element[4]];
                });
                setRoutineStatistics(routineS.map(element => ({
                    date: element[0],
                    value: parseInt(element[1])
                })));

                const timeS = data.map((element) => {
                    return [element[2].split(" ")[0], (parseInt(element[3]) / 60).toFixed(2)];
                });
                setTimeStatistics(timeS.map(element => ({
                    date: element[0],
                    value: parseInt(element[1])
                })));

                const caloriesS = data.map((element) => {
                    return [element[2].split(" ")[0], element[5]];
                });
                setCaloriesStatistics(caloriesS.map(element => ({
                    date: element[0],
                    value: parseFloat(element[1])
                })));
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchCategoryCount();
        fetchBasicStatistics();
        fetchStatistics();
    }, []);

    const handleClick = (id) => {
        var category;
        var encodedCategory;
        var url;

        switch (id) {
            case 1:
                category = "Rehabilitation";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
            case 2:
                category = "Flexibility & Mobility";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
            case 3:
                category = "Muscle & Strenght";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
            case 4:
                category = "Equilibrium";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
        }
    };

    const StyleSheet = {
        content: {
            display: 'flex',
            flex: 1,
        },
        exerciseCategory: {
            backgroundColor: 'transparent',
            marginTop: '25px',
            marginLeft: '275px',
            marginRight: '20px',
            marginBottom: '55px',
            height: '400px'
        },
        sectionTitle: {
            color: SECTION_TEXT_COLOR,
            fontSize: '30px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            marginTop: '0px',
        },
        horizontalScroll: {
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarColor: 'rgba(248, 248, 248, 0.8) transparent'
        },
        floatingContainer: {
            backgroundColor: FLOATING_CONTAINER_COLOR,
            borderRadius: '5px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
        },
        grid: {
            textAlign: 'left'
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
                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Select a fitness plan</p>

                        <div style={StyleSheet.horizontalScroll}>
                            <ExerciseCategory
                                imageURL="/_next/static/media/FrontLegRaise.5ac6d4f9.gif"
                                title="Rehabilitation"
                                numRoutines={rehabilitationCounter}
                                onClick={() => handleClick(1)}
                            />
                            <ExerciseCategory
                                imageURL="/_next/static/media/TiryakTasadan.4908e6c3.gif"
                                title="Flexibility & Mobility"
                                numRoutines={flexibilityCounter}
                                onClick={() => handleClick(2)}
                            />
                            <ExerciseCategory
                                imageURL="/_next/static/media/BicepsCurl.449b5c5f.gif"
                                title="Muscle & Strenght"
                                numRoutines={strenghtCounter}
                                onClick={() => handleClick(3)}
                            />
                            <ExerciseCategory
                                imageURL="/_next/static/media/StandingCrunch.07dc2eb3.gif"
                                title="Equilibrium"
                                numRoutines={equilibriumCounter}
                                onClick={() => handleClick(4)}
                            />
                        </div>
                    </div>

                </Grid>
            </Grid>
        </Box>
    );
}