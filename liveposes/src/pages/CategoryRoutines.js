import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa6'

import ExerciseCategory from "@/components/ExerciseCategory";

import { GET_CATEGORY_ROUTINE_URL } from '@/components/Config';



export default function CategoryRoutines() {

    const router = useRouter();
    var { category } = router.query;

    const [routines, setRoutines] = useState();
    var intRoutines;

    var [token, setToken] = useState('');

    useEffect(() => {
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
                    console.log(intRoutines);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            }

            fetchCategoryCount();
        }
    }, [category]);

    const StyleSheet = {
        backgroundContainer: {
            height: '100vh',
            //width: '100vw',
            backgroundColor: '#212121',
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
            backgroundColor: '#212121',
            height: '100%',
        },
        content: {
            display: 'flex',
            flex: 1,
        },
        sidebar: {
            flex: '0 0 300px',
            padding: '1rem',
            backgroundColor: '#171717 ',
            height: '100%',
            position: 'fixed',
            //marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            //boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
        },
        sidebarTitle: {
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold',
            marginLeft: '15px',
            width: '250px'
        },
        sidebarButton: {
            border: 'none',
            cursor: 'pointer',
            marginBottom: '15px',
            fontSize: '20px',
            textAlign: 'left',
            padding: '15px',
            backgroundColor: '#212121',
            color: 'white',
            borderRadius: '20px',
        },
        sidebarButtonHover: {
            backgroundColor: '#4A4A4A'
        },
        sidebarDivider: {
            margin: '10px 0',
        },
        routines: {
            flex: 3,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '50px',
            padding: '1rem',
            //width: '70%',
            marginTop: '25px',
            marginLeft: '320px',
            marginRight: '20px',
            marginBottom: '20px',
            height: '400px'
        },
        sectionTitle: {
            color: 'white',
            fontSize: '35px',
            marginTop: '0px',
        },
        sectionDivider: {
            width: '99%',
            marginTop: '-20px',
            marginBottom: '15px'
        },
        sidebarButtonHover: {
            backgroundColor: '#4A4A4A',
        },
        floatingContainer: {
            backgroundColor: '#2F2F2F',
            borderRadius: '20px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
            marginBottom: '20px'
        },
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
                            style={StyleSheet.sidebarButton}
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

                        {/*<ExerciseCategory
                            imageURL={cardioBurnerImageURL}
                            title="Cardio Burner"
                            numRoutines={cardioBurnerCounter}
                            onClick={() => handleClick(1)} />
                        <ExerciseCategory
                            imageURL={strenghtImageURL}
                            title="Muscle & Strenght"
                            numRoutines={strenghtCounter}
                            onClick={() => handleClick(2)} />
                        <ExerciseCategory
                            imageURL={flexibilityImageURL}
                            title="Flexibility & Mobility"
                            numRoutines={flesibilityCounter}
                            onClick={() => handleClick(3)} />
                        <ExerciseCategory
                            imageURL={rehabilitationImageURL}
                            title="Rehabilitation"
                            numRoutines={rehabilitationCounter}
                            onClick={() => handleClick(4)} />
                        <ExerciseCategory
                            imageURL={hiitImageURL}
                            title="HIIT"
                            numRoutines={hiitCounter}
                            onClick={() => handleClick(5)} />
                        <ExerciseCategory
                            imageURL={calisthenicImageURL}
                            title="Calisthenic"
                            numRoutines={calisthenicCounter}
                            onClick={() => handleClick(6)} />
                        <ExerciseCategory
                            imageURL={strenghtImageURL}
                            title="Equilibrium"
                            numRoutines={equilibriumCounter}
    onClick={() => handleClick(7)} />*/}
                    </div>
                </div>
            </div>
        </div>
    );
}