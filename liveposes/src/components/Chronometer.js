import React, { useState, useEffect } from 'react';

export default function Chronometer({ isRunning, onTick }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const updatedSeconds = prevSeconds + 1;
          return updatedSeconds;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Llamamos a onTick cuando se actualizan los segundos, pero fuera del render
  useEffect(() => {
    if (onTick) {
      onTick(seconds);  // Llamada a la función onTick fuera de la renderización
    }
  }, [seconds, onTick]);

  return (
    <div>
      <p>{seconds} segundos</p>
    </div>
  );
}
