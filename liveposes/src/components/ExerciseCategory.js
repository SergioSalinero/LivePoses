import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

import {
    SIDE_BAR_BUTTON_COLOR,
    SIDE_BAR_BUTTON_HOVER_COLOR,
} from '@/utils/Colors';

export default function ExerciseCategory({ imageURL, title, numRoutines, onClick }) {

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
}