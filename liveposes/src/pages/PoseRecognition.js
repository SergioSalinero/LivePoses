import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';


import { exerciseRecognitionByAngles, exerciseRecognitionByAnglesAndDistances, calculateAngleBetweenTwoLines } from '@/libraries/ExerciseRecognition';
import AccuracyRepsRectangle1 from '@/components/AccuracyRepsRectangle1';
import AccuracyRepsRectangle2 from '@/components/AccuracyRepsRectangle2';
import Chronometer from '@/components/Chronometer';
import CountdownTimer from '@/components/CountDownTimer';

import {
    GET_EXERCISES_URL,
    GET_CURRENT_ROUTINE_URL,
    GET_START_SIGNAL,
    POST_BASIC_STATISTICS_URL,
    POST_ROUTINE_HISTORY_URL
} from '@/utils/Config';

import { POSE_ESTIMATION_BACKGROUND_COLOR } from '@/utils/Colors';



export default function PoseRecognition() {

    var startSignal;
    var exercises;
    var [currentRoutine, setCurrentRoutine] = useState([]);
    var [token, setToken] = useState('');

    var createdDetector = false;

    const router = useRouter();
    const [error, setError] = useState(null);

    var [color, setColor] = useState('red');
    var [isRoutineActive, setIsRoutineActive] = useState(false);
    var isFirstTime = true;
    var [breakTime, setBreakTime] = useState(0);
    //var [isBreakTimeActive, setIsBreakTimeActive] = useState(false);
    var isBreakTimeActive = false;
    var isFirstTimeBreakTimeActive = true;
    var [seconds, setSeconds] = useState(0);

    var [currentExercise, setCurrentExercise] = useState([]);
    var [currentExerciseIndex, setCurrentExerciseIndex] = useState(-1);
    var previousExerciseStatus = 'START';
    var currentExerciseRepetitionsAux = -1;
    var currentRepetitionsAux = 0;
    const [currentRepetitions, setCurrentRepetitions] = useState(0);
    const [currentExerciseRepetitions, setCurrentExerciseRepetition] = useState(0);
    const [currentExerciseName, setCurrentExerciseName] = useState('');
    const [totalReps, setTotalReps] = useState(0);
    const [rectangleHeightArray, setRectangleHeightArray] = useState([]);
    let rectangleHeightArrayAux, rectangleHeightArrayTransformed;
    var sumTotalReps = 0;

    const [accuracy, setAccuracyValue] = useState(0);
    const [globalRepetitions, setGlobalRepetitions] = useState(0);
    const [rectangleHeight, setRectangleHeight] = useState(0);
    let rectangleHeightAux;

    var [totalExercises, setTotalExercises] = useState(-5);
    var [breakTimeCounter, setBreakTimeCounter] = useState(0);
    var [timeCounter, setTimeCounter] = useState(0);


    const videoRef = useRef(null);
    const canvasRef = useRef(null);


    useEffect(() => {
        document.body.style.backgroundColor = POSE_ESTIMATION_BACKGROUND_COLOR;
        document.body.style.overflowX = 'hidden';

        const storedToken = localStorage.getItem('accessToken');
        if (storedToken !== null && storedToken !== undefined) {
            setToken(storedToken);
            token = storedToken;
        }
        else {
            router.push('/Login');
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
            } catch (error) {
                console.error('Error fetching data: ', error);
                router.push('/PoseRecognition');
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
            } catch (error) {
                console.error('Error fetching data: ', error);
                router.push('/PoseRecognition');
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
                setCurrentRoutine(jsonData);
                currentRoutine = jsonData;

                setBreakTime(currentRoutine.breakTime);
                breakTime = currentRoutine.breakTime;
                setSeconds(currentRoutine.breakTime);


                currentRoutine.exercises.forEach((element) => {
                    sumTotalReps += element.repetitions;
                });

                setTotalReps(sumTotalReps);

                rectangleHeightArrayAux = Array(sumTotalReps).fill(0);
                rectangleHeightArrayTransformed = Array(sumTotalReps).fill(0);

                totalExercises = currentRoutine.exercises.length;
                setTotalExercises(currentRoutine.exercises.length);

                setExerciseStatus();
            } catch (error) {
                console.error('Error fetching data: ', error);
                router.push('/PoseRecognition');
            }
        }

        fecthExercises();
        fetchStartSignal();
        fetchCurrentRoutine();
    }, []);


    function setExerciseStatus() {
        setCurrentExerciseIndex(prevIndex => prevIndex + 1);
        currentExerciseIndex++;
        setSeconds(currentRoutine.breakTime);

        /* END OF ROUTINE */
        if (currentExerciseIndex >= totalExercises && typeof totalExercises != 'undefined')
            return;
        else {
            let found = false;
            exercises.forEach((exercise) => {
                if (!found && exercise.id == currentRoutine.exercises[currentExerciseIndex].exerciseId) {
                    setCurrentExercise(exercise);
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

            rectangleHeightArrayAux = Array(sumTotalReps).fill(0);
            rectangleHeightArrayTransformed = Array(sumTotalReps).fill(0);
            setRectangleHeightArray(rectangleHeightArrayTransformed);
        }

        //console.log(currentExerciseIndex, currentExercise, currentExerciseRepetitions, currentRepetitions);
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
                        setBreakTimeCounter(prevCounter => prevCounter + breakTime);
                        isFirstTimeBreakTimeActive = false;

                        interval = setInterval(() => {
                            //console.log("2: " + seconds)
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
                    else if (!isBreakTimeActive) {
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
                var rightAngle = calculateAngleBetweenTwoLines(rightPoint1, rightPoint2, rightPoint3);
                var leftAngle = calculateAngleBetweenTwoLines(leftPoint1, leftPoint2, leftPoint3);
                var exerciseStatus = exerciseRecognitionByAngles(rightPoint1, rightPoint2, rightPoint3, leftPoint1, leftPoint2, leftPoint3, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, rightAngle, leftAngle);
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

                var rightAngle = calculateAngleBetweenTwoLines(rightPoint1, rightPoint2, rightPoint3);
                var leftAngle = calculateAngleBetweenTwoLines(leftPoint1, leftPoint2, leftPoint3);

                var exerciseStatus = exerciseRecognitionByAnglesAndDistances(rightPoint1, rightPoint2, rightPoint3, rightPointDistance1, rightPointDistance2, leftPoint1, leftPoint2, leftPoint3, leftPointDistance1, leftPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, rightAngle, leftAngle);
            }

            if (typeof exerciseStatus == 'undefined')
                exerciseStatus = previousExerciseStatus;

            if (exerciseStatus != previousExerciseStatus && exerciseStatus == 'START') {
                setCurrentRepetitions(prevRepetitions => prevRepetitions + 1);

                setAccuracyValue(prevAccuracy => prevAccuracy + rectangleHeightAux);
                setGlobalRepetitions(prevGlobalRepetitions => prevGlobalRepetitions + 1)

                currentRepetitionsAux++;
                setColor('green');
                color = 'green';
            }

            if (exerciseStatus == 'END') {
                setColor('green');
                color = 'green';

                setAccuracy(rightAngle, leftAngle, upperAngleMax, upperAngleMin);
            }
            else {
                setColor('white');
                color = 'white';
            }

            previousExerciseStatus = exerciseStatus;


            /* End of exercise */
            if (currentRepetitionsAux >= currentExerciseRepetitionsAux)
                setExerciseStatus();
        }
    }

    function setAccuracy(rightAngle, leftAngle, upperAngleMax, upperAngleMin) {
        var rightAngleAccuracy = Math.abs(upperAngleMax - rightAngle);
        var leftAngleAccuracy = Math.abs(upperAngleMax - leftAngle);
        var previousAngleAccuracy = Math.abs(upperAngleMax - rectangleHeightArrayAux[currentRepetitionsAux]);

        var compareAccuracy, compareAngle;
        if (rightAngleAccuracy < leftAngleAccuracy) {
            compareAccuracy = rightAngleAccuracy;
            compareAngle = rightAngle;
        }
        else {
            compareAccuracy = leftAngleAccuracy;
            compareAngle = leftAngle;
        }

        //console.log('Accuracy' + rightAngleAccuracy + '    ' + rightAngle + '    ' + previousAngleAccuracy + '    ' + rectangleHeightArrayAux[currentExerciseIndex] + '    ' + compareAngle)

        if (previousAngleAccuracy > compareAccuracy) {
            rectangleHeightArrayAux[currentRepetitionsAux] = compareAngle;
            rectangleHeightArrayTransformed[currentRepetitionsAux] = Math.abs(1 + ((compareAngle - upperAngleMin) / (upperAngleMax - upperAngleMin)) * (15 - 1));
            setRectangleHeight(rectangleHeightArrayTransformed[currentRepetitionsAux]);
            setRectangleHeightArray(rectangleHeightArrayTransformed);
            rectangleHeightAux = rectangleHeightArrayTransformed[currentRepetitionsAux];
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

            var rightAngle = calculateAngleBetweenTwoLines(rightPoint1, rightPoint2, rightPoint3);
            var leftAngle = calculateAngleBetweenTwoLines(leftPoint1, leftPoint2, leftPoint3);

            var exerciseStatus = exerciseRecognitionByAnglesAndDistances(rightPoint1, rightPoint2, rightPoint3, rightPointDistance1, rightPointDistance2, leftPoint1, leftPoint2, leftPoint3, leftPointDistance1, leftPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, rightAngle, leftAngle);


            if (typeof exerciseStatus == 'undefined')
                exerciseStatus = previousExerciseStatus;

            if (exerciseStatus != previousExerciseStatus && exerciseStatus == 'END') {
                setColor('orange');
                color = 'orange';

                setTimeout(() => {
                    isFirstTime = false;
                    previousExerciseStatus = 'START';

                    setIsRoutineActive(true);
                    isRoutineActive = true;



                    return;
                }, 2000);
            }

            previousExerciseStatus = exerciseStatus;
        }
    }

    async function setRoutineFinishedData(seconds) {
        let averageAccuracy = (accuracy * 100) / (globalRepetitions * 15);

        const basicStatistics = {
            timeCounter: seconds,
            breakTimeCounter: breakTimeCounter,
            averageAccuracy: averageAccuracy
        }

        try {
            const response = await fetch(POST_BASIC_STATISTICS_URL, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(basicStatistics),
            });

            if (response.ok) {
                
            } else if (response.status === 500) {
                setError('Internal server error. Please try again later.');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error('Error processing request:', error);
            setError('Error processing request. Please try again later.');
        }


        const routineHistory = {
            exercises: currentRoutine.exercises,
            breakTime: breakTime,
            accuracy: averageAccuracy
        }

        try {
            const response = await fetch(POST_ROUTINE_HISTORY_URL, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(routineHistory),
            });

            if (response.ok) {
                router.push('/Home');
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





    const handleTick = (seconds) => {
        setTimeCounter(seconds);

        if (currentExerciseIndex == totalExercises && typeof totalExercises != 'undefined')
            setRoutineFinishedData(seconds)
    };

    function handleCountDownTimerComplete() {
        isBreakTimeActive = false;
        setIsRoutineActive(true);
        isRoutineActive = true;

        setSeconds(breakTime);
        seconds = breakTime;
    }

    const StyleSheet = {
        mainContainer: {
            fontFamily: 'Montserrat, sans-serif',
        },
        videoCanvasStyle: {
            width: '50%',
            height: 'auto',
            position: 'absolute',
            left: '0px',
            top: '0px',
            transform: 'scaleX(-1)',
        },
        dataDivContainer: {
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            right: '0%',
            top: '0px',
            backgroundColor: '#2B2A2B',
            borderRadius: '10px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
            opacity: 0.7,
        },
        dataDivText: {
            color: 'white',
            fontSize: '22px',
            padding: '0px 15px 15px 17px',
            lineHeight: '0.5'
        },
        guideImage: {
            width: '50%',
            height: '80%',
            position: 'absolute',
            right: '0%',
            top: '0px',
        },
        repetitionsDivContainer: {
            width: '90%',
            height: 'auto',
            position: 'absolute',
            left: '0',
            paddingLeft: '30px',
            //top: '70%',
            bottom: '20px',
            //fontSize: '38px',
            //backgroundColor: POSE_ESTIMATION_BACKGROUND_COLOR,
            color: 'white'
        },
        accuracyTitle: {
            padding: '0',
            fontSize: '30px',
            position: 'absolute',
            width: '98.5%',
            height: '20vh',
            bottom: '0',
            left: '0',
            paddingLeft: '30px',
            backgroundColor: POSE_ESTIMATION_BACKGROUND_COLOR,
            color: 'white',
            borderRadius: '20px'
        }
    }

    return (
        /*
        <video ref={videoRef} width="640" height="480" style={StyleSheet.videoCanvasStyle} autoPlay></video>
        <canvas className="output_canvas" ref={canvasRef} style={StyleSheet.videoCanvasStyle}></canvas>
        */
        <div style={StyleSheet.mainContainer}>
            <img src={currentExercise.src} style={StyleSheet.guideImage}></img>

            <div style={StyleSheet.dataDivContainer}>
                <div style={StyleSheet.dataDivText}>
                    <p style={{fontWeight:'bold'}}>{currentExerciseName}</p>
                    <p><span style={{fontWeight:'bold'}}>{currentRepetitions}/{currentExerciseRepetitions}</span> Reps</p>
                    <div>
                        <Chronometer
                            isRunning={isRoutineActive}
                            onTick={handleTick} />
                    </div>
                    <div>
                        <span style={{fontWeight:'bold'}}>{seconds}</span>
                        &nbsp;segs breaktime
                    </div>
                </div>
            </div>


            <video ref={videoRef} width="640" height="480" style={StyleSheet.videoCanvasStyle} autoPlay></video>
            <canvas className="output_canvas" ref={canvasRef} style={StyleSheet.videoCanvasStyle}></canvas>

            <p style={StyleSheet.accuracyTitle}>Accuracy</p>
            <div style={StyleSheet.repetitionsDivContainer}>
                <AccuracyRepsRectangle1
                    numRectangles={currentExerciseRepetitions}
                />
            </div>

            <div style={StyleSheet.repetitionsDivContainer}>
                <AccuracyRepsRectangle2
                    numRectangles={currentExerciseRepetitions}
                    heightsArray={rectangleHeightArray}
                />
            </div>
        </div>
    );
}