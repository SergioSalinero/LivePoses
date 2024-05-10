export default function ExerciseCategory({ imageURL, title, cardio, strenght, movility, numRoutines, onClick }) {

    const StyleSheet = {
        rectangleButton: {
            width: '300px', // Calculamos un tercio del contenedor y restamos el espacio entre los elementos
            height: '400px', /* Ajusta la altura según lo necesites */
            //display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: '#0C3E7D', // Por defecto, pero se puede modificar para cada instancia de RectangleComponent
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: '20px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            marginRight: '20px'
        },
        image: {
            width: '300px',
            height: '300px',
            borderRadius: '20px 20px 0 0',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%)',
            position: 'absolute',
            top: 0,
            left: 0
        },
        textContainer: {
            zIndex: '1',
            position: 'absolute',
            marginTop: '230px',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        gradientOverlay: {
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '300px',
            height: '250px',
            backgroundImage: 'linear-gradient(to bottom, rgba(16,82,147,0) 0%, rgba(16,82,147,1) 100%)',
            borderRadius: '0 0 18px 18px',
            zIndex: '0',
        },
        numRoutines: {
            position: 'absolute',
            padding: '8px',
            backgroundImage: 'linear-gradient(to bottom, rgba(183,183,183,0.7) 0%, rgba(183,183,183,0.7) 100%)',
            borderRadius: '10px',
            left: 0,
            marginLeft: '10px',
            marginTop: '200px'
        }
    }

    return (
        <button style={StyleSheet.rectangleButton} onClick={onClick}>
            <img src={imageURL} style={StyleSheet.image}></img>
            
            <div style={StyleSheet.textContainer}>
                <h1>{title}</h1>
                <p>Cardio</p>
                <p>Strength</p>
                <p>Movility</p>
            </div>

            <div style={StyleSheet.gradientOverlay}></div>

            <div style={StyleSheet.numRoutines}>{numRoutines} routines</div>
        </button>
    );
}