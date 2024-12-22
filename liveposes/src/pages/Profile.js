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

import {
    GET_USER_DATA,
    POST_UPDATE_WEIGHT,
    POST_DELETE_ACCOUNT
} from '@/utils/Config';

import {
    BACKGROUND_COLOR,
    FLOATING_CONTAINER_COLOR,
    SECTION_TEXT_COLOR,
    SECTION_BUTTON_COLOR,
    DANGER_BUTTON_COLOR,
    SIDE_BAR_BUTTON_COLOR,
    SIDE_BAR_BUTTON_HOVER_COLOR,
} from '@/utils/Colors';



export default function UserProfilePage() {

    var [userData, setUserData] = useState('');
    var [weight, setWeight] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

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

        async function fetchUserData() {
            try {
                const response = await fetch(GET_USER_DATA, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                var data = await response.json();
                data[1] = parseFloat(data[1]);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchUserData();
    }, []);

    async function handleUpdateWeight() {
        if (weight > 0) {
            try {
                const response = await fetch(POST_UPDATE_WEIGHT, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "weight": weight }),
                });

                if (response.ok) {
                    router.push('/Profile');
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

    async function handleDeleteAccount() {
        try {
            const response = await fetch(POST_DELETE_ACCOUNT, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                router.push('/Login');
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

    async function handleLogOut() {
        localStorage.removeItem('accessToken');

        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        router.push('/Login');
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
        weightDiv: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            marginLeft: '20px'
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
        }
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
                        <div style={StyleSheet.profileBox}>
                            <div style={StyleSheet.infoContainer}>
                                <p style={StyleSheet.label}><strong>Email:</strong> {userData[0]}</p>
                                <div style={StyleSheet.weightDiv}>
                                    <p><strong>Weight:</strong></p>
                                    <input
                                        type="number"
                                        placeholder={userData[1]}
                                        onChange={(e) => setWeight(e.target.value)}
                                        value={weight}
                                        style={StyleSheet.inputStyle}
                                    >
                                    </input>
                                </div>
                            </div>
                            <div style={StyleSheet.buttonsContainer}>
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
                                    onClick={() => handleUpdateWeight()}
                                >
                                    Update Weight
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
                                    onClick={() => handleUpdateWeight()}
                                >
                                    Change Password
                                </Button>

                                <br></br>

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
                                    onClick={() => handleLogOut()}
                                >
                                    Log out
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: DANGER_BUTTON_COLOR,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                                        },
                                        fontSize: '18px',
                                        textAlign: 'right'
                                    }}
                                    onClick={() => handleDeleteAccount()}
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </div>

                </Grid>
            </Grid>
        </Box>
    );
};
