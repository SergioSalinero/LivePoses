import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

import {
    BACKGROUND_COLOR,
    SIDE_BAR_COLOR,
    SIDE_BAR_BUTTON_COLOR,
    SIDE_BAR_BUTTON_HOVER_COLOR,
    SIDE_BAR_TEX_COLOR,
    FLOATING_CONTAINER_COLOR,
    SECTION_TEXT_COLOR
} from '@/utils/Colors';

export default function ExerciseCategory({ imageURL, title, numRoutines, onClick }) {

    const StyleSheet = {
        rectangleButton: {
            width: '250px',
            height: '400px',
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
            borderRadius: '5px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            marginRight: '20px',
            fontFamily: 'Roboto, sans-serif',
        },
        image: {
            width: '250px',
            height: '250px',
            borderRadius: '5px 5px 0 0',
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
            borderRadius: '0 0 5px 5px',
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

        <Card sx={{
            maxWidth: 345,
            width: '250px',
            height: 'auto',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: '#0D0D0D',
            border: 'none',
            outline: 'none',
            borderRadius: '5px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            marginRight: '20px',
            fontFamily: 'Roboto, sans-serif',
        }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    image={imageURL}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'black',
                            padding: '8px',
                            backgroundImage: 'linear-gradient(to bottom, rgba(183,183,183,0.8) 0%, rgba(183,183,183,0.8) 100%)',
                            borderRadius: '5px',
                        }}
                    >
                        {numRoutines} routines
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                size="medium" 
                color="primary" 
                sx={{
                    backgroundColor: SIDE_BAR_BUTTON_COLOR,
                    color: 'white',            
                    '&:hover': {
                        backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR,
                    },
                    fontSize: '18px',
                    textAlign: 'right'
                }}
                onClick={onClick}
                >
                    Access
                </Button>
            </CardActions>
        </Card>

    );
    /*<button style={StyleSheet.rectangleButton} onClick={onClick}>
        <img src={imageURL} style={StyleSheet.image}></img>
        
        <div style={StyleSheet.textContainer}>
            <h1>{title}</h1>
        </div>

        <div style={StyleSheet.gradientOverlay}></div>

        <div style={StyleSheet.numRoutines}>{numRoutines} routines</div>
    </button>*/
}