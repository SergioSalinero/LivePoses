import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

import { calculateAngleBetweenTwoLines } from '@/libraries/ExerciseRecognition';


export default function BlazePose() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
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

        async function drawSkeleton() {
            await tf.setBackend('webgl');
            const video = await setupCamera();
            const detectorConfig = {
                runtime: 'tfjs',
                modelType: 'lite'
            };
            const model = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, detectorConfig);

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;



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
                        drawLines(ctx, keypoints[line[0]], keypoints[line[1]]);
                    });


                    var point1 = {
                        x: keypoints[11].x,
                        y: keypoints[11].y
                    }

                    var point2 = {
                        x: keypoints[23].x,
                        y: keypoints[23].y
                    }

                    var point3 = {
                        x: keypoints[25].x,
                        y: keypoints[25].y
                    }
                    
                    console.log(calculateAngleBetweenTwoLines(point1, point2, point3));
                });


                window.requestAnimationFrame(predictWebcam);
            }

            predictWebcam();
        }

        drawSkeleton();

        function drawLines(ctx, keypoint1, keypoint2) {
            ctx.beginPath();
            ctx.moveTo(keypoint1.x, keypoint1.y);
            ctx.lineTo(keypoint2.x, keypoint2.y);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }

    }, []);

    const StyleSheet = {
        videoCanvasStyle: {
            width: '50%',
            height: 'auto',
            position: 'absolute', left: '0px', top: '0px',
            transform: 'scaleX(-1)'
        }
    }

    return (
        <div>
            <h1>BlazePose Demo</h1>
            <video ref={videoRef} width="640" height="480" style={StyleSheet.videoCanvasStyle} autoPlay></video>
            <canvas className="output_canvas" ref={canvasRef} style={StyleSheet.videoCanvasStyle}></canvas>
        </div>
    );
}