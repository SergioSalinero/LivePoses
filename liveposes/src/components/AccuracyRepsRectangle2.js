import React from 'react';
import { ACCURACY_RECTANGLE_COLOR } from '@/utils/Colors';

export default function AccuracyRepsRectangle2({ numRectangles, heightsArray }) {
  const rectangles = Array.from({ length: numRectangles });

  return (
    <div style={styles.container}>
      {rectangles.map((_, index) => (
        <div 
          key={index} 
          style={{ 
            ...styles.rectangle, 
            height: `${heightsArray[index]}vh`
          }}
        ></div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', // Usa flexbox para distribuir los rectángulos
    justifyContent: 'space-between', // Distribuye los rectángulos uniformemente
    alignItems: 'flex-end', // Alinea los rectángulos por la base
    width: '100%', 
    padding: '0 10px',
    height: '100vh', // Ajusta según tus necesidades
    //backgroundColor: 'green'
  },
  rectangle: {
    width: '30px',
    backgroundColor: ACCURACY_RECTANGLE_COLOR,
    borderRadius: '20px',
  }
};
