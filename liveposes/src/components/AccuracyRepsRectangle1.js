import React from 'react';

import { POSE_ESTIMATION_BACKGROUND_COLOR, BACKGROUND_COLOR } from '@/utils/Colors';

export default function AccuracyRepsRectangle1({ numRectangles }) {
  const rectangles = Array.from({ length: numRectangles });

  return (
    <div style={styles.container}>
      {rectangles.map((_, index) => (
        <div key={index} style={styles.rectangle}></div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%', 
    padding: '0 10px',
    backgroundColor: POSE_ESTIMATION_BACKGROUND_COLOR
  },
  rectangle: {
    width: '30px',
    height: '15vh',
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: '20px'
  }
};