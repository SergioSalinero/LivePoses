import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

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
    GET_BASIC_STATISTICS_URL,
    GET_STATISTICS_URL,
    POST_RESET_STATISTICS_URL
} from '@/utils/Config';

import {
    BACKGROUND_COLOR,
    SIDE_BAR_BUTTON_COLOR,
    SIDE_BAR_BUTTON_HOVER_COLOR,
    FLOATING_CONTAINER_COLOR,
    SECTION_TEXT_COLOR,
    DANGER_BUTTON_COLOR,
} from '@/utils/Colors';


export default function Statistics() {

    const router = useRouter();

    var [basicStatistics, setBasicStatistics] = useState([]);
    var [statistics, setStatistics] = useState([]);
    var [routineStatistics, setRoutineStatistics] = useState([]);
    var [timeStatistics, setTimeStatistics] = useState([]);
    var [caloriesStatistics, setCaloriesStatistics] = useState([]);

    var [token, setToken] = useState('');
    const [error, setError] = useState(null);

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

        fetchBasicStatistics();
        fetchStatistics();
    }, []);

    async function handleResetStatistics() {
        try {
            const response = await fetch(POST_RESET_STATISTICS_URL, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                router.push('/Statistics');
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


    const StyleSheet = {
        content: {
            display: 'flex',
            flex: 1,
        },
        exerciseCategory: {
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
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: FLOATING_CONTAINER_COLOR,
            borderRadius: '5px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
        },
        chartsDiv: {
            backgroundColor: '#E0E0E0',
            borderRadius: '5px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
            marginBottom: '20px'
        },
        basicStatisticsDiv: {
            flex: 3,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
            gap: '5px',
            marginTop: '-20px'
        },
        basicSpecificStatistic: {
            backgroundColor: "rgba(224, 224, 224, 0.9)",
            padding: '15px 7px 15px 7px',
            borderRadius: '5px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
        },
        boldSpan: {
            fontWeight: 'bold'
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

                    <div style={StyleSheet.exerciseCategory}>
                        <div style={StyleSheet.floatingContainer}>
                            

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <p style={StyleSheet.sectionTitle}>Your statistics</p>
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
                                    onClick={() => handleResetStatistics()}
                                >
                                    RESET STATISTICS
                                </Button>
                            </div>

                            <div style={StyleSheet.basicStatisticsDiv}>
                                <p style={StyleSheet.basicSpecificStatistic}><span style={StyleSheet.boldSpan}>Routine counter:</span> {basicStatistics['routineCounter']}</p>
                                <p style={StyleSheet.basicSpecificStatistic}><span style={StyleSheet.boldSpan}>Time counter:</span> {basicStatistics['timeCounter']} mins</p>
                                <p style={StyleSheet.basicSpecificStatistic}><span style={StyleSheet.boldSpan}>Calories counter:</span> {basicStatistics['caloriesCounter']} cal</p>
                                <p style={StyleSheet.basicSpecificStatistic}><span style={StyleSheet.boldSpan}>Breaktime counter:</span> {basicStatistics['breakTimeCounter']} mins</p>
                                <p style={StyleSheet.basicSpecificStatistic}><span style={StyleSheet.boldSpan}>Average Accuracy:</span> {basicStatistics['averageAccuracy']}%</p>
                            </div>
                            <div style={StyleSheet.chartsDiv}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={routineStatistics} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                        <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 12 }} />
                                        <YAxis tick={{ fill: '#555', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#333', borderRadius: 8, color: '#fff' }}
                                            labelStyle={{ fontWeight: 'bold' }}
                                            itemStyle={{ color: '#ddd' }}
                                        />
                                        <Legend verticalAlign="top" height={36} iconType="square" />
                                        <Bar
                                            dataKey="value"
                                            name="Routines per day"
                                            fill="#212121"
                                            barSize={40}
                                            radius={[10, 10, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div style={StyleSheet.chartsDiv}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={timeStatistics} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                        <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 12 }} />
                                        <YAxis tick={{ fill: '#555', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#333', borderRadius: 8, color: '#fff' }}
                                            labelStyle={{ fontWeight: 'bold' }}
                                            itemStyle={{ color: '#ddd' }}
                                        />
                                        <Legend verticalAlign="top" height={36} iconType="square" />
                                        <Bar
                                            dataKey="value"
                                            name="Trained time per day (minutes)"
                                            fill="#212121"
                                            barSize={40}
                                            radius={[10, 10, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div style={StyleSheet.chartsDiv}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={caloriesStatistics} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                        <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 12 }} />
                                        <YAxis tick={{ fill: '#555', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#333', borderRadius: 8, color: '#fff' }}
                                            labelStyle={{ fontWeight: 'bold' }}
                                            itemStyle={{ color: '#ddd' }}
                                        />
                                        <Legend verticalAlign="top" height={36} iconType="square" />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            name="Calories burned per day"
                                            stroke="#212121"
                                            strokeWidth={2.5}
                                            dot={{ r: 6, fill: '#212121' }}
                                            activeDot={{ r: 8, fill: '#4a47a3' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>

                            
                            </div>
                        </div>
                    </div>

                </Grid>
            </Grid>
        </Box>
    );
}