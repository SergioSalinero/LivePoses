import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import ExerciseCategory from "@/components/ExerciseCategory";

import { GET_CATEGORY_COUNT_URL } from '@/components/Config';

import cardioBurnerImage from '../../public/images/exerciseCategories/Cardio Burner.jpeg';
import strenghtImage from '../../public/images/exerciseCategories/Strenght.jpeg';
import flexibilityImage from '../../public/images/exerciseCategories/Flexibility.jpg';
import rehabilitationImage from '../../public/images/exerciseCategories/Rehabilitation.jpeg';
import hiitImage from '../../public/images/exerciseCategories/HIIT.jpeg';
import calisthenicImage from '../../public/images/exerciseCategories/Calisthenic.jpeg';
//import { backend_util } from '@tensorflow/tfjs';

export default function Home() {

    const router = useRouter();
    const [cardioBurnerImageURL, setCardioBurnerImageURL] = useState('');
    const [strenghtImageURL, setStrenghtImageURL] = useState('');
    const [flexibilityImageURL, setflexibilityImageURL] = useState('');
    const [rehabilitationImageURL, setRehabilitationImageURL] = useState('');
    const [hiitImageURL, setHiitImageURL] = useState('');
    const [calisthenicImageURL, setCalisthenicImageURL] = useState('');

    const [cardioBurnerCounter, setCardioBurnerCounter] = useState(0);
    const [strenghtCounter, setStrenghtCounter] = useState(0);
    const [flesibilityCounter, setFlexibilityCounter] = useState(0);
    const [rehabilitationCounter, setRehabilitationCounter] = useState(0);
    const [hiitCounter, setHiitCounter] = useState(0);
    const [calisthenicCounter, setCalisthenicCounter] = useState(0);
    const [equilibriumCounter, setEquilibriumCounter] = useState(0);

    var categoryCounter;

    var [token, setToken] = useState('');

    useEffect(() => {
        setCardioBurnerImageURL(cardioBurnerImage.src);
        setStrenghtImageURL(strenghtImage.src);
        setflexibilityImageURL(flexibilityImage.src);
        setRehabilitationImageURL(rehabilitationImage.src);
        setHiitImageURL(hiitImage.src);
        setCalisthenicImageURL(calisthenicImage.src);

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
                //setCategoryCounter(jsonData);
                console.log("Category: " + categoryCounter.length);
                categoryCounter.forEach((element) => {
                    if(element.category == 'Cardio Burner')
                        setCardioBurnerCounter(element.count);
                    else if(element.category == 'Muscle & Strenght')
                        setStrenghtCounter(element.count);
                    else if(element.category == 'Flexibility & Mobility')
                        setFlexibilityCounter(element.count);
                    else if(element.category == 'Rehabilitation')
                        setRehabilitationCounter(element.count);
                    else if(element.category == 'HIIT')
                        setHiitCounter(element.count);
                    else if(element.category == 'Calisilthenic')
                        setCalisthenicCounter(element.count);
                    else
                        setEquilibriumCounter(element.count);
                })
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchCategoryCount();
    }, []);

    const handleClick = (id) => {
        switch (id) {
            case 1:
                router.push('/CategoryRoutines?category=Cardio Burner');
                break;
            case 2:
                console.log("Botón 2 pulsado");
                // Aquí puedes definir el comportamiento para el botón 2
                break;
            case 3:
                console.log("Botón 3 pulsado");
                // Aquí puedes definir el comportamiento para el botón 3
                break;
            default:
                console.log("Botón no reconocido");
        }
    };

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
            //marginTop: '-10px',
            marginLeft: '-10px',
            //marginRight: '-8px',
            //marginBottom: '-10px',
            backgroundColor: '#212121',
            //height: '100%',
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
        exerciseCategory: {
            //flex: 3,
            //display: 'grid',
            //gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            //gap: '1rem',
            //padding: '1rem',
            //width: '70%',
            backgroundColor: '#212121',
            marginTop: '25px',
            marginLeft: '320px',
            marginRight: '20px',
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
        horizontalScroll: {
            overflowX: 'auto',
            whiteSpace: 'nowrap',
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


                <div style={StyleSheet.exerciseCategory}>
                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Select a fitness plan</p>

                        <div style={StyleSheet.horizontalScroll}>
                            <ExerciseCategory
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
                                onClick={() => handleClick(7)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}