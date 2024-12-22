import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ initialValue, isRunning, onComplete }) {
    var [seconds, setSeconds] = useState(initialValue);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(seconds => {
                    if (seconds == 0) {
                        clearInterval(interval);
                        onComplete(); // Call the callback function provided by the parent component
                        return 0;
                    }
                    return seconds - 1;
                });
            }, 1000);
        } else {
            //seconds = initialValue;
            //setSeconds(initialValue);
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, onComplete]);

    // Reset seconds when initialValue changes
    useEffect(() => {
        setSeconds(initialValue);
    }, [initialValue]);


    return (
        <div>
            <p>{seconds} seconds</p>
        </div>
    );
}
