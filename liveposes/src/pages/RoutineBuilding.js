import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6'
import { IoMdAdd } from "react-icons/io";
import { MdPublish } from "react-icons/md";

import { GET_EXERCISES_URL, POST_CURRENT_ROUTINE_URL } from '@/utils/Config';
import AddExercise from '@/components/AddExercise';

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
        document.body.style.backgroundColor = BACKGROUND_COLOR;

        const storedToken = localStorage.getItem('accessToken');
        if (storedToken !== null && storedToken !== undefined) {
            setToken(storedToken);
            token = storedToken;
        }
        else {
            router.push('/Login');
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
                    //router.push('/Login');
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
        console.log("Exercises:" + exercises)
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
        sidebarDivider: {
            margin: '10px 5px 10px 5px',
            backgroundColor: "rgba(255, 255, 255, 0.2)"
        },
        addExerciseContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '100vh',
            marginTop: '20px',
            marginBottom: '20px'
        },
        sectionTitle: {
            color: SECTION_TEXT_COLOR,
            color: SECTION_TEXT_COLOR,
            fontSize: '35px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            marginTop: '0px'
        },
        sectionDivider: {
            width: '99%',
            marginTop: '-20px',
            marginBottom: '15px'
        },
        sidebarButtonHover: {
            backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
        },
        addButton: {
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
            marginBottom: '10px',
            fontSize: '32px',
            fontWeight: 600,
            backgroundColor: SECTION_BUTTON_COLOR,
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
            fontSize: '32px',
            fontWeight: 600,
            backgroundColor: START_ROUTINE_BUTTON_COLOR,
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '15px',
            cursor: 'pointer',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            width: '50%'
        },
        startRoutineButtonHover: {
            backgroundColor: START_ROUTINE_BUTTON_HOVER_COLOR,
        },
        floatingContainer: {
            backgroundColor: FLOATING_CONTAINER_COLOR,
            borderRadius: '20px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
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
                            <span style={StyleSheet.spanIcon}><FaArrowLeft /></span>
                            <br></br>
                            Back to Home
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                            onClick={() => router.push('/PublishRoutine')}
                        >
                            <span style={StyleSheet.spanIcon}><MdPublish /></span>
                            <br></br>
                            Publish a routine
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

                <div style={StyleSheet.addExerciseContainer}>
                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Routine building</p>

                        {exerciseComponents}
                        <button
                            style={StyleSheet.addButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = SECTION_BUTTON_HOVER_COLOR}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.addButton.backgroundColor}
                            onClick={handleAddExercise}
                        >
                            Add exercise
                        </button>
                    </div>


                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Set rest time (secs)</p>

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