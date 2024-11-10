export default function ExerciseCategory({ imageURL, title, cardio, strenght, movility, numRoutines, onClick }) {

    const StyleSheet = {
        rectangleButton: {
            width: '250px',
            height: '300px',
            display: 'inline-flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: '#0D0D0D', 
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: '20px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            marginRight: '20px',
            fontFamily: 'Roboto, sans-serif',
        },
        image: {
            width: '250px',
            height: '250px',
            borderRadius: '20px 20px 0 0',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%)',
            position: 'absolute',
            top: 0,
            left: 0
        },
        textContainer: {
            zIndex: '1',
            position: 'absolute',
            marginTop: '210px',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        gradientOverlay: {
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '300px',
            height: '250px',
            backgroundImage: 'linear-gradient(to bottom, rgba(13,13,13,0) 0%, rgba(13,13,13,1) 100%)',
            borderRadius: '0 0 18px 18px',
            zIndex: '0',
        },
        numRoutines: {
            position: 'absolute',
            padding: '8px',
            backgroundImage: 'linear-gradient(to bottom, rgba(183,183,183,0.6) 0%, rgba(183,183,183,0.6) 100%)',
            borderRadius: '10px',
            left: 0,
            marginLeft: '10px',
            marginTop: '120px'
        },
    }

    return (
        <button style={StyleSheet.rectangleButton} onClick={onClick}>
            <img src={imageURL} style={StyleSheet.image}></img>
            
            <div style={StyleSheet.textContainer}>
                <h1>{title}</h1>
            </div>

            <div style={StyleSheet.gradientOverlay}></div>

            <div style={StyleSheet.numRoutines}>{numRoutines} routines</div>
        </button>
    );
}