import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { GET_EXERCISES_URL } from '@/components/Config';
import AddExercise from '@/components/AddExercise';

export default function RoutineBuilding() {
    const [exerciseComponents, setExerciseComponents] = useState([]);
    const [idComponent, setIdComponent] = useState(0);
    const [exercises, setExercises] = useState();
    const [loading, setLoading] = useState();
    const [breakTime, setBreakTime] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(GET_EXERCISES_URL);
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

    function handleStartRoutine() {
        exerciseComponents.forEach((component) => {
            console.log('Selected Exercise:', component.props.selectedExercise);
            console.log('Repetitions:', component.props.repetitions);
        });
        console.log(breakTime);
    }

    return (
        <div>
            <h1>Routine construction</h1>
            {exerciseComponents}
            <button onClick={handleAddExercise}>Add</button>
            <button onClick={handleStartRoutine}>Start routine</button>
            <div>
                <p>Tiempo de descanso</p>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={breakTime}
                    onChange={(event) => setBreakTime(event.target.value)}
                />
            </div>
            <Link href="/PoseRecognition">
                Go to BlazePose Page
            </Link>
        </div>
    );
}