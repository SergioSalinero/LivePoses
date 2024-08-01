import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa6'

import Routine from '@/components/Routine';

import { GET_EXERCISES_URL, GET_CATEGORY_ROUTINE_URL } from '@/utils/Config';

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



export default function CategoryRoutines() {

    const router = useRouter();
    var { category } = router.query;

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
        if (category) {
            console.log(category);

            const url = `${GET_CATEGORY_ROUTINE_URL}?${"category=" + category.replace(/\s+/g, '')}`;
            console.log(url);

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
                    //console.log(routines);
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

    function handleRoutineClick(index) {
        console.log(index);
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
            fontSize: '38px',
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            marginLeft: '15px',
            width: '250px',
            marginTop: '30px'
        },
        sidebarButton: {
            border: 'none',
            cursor: 'pointer',
            marginBottom: '15px',
            fontSize: '20px',
            textAlign: 'left',
            padding: '15px',
            backgroundColor: SIDE_BAR_BUTTON_COLOR,
            color: 'white',
            borderRadius: '20px',
        },
        sidebarButtonHover: {
            backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR
        },
        sidebarDivider: {
            margin: '10px 5px 10px 5px',
        },
        routines: {
            backgroundColor: 'transparent',
            marginTop: '25px',
            marginLeft: '320px',
            marginRight: '20px',
            height: '400px',
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
            marginBottom: '20px',
            marginTop: '30px'
        },
        showRoutines: {
            flex: 3,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '50px',
        }
    };

    return (
        <div style={StyleSheet.backgroundContainer}>
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
                            <FaArrowLeft /> Back to Home
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                            onClick={() => router.push('/RoutineBuilding')}
                        >
                            Create your own rutine
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                            onClick={() => router.push('/PublishRoutine')}
                        >
                            Publish a routine
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => router.push('/PublishRoutine')}*/
                        >
                            Your published routines
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => handleClick(2)}*/
                        >
                            Your statistics
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => handleClick(2)}*/
                        >
                            Stored routines
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => handleClick(2)}*/
                        >
                            Training history
                        </button>
                        <hr style={StyleSheet.sidebarDivider} />
                        <button
                            style={{
                                ...StyleSheet.sidebarButton,
                                marginTop: '10px',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => handleClick(3)}*/
                        >
                            Profile
                        </button>
                    </div>
                </div>


                <div style={StyleSheet.routines}>
                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>{category}</p>
                        <div style={StyleSheet.showRoutines}>
                            {routines.map((item, index) => (
                                <Routine
                                    key={index}
                                    onclick={() => handleRoutineClick(index)}
                                    routine={item}
                                    exercises={exercises}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}