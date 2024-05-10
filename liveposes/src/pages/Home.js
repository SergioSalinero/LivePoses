import React, { useState, useEffect } from 'react';

import ExerciseCategory from "@/components/ExerciseCategory";

import cardioBurnerImage from '../../public/images/exerciseCategories/Cardio Burner.jpeg';
import deadliftImage from '../../public/images/exerciseCategories/Deadlift.jpeg';
import flexibilityImage from '../../public/images/exerciseCategories/Flexibility.jpg';
import { backend_util } from '@tensorflow/tfjs';

export default function Home() {

    var [cardioBurnerImageURL, setCardioBurnerImageURL] = useState('');
    var [deadliftImageURL, setdeadliftImageURL] = useState('');
    var [flexibilityImageURL, setflexibilityImageURL] = useState('');

    useEffect(() => {
        setCardioBurnerImageURL(cardioBurnerImage.src);
        setdeadliftImageURL(deadliftImage.src);
        setflexibilityImageURL(flexibilityImage.src);
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
        mainContainer: {
            marginTop: '-10px',
            marginLeft: '-10px',
            marginRight: '-8px',
            marginBottom: '-10px',
            backgroundColor: '#083167',
            height: '100%',
        },
        header: {
            backgroundColor: '#011733',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '20px',
            paddingRight: '20px',
            position: 'fixed',
            width: '100%',
            zIndex: 5,
        },
        headerButtons: {
            //marginLeft: '1rem',
            marginRight: '40px'
        },
        content: {
            display: 'flex',
            flex: 1,
        },
        sidebar: {
            flex: '0 0 300px',
            padding: '1rem',
            backgroundColor: '#285793',
            height: '100%',
            position: 'fixed',
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
        },
        sidebarButton : {
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px',
            fontSize: '18px',
            textAlign: 'left'
        },
        rectangleContainer: {
            //flex: 3,
            //display: 'grid',
            //gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            //gap: '1rem',
            //padding: '1rem',
            //width: '70%',
            marginTop: '80px',
            marginLeft: '20%',
        },
        horizontalScroll: {
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            //display: 'flex',
            /*gap: '1rem',
            padding: '1rem',*/
        },
    };

    return (
        <div style={StyleSheet.mainContainer}>
            <header style={StyleSheet.header}>
                <h1>Live Poses</h1>
                {/*<div style={StyleSheet.headerButtons}>
                    <button>Sign Up</button>
                    <button>Sign In</button>
    </div>*/}
            </header>

            <div style={StyleSheet.content}>
                <div style={StyleSheet.sidebar}>
                    <button style={StyleSheet.sidebarButton} /*onClick={() => handleClick(1)}*/>Crreate your own rutine</button>
                    <button style={StyleSheet.sidebarButton} /*onClick={() => handleClick(2)}*/>Publish a routine</button>
                    <button style={StyleSheet.sidebarButton} /*onClick={() => handleClick(2)}*/>Your statistics</button>
                    <button style={StyleSheet.sidebarButton} /*onClick={() => handleClick(3)}*/>Profile</button>
                </div>
            </div>

            {/* Espacio restante */}
            <div style={StyleSheet.rectangleContainer}>
                <div style={StyleSheet.horizontalScroll}>
                    <ExerciseCategory
                        imageURL={cardioBurnerImageURL}
                        title="Cardio Burner"
                        numRoutines="512"
                        onClick={() => handleClick(1)} />
                    <ExerciseCategory
                        imageURL={deadliftImageURL}
                        title="Muscle & Strenght"
                        numRoutines="357"
                        onClick={() => handleClick(2)} />
                    <ExerciseCategory
                        imageURL={flexibilityImageURL}
                        title="Flexibility & mobility"
                        numRoutines="154"
                        onClick={() => handleClick(2)} />
                    {/* Puedes añadir más instancias de ExerciseCategory aquí */}
                    <ExerciseCategory
                        imageURL={deadliftImageURL}
                        title="Flexibility & mobility"
                        numRoutines="154"
                        onClick={() => handleClick(2)} />
                        
                        <ExerciseCategory
                        imageURL={deadliftImageURL}
                        title="Flexibility & mobility"
                        numRoutines="154"
                        onClick={() => handleClick(2)} />
                        <ExerciseCategory
                        imageURL={deadliftImageURL}
                        title="Flexibility & mobility"
                        numRoutines="154"
                        onClick={() => handleClick(2)} />
                        <ExerciseCategory
                        imageURL={deadliftImageURL}
                        title="Flexibility & mobility"
                        numRoutines="154"
                        onClick={() => handleClick(2)} />
                </div>
            </div>

        </div>
    );
}