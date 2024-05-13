import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6'

import { GET_EXERCISES_URL, POST_CURRENT_ROUTINE_URL } from '@/components/Config';
import AddExercise from '@/components/AddExercise';


export default function RoutineBuilding() {

    const router = useRouter();
    const [exerciseComponents, setExerciseComponents] = useState([]);
    const [idComponent, setIdComponent] = useState(0);
    const [exercises, setExercises] = useState();
    const [loading, setLoading] = useState();
    const [breakTime, setBreakTime] = useState(0);

    const [error, setError] = useState(null);
    var [token, setToken] = useState('');


    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken !== null && storedToken !== undefined) {
            setToken(storedToken);
            token = storedToken;
        }
        else {
            router.push('/PoseRecognition');
        }

        async function fetchData() {
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
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!exercises) {
        return <div>No data available</div>
    }

    function handleAddExercise() {
        var key = exerciseComponents.length;
        const newComponent = (
            <AddExercise
                key={key}
                id={idComponent}
                exercises={exercises}
                onRemove={(idToRemove) => handleRemoveExercise(idToRemove)}
                onUpdate={(id, repetitions, selectedExercise) => handleUpdateExerciseComponent(id, repetitions, selectedExercise)}
                onReorder={(id, direction) => handleReorderExerciseComponent(id, direction)}
            />
        );

        setIdComponent(idComponent + 1);
        setExerciseComponents([...exerciseComponents, newComponent]);
    }

    function handleRemoveExercise(idToRemove) {
        setExerciseComponents(prevComponents => {
            return prevComponents.filter((component) => component.props.id !== idToRemove);
        });
    }

    function handleUpdateExerciseComponent(id, repetitions, selectedExercise) {
        setExerciseComponents((prevComponents) => {
            return prevComponents.map((component) => {
                if (component.props.id === id) {
                    return React.cloneElement(component, { repetitions, selectedExercise });
                }

                return component;
            });
        });
    }

    function handleReorderExerciseComponent(id, direction) {
        setExerciseComponents((prevComponents) => {
            const index = prevComponents.findIndex((component) => component.props.id === id);
            if (index === -1) return prevComponents;

            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= prevComponents.length) return prevComponents;

            const updatedComponents = [...prevComponents];
            const removedComponent = updatedComponents.splice(index, 1)[0];
            updatedComponents.splice(newIndex, 0, removedComponent);

            return updatedComponents;
        });
    }

    async function handleStartRoutine() {
        const filteredExerciseComponents = exerciseComponents.filter(component => {
            return component.props.selectedExercise !== undefined && component.props.repetitions !== undefined && component.props.repetitions !== 0;
        });

        const currentRoutine = {
            exercises: [],
            breakTime: breakTime
        }

        filteredExerciseComponents.forEach(component => {
            const exerciseData = {
                exerciseId: component.props.selectedExercise,
                repetitions: component.props.repetitions
            };
            currentRoutine.exercises.push(exerciseData);
        });

        if (currentRoutine.exercises.length > 0) {
            try {
                const response = await fetch(POST_CURRENT_ROUTINE_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentRoutine),
                });

                if (response.ok) {
                    router.push('/PoseRecognition');
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

    function handleBackToHome() {
        router.push('/Home');
    }


    const StyleSheet = {
        backgroundContainer: {
            height: '100vh',
            width: '100%',
            //width: '100vw',
            backgroundColor: '#212121',
            //marginTop: '0px',
            userSelect: 'none',
            fontFamily: 'Roboto, sans-serif',
        },
        mainContainer: {
            marginTop: '-10px',
            marginLeft: '-10px',
            //marginRight: '-8px',
            marginBottom: '-10px',
            backgroundColor: '#212121',
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
        sidebarDivider: {
            margin: '10px 0',
        },
        addExerciseContainer: {
            marginLeft: '320px',
            marginRight: '20px',
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
        sidebarButtonHover: {
            backgroundColor: '#4A4A4A',
        },
        addButton: {
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
            marginBottom: '10px',
            fontSize: '28px',
            backgroundColor: '#0D0D0D',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '15px',
            cursor: 'pointer'
        },
        restTimeSlider: {
            width: '99%',
            padding: '5px',
            borderRadius: '10px',
            background: `linear-gradient(to right, #FF6200 ${breakTime}%, #E0E0DF ${breakTime}%)`,
            transition: 'background-color 0.3s ease',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            appearance: 'none',
            cursor: 'pointer',
            outline: 'none',
        },
        restTimeSliderNumber: {
            width: '45px',
            height: '20px',
            background: `linear-gradient(to right, transparent ${breakTime}%, transparent ${breakTime}%)`,
            background: 'white',
            transition: 'background-color 0.3s ease',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            appearance: 'none',
            cursor: 'pointer',
            outline: 'none',
            border: 'none',
            borderRadius: '20px',
            fontSize: '18px'
        },
        startRoutineButton: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '30px',
            display: 'block',
            marginBottom: '10px',
            fontSize: '28px',
            backgroundColor: '#57B900',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '15px',
            cursor: 'pointer'
        },
        startRoutineButtonHover: {
            backgroundColor: '#69DF00',
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
                            onClick={() => handleBackToHome()}
                        >
                            <FaArrowLeft /> Back to home
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => handleClick(2)}*/
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
                            Routine history
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

                <div style={StyleSheet.addExerciseContainer}>
                    <p style={StyleSheet.sectionTitle}>Routine construction</p>
                    <hr style={StyleSheet.sectionDivider} />
                    
                    {exerciseComponents}
                    <button
                        style={StyleSheet.addButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.addButton.backgroundColor}
                        onClick={handleAddExercise}
                    >
                        Add exercise
                    </button>


                    <div>
                        <p style={StyleSheet.sectionTitle}>Set rest time (secs)</p>
                        <hr style={StyleSheet.sectionDivider} />

                        <input
                            type="number"
                            value={breakTime}
                            style={{ ...StyleSheet.restTimeSliderNumber, marginLeft: `calc(${breakTime}% - 22px)` }}
                        />

                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={breakTime}
                            style={StyleSheet.restTimeSlider}
                            onChange={(event) => setBreakTime(event.target.value)}
                        />
                    </div>

                    <button
                        style={StyleSheet.startRoutineButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.startRoutineButtonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.startRoutineButton.backgroundColor}
                        onClick={handleStartRoutine}
                    >
                        Start routine
                    </button>

                </div>
            </div>
        </div>
    );
}