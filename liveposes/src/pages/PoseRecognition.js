import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

import { exerciseRecognitionByAngles, exerciseRecognitionByAnglesAndDistances } from '@/libraries/ExerciseRecognition';
import Chronometer from '@/components/Chronometer';
import CountdownTimer from '@/components/CountDownTimer';
import { GET_EXERCISES_URL, GET_CURRENT_ROUTINE_URL, GET_START_SIGNAL } from '@/components/Config';


export default function PoseRecognition() {

    var startSignal;
    var exercises;
    var currentRoutine;
    var token;

    var createdDetector = false;

    var [color, setColor] = useState('red');
    var [isRoutineActive, setIsRoutineActive] = useState(false);
    var isFirstTime = true;
    var [breakTime, setBreakTime] = useState(0);
    //var [isBreakTimeActive, setIsBreakTimeActive] = useState(false);
    var isBreakTimeActive = false;
    var isFirstTimeBreakTimeActive = true;
    var [seconds, setSeconds] = useState(0);

    var currentExercise;
    var currentExerciseIndex = -1;
    var previousExerciseStatus = 'START';
    var currentExerciseRepetitionsAux = -1;
    var currentRepetitionsAux = 0;
    const [currentRepetitions, setCurrentRepetitions] = useState(0);
    const [currentExerciseRepetitions, setCurrentExerciseRepetition] = useState(0);
    const [currentExerciseName, setCurrentExerciseName] = useState('');


    const videoRef = useRef(null);
    const canvasRef = useRef(null);


    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken !== null && storedToken !== undefined) {
            token = storedToken;
        }

        /* Get general data of exercises */
        async function fecthExercises() {
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
                exercises = jsonData;
                console.log(exercises);
                fetchStartSignal();
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        /* Get start signal */
        async function fetchStartSignal() {
            try {
                const response = await fetch(GET_START_SIGNAL, {
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
                startSignal = jsonData;
                console.log(startSignal);
                fetchCurrentRoutine();
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        /* Get current routine */
        async function fetchCurrentRoutine() {
            try {
                const response = await fetch(GET_CURRENT_ROUTINE_URL, {
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
                currentRoutine = jsonData;
                console.log(currentRoutine);
                setBreakTime(currentRoutine.breakTime);
                breakTime = currentRoutine.breakTime;
                setSeconds(currentRoutine.breakTime);
                setExerciseStatus();
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fecthExercises();
    }, []);


    function setExerciseStatus() {
        currentExerciseIndex++;

        let found = false;
        exercises.forEach((exercise) => {
            if (!found && exercise.id == currentRoutine.exercises[currentExerciseIndex].exerciseId) {
                currentExercise = exercise;
                setCurrentExerciseRepetition(currentRoutine.exercises[currentExerciseIndex].repetitions);
                currentExerciseRepetitionsAux = currentRoutine.exercises[currentExerciseIndex].repetitions;
                found = true;
            }
        });

        currentRoutine.exercises.slice(1);

        setCurrentRepetitions(0);
        currentRepetitionsAux = 0;
        setCurrentExerciseName(currentExercise.name);

        if (currentExerciseIndex > 0) {
            isBreakTimeActive = true;
            setIsRoutineActive(false);
            isRoutineActive = false;
            /*setColor('red');
            color = 'red';*/
        }

        console.log(currentExerciseIndex, currentExercise, currentExerciseRepetitions, currentRepetitions);
    }

    /* Set the configurations of the camera */
    async function setupCamera() {
        const video = videoRef.current;
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 640 },
                height: { ideal: 480 }
            },
            audio: false
        });
        video.srcObject = stream;
        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                resolve(video);
            };
        });
    }

    useEffect(() => {
        /* Exec the model, draw the skeleton and recognize exercises */
        async function drawSkeleton() {
            var video;
            var detectorConfig;
            var model;
            var canvas;
            var ctx;

            if (!createdDetector) {
                await tf.setBackend('webgl');
                video = await setupCamera();
                detectorConfig = {
                    runtime: 'tfjs',
                    modelType: 'lite'
                };
                model = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, detectorConfig);

                createdDetector = true;
            }
            canvas = canvasRef.current;
            ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;


            /* Exec the model  */
            async function predictWebcam() {
                const poses = await model.estimatePoses(video);

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                poses.forEach(pose => {
                    const keypoints = pose.keypoints;

                    // Draw points
                    keypoints.forEach((keypoint, index) => {
                        if (index > 10) { // Ignorar los primeros 11 puntos
                            ctx.beginPath();
                            ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
                            ctx.fillStyle = 'green';
                            ctx.fill();
                            ctx.strokeStyle = 'white';
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                    });


                    // Define the pair of points for a specific line
                    const linesToDraw = [
                        [11, 12], [12, 14], [14, 16], [16, 20], [16, 18], [18, 20],
                        [12, 24], [23, 24], [24, 26], [26, 28], [28, 30], [28, 32],
                        [30, 32], [11, 13], [13, 15], [15, 17], [15, 19], [17, 19],
                        [11, 23], [23, 25], [25, 27], [27, 29], [27, 31], [29, 31]
                    ];


                    // Draw lines
                    linesToDraw.forEach(line => {
                        drawLines(ctx, keypoints[line[0]], keypoints[line[1]], color);
                    });
                    //console.log("1: " + isRoutineActive);
                    if (isRoutineActive) {
                        color = 'white';
                        exerciseRecognition(keypoints);
                    }
                    else if (!isRoutineActive && isFirstTime) {
                        startRecognition(keypoints);
                    }
                    else {
                        color = 'red';
                    }

                    let interval;
                    if (isBreakTimeActive && isFirstTimeBreakTimeActive) {
                        isFirstTimeBreakTimeActive = false;

                            interval = setInterval(() => {
                                console.log("2: " + seconds)
                                setSeconds(seconds => {
                                    if (seconds == 0) {
                                        clearInterval(interval);
                                        handleCountDownTimerComplete(); // Call the callback function provided by the parent component
                                        return 0;
                                    }
                                    return seconds - 1;
                                });
                            }, 1000);

                        return () => clearInterval(interval);
                    }
                    else if(!isBreakTimeActive) {
                        isFirstTimeBreakTimeActive = true;
                        clearInterval(interval);
                    }

                });


                window.requestAnimationFrame(predictWebcam);
            }

            predictWebcam();
        }

        drawSkeleton();

    }, []);

    function drawLines(ctx, keypoint1, keypoint2, color) {
        ctx.beginPath();
        ctx.moveTo(keypoint1.x, keypoint1.y);
        ctx.lineTo(keypoint2.x, keypoint2.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    function exerciseRecognition(keypoints) {
        if (typeof currentExercise != 'undefined') {
            var rightKeyPoint1 = currentExercise.rightKeyPoint1
            var rightKeyPoint2 = currentExercise.rightKeyPoint2
            var rightKeyPoint3 = currentExercise.rightKeyPoint3
            var rightKeyPointDistance1 = currentExercise.rightKeyPointDistance1;
            var rightKeyPointDistance2 = currentExercise.rightKeyPointDistance2;
            var leftKeyPoint1 = currentExercise.leftKeyPoint1
            var leftKeyPoint2 = currentExercise.leftKeyPoint2
            var leftKeyPoint3 = currentExercise.leftKeyPoint3
            var leftKeyPointDistance1 = currentExercise.leftKeyPointDistance1;
            var leftKeyPointDistance2 = currentExercise.leftKeyPointDistance2;
            var upperAngleMax = currentExercise.upperAngleMax
            var upperAngleMin = currentExercise.upperAngleMin;
            var lowerAngleMax = currentExercise.lowerAngleMax;
            var lowerAngleMin = currentExercise.lowerAngleMin;

            var rightPoint1 = {
                x: keypoints[rightKeyPoint1].x,
                y: keypoints[rightKeyPoint1].y
            }
            var rightPoint2 = {
                x: keypoints[rightKeyPoint2].x,
                y: keypoints[rightKeyPoint2].y
            }
            var rightPoint3 = {
                x: keypoints[rightKeyPoint3].x,
                y: keypoints[rightKeyPoint3].y
            }

            var leftPoint1 = {
                x: keypoints[leftKeyPoint1].x,
                y: keypoints[leftKeyPoint1].y
            }
            var leftPoint2 = {
                x: keypoints[leftKeyPoint2].x,
                y: keypoints[leftKeyPoint2].y
            }
            var leftPoint3 = {
                x: keypoints[leftKeyPoint3].x,
                y: keypoints[leftKeyPoint3].y
            }

            if (currentExercise.recognitionType == 'only_angles') {
                var exerciseStatus = exerciseRecognitionByAngles(rightPoint1, rightPoint2, rightPoint3, leftPoint1, leftPoint2, leftPoint3, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin);
            }
            else if (currentExercise.recognitionType == 'both') {
                var rightPointDistance1 = {
                    x: keypoints[rightKeyPointDistance1].x,
                    y: keypoints[rightKeyPointDistance1].y
                }
                var rightPointDistance2 = {
                    x: keypoints[rightKeyPointDistance2].x,
                    y: keypoints[rightKeyPointDistance2].y
                }
                var leftPointDistance1 = {
                    x: keypoints[leftKeyPointDistance1].x,
                    y: keypoints[leftKeyPointDistance1].y
                }
                var leftPointDistance2 = {
                    x: keypoints[leftKeyPointDistance2].x,
                    y: keypoints[leftKeyPointDistance2].y
                }

                var exerciseStatus = exerciseRecognitionByAnglesAndDistances(rightPoint1, rightPoint2, rightPoint3, rightPointDistance1, rightPointDistance2, leftPoint1, leftPoint2, leftPoint3, leftPointDistance1, leftPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin);
            }

            if (typeof exerciseStatus == 'undefined')
                exerciseStatus = previousExerciseStatus;

            if (exerciseStatus != previousExerciseStatus && exerciseStatus == 'START') {
                setCurrentRepetitions(prevRepetitions => prevRepetitions + 1);
                currentRepetitionsAux++;
            }

            previousExerciseStatus = exerciseStatus;


            /* End of exercise */
            if (currentRepetitionsAux >= currentExerciseRepetitionsAux)
                setExerciseStatus();
        }
    }

    function startRecognition(keypoints) {
        if (typeof startSignal != 'undefined') {
            var rightKeyPoint1 = startSignal.rightKeyPoint1
            var rightKeyPoint2 = startSignal.rightKeyPoint2
            var rightKeyPoint3 = startSignal.rightKeyPoint3
            var rightKeyPointDistance1 = startSignal.rightKeyPointDistance1;
            var rightKeyPointDistance2 = startSignal.rightKeyPointDistance2;
            var leftKeyPoint1 = startSignal.leftKeyPoint1
            var leftKeyPoint2 = startSignal.leftKeyPoint2
            var leftKeyPoint3 = startSignal.leftKeyPoint3
            var leftKeyPointDistance1 = startSignal.leftKeyPointDistance1;
            var leftKeyPointDistance2 = startSignal.leftKeyPointDistance2;
            var upperAngleMax = startSignal.upperAngleMax
            var upperAngleMin = startSignal.upperAngleMin;
            var lowerAngleMax = startSignal.lowerAngleMax;
            var lowerAngleMin = startSignal.lowerAngleMin;

            var rightPoint1 = {
                x: keypoints[rightKeyPoint1].x,
                y: keypoints[rightKeyPoint1].y
            }
            var rightPoint2 = {
                x: keypoints[rightKeyPoint2].x,
                y: keypoints[rightKeyPoint2].y
            }
            var rightPoint3 = {
                x: keypoints[rightKeyPoint3].x,
                y: keypoints[rightKeyPoint3].y
            }

            var leftPoint1 = {
                x: keypoints[leftKeyPoint1].x,
                y: keypoints[leftKeyPoint1].y
            }
            var leftPoint2 = {
                x: keypoints[leftKeyPoint2].x,
                y: keypoints[leftKeyPoint2].y
            }
            var leftPoint3 = {
                x: keypoints[leftKeyPoint3].x,
                y: keypoints[leftKeyPoint3].y
            }


            var rightPointDistance1 = {
                x: keypoints[rightKeyPointDistance1].x,
                y: keypoints[rightKeyPointDistance1].y
            }
            var rightPointDistance2 = {
                x: keypoints[rightKeyPointDistance2].x,
                y: keypoints[rightKeyPointDistance2].y
            }
            var leftPointDistance1 = {
                x: keypoints[leftKeyPointDistance1].x,
                y: keypoints[leftKeyPointDistance1].y
            }
            var leftPointDistance2 = {
                x: keypoints[leftKeyPointDistance2].x,
                y: keypoints[leftKeyPointDistance2].y
            }

            var exerciseStatus = exerciseRecognitionByAnglesAndDistances(rightPoint1, rightPoint2, rightPoint3, rightPointDistance1, rightPointDistance2, leftPoint1, leftPoint2, leftPoint3, leftPointDistance1, leftPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin);


            if (typeof exerciseStatus == 'undefined')
                exerciseStatus = previousExerciseStatus;

            if (exerciseStatus != previousExerciseStatus && exerciseStatus == 'END') {
                isFirstTime = false;
                setIsRoutineActive(true);
                isRoutineActive = true;
                setColor('white');
                color = 'white';
                previousExerciseStatus = 'START'
                return;
            }

            previousExerciseStatus = exerciseStatus;
        }
    }







    const handleTick = (seconds) => {
        //console.log("Seconds passed:", seconds);
    };

    function handleCountDownTimerComplete() {
        console.log('Timer completed');
        isBreakTimeActive = false;
        setIsRoutineActive(true);
        isRoutineActive = true;

        setSeconds(breakTime);
        seconds = breakTime;

        console.log("1: " + breakTime);

        //setColor('white');
        //color = 'white';
        //setBreakTime(prevBreakTime => prevBreakTime);
    }

    const StyleSheet = {
        videoCanvasStyle: {
            width: '50%',
            height: 'auto',
            position: 'absolute',
            left: '0px',
            top: '0px',
            transform: 'scaleX(-1)'
        },
        dataDivContainer: {
            width: '50%',
            height: 'auto',
            position: 'absolute',
            right: '0%',
            top: '0px',
            fontSize: '38px',
        },
    }

    return (
        /*
        <video ref={videoRef} width="640" height="480" style={StyleSheet.videoCanvasStyle} autoPlay></video>
        <canvas className="output_canvas" ref={canvasRef} style={StyleSheet.videoCanvasStyle}></canvas>
        */
        <div>
            <div style={StyleSheet.dataDivContainer}>
                <div>Name: {currentExerciseName}</div>
                <div>Reps: {currentRepetitions}/{currentExerciseRepetitions}</div>
                <div>
                    Tiempo:
                    <Chronometer
                        isRunning={isRoutineActive}
                        onTick={handleTick} />
                </div>
                <div>
                    Descanso:
                    {seconds}
                </div>
            </div>
            <video ref={videoRef} width="640" height="480" style={StyleSheet.videoCanvasStyle} autoPlay></video>
            <canvas className="output_canvas" ref={canvasRef} style={StyleSheet.videoCanvasStyle}></canvas>
        </div>
    );
}