import React, { useState, useEffect } from 'react';

export default function Chronometer({ onTick, isRunning }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => {
          onTick(seconds + 1); // Call the function provided by the parent component
          return seconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTick]);

  return (
    <div>
      <p>{seconds} seconds</p>
    </div>
  );
}