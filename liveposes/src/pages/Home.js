import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import ExerciseCategory from "@/components/ExerciseCategory";

import cardioBurnerImage from '../../public/images/exerciseCategories/Cardio Burner.jpeg';
import strenghtImage from '../../public/images/exerciseCategories/Strenght.jpeg';
import flexibilityImage from '../../public/images/exerciseCategories/Flexibility.jpg';
import rehabilitationImage from '../../public/images/exerciseCategories/Rehabilitation.jpeg';
//import { backend_util } from '@tensorflow/tfjs';

export default function Home() {

    const router = useRouter();
    var [cardioBurnerImageURL, setCardioBurnerImageURL] = useState('');
    var [strenghtImageURL, setStrenghtImageURL] = useState('');
    var [flexibilityImageURL, setflexibilityImageURL] = useState('');
    var [rehabilitationImageURL, setRehabilitationImageURL] = useState('');

    useEffect(() => {
        setCardioBurnerImageURL(cardioBurnerImage.src);
        setStrenghtImageURL(strenghtImage.src);
        setflexibilityImageURL(flexibilityImage.src);
        setRehabilitationImageURL(rehabilitationImage.src);
    }, []);

    const handleClick = (id) => {
        switch (id) {
            case 1:
                console.log("Botón 1 pulsado");
                // Aquí puedes definir el comportamiento para el botón 1
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
            marginTop: '10px',
            userSelect: 'none',
            fontFamily: 'Roboto, sans-serif',
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
        exerciseCategory: {
            //flex: 3,
            //display: 'grid',
            //gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            //gap: '1rem',
            //padding: '1rem',
            //width: '70%',
            marginLeft: '320px',
            height: '400px'
        },
        sectionTitle: {
            color: 'white',
            fontSize: '35px',
        },
        sectionDivider: {
            width: '99%',
            marginTop: '-20px',
            marginBottom: '15px'
        },
        horizontalScroll: {
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            //display: 'flex',
            /*gap: '1rem',
            padding: '1rem',*/
        },
        sidebarButtonHover: {
            backgroundColor: '#4A4A4A',
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

                {/* Espacio restante */}
                <div style={StyleSheet.exerciseCategory}>
                    <p style={StyleSheet.sectionTitle}>Select a fitness plan</p>
                    <hr style={StyleSheet.sectionDivider} />
                    <div style={StyleSheet.horizontalScroll}>
                        <ExerciseCategory
                            imageURL={cardioBurnerImageURL}
                            title="Cardio Burner"
                            numRoutines="512"
                            onClick={() => handleClick(1)} />
                        <ExerciseCategory
                            imageURL={strenghtImageURL}
                            title="Muscle & Strenght"
                            numRoutines="357"
                            onClick={() => handleClick(2)} />
                        <ExerciseCategory
                            imageURL={flexibilityImageURL}
                            title="Flexibility & mobility"
                            numRoutines="154"
                            onClick={() => handleClick(2)} />
                        <ExerciseCategory
                            imageURL={rehabilitationImageURL}
                            title="Rehabilitation"
                            numRoutines="154"
                            onClick={() => handleClick(2)} />

                        {/* Puedes añadir más instancias de ExerciseCategory aquí */}

                        <ExerciseCategory
                            imageURL={strenghtImageURL}
                            title="Flexibility & mobility"
                            numRoutines="154"
                            onClick={() => handleClick(2)} />
                        <ExerciseCategory
                            imageURL={strenghtImageURL}
                            title="Flexibility & mobility"
                            numRoutines="154"
                            onClick={() => handleClick(2)} />
                        <ExerciseCategory
                            imageURL={strenghtImageURL}
                            title="Flexibility & mobility"
                            numRoutines="154"
                            onClick={() => handleClick(2)} />
                    </div>
                </div>
            </div>
        </div>
    );
}