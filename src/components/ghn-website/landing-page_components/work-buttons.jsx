import { Grid } from '@material-ui/core';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';


const ImageButton = styled(ButtonBase)(({ theme }) => ({
    fontFamily: "'Quicksand', sans-serif",
    borderRadius: '5px!important',
    '&:hover, &.Mui-focusVisible': {
        transform: "scale(1.1)",
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0,
        },
        '& .ImageText': {
            fontSize: 0,
        }
    },
}));

const ImageText = styled('div')({
    color: 'white',
    position: 'relative',
    width: '20%',
    fontSize: '2em',
    p: 4,
    pt: 2,
    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
});

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: '5px!important',
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));


export default function WorkButtons({ photo_buttons }) {
    const openUrl = (url) => {
        window.open(url, '_blank');
    };

    return (
        <Grid alignItems="center" container spacing={0} justifyContent="center" style={{ marginBottom: "10vh" }}>
            {photo_buttons.map((photo, index) => (
                <Grid item key={index} style={{ width: '50vh', margin: '0.9%' }} >
                    <ImageButton
                        variant='contained'
                        focusRipple
                        key={index}
                        onClick={() => openUrl(photo.url)}
                        sx={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            backgroundSize: 'cover',
                            width: '50vh',
                            height: '20vh',
                            color: 'white',
                            backgroundPosition: 'center 40%',
                            backgroundImage: `url(${photo.image})`,
                            "&:hover":
                            {
                                transition: "all 0.275s",
                                transform: 'scale(1.3)',
                                width: '50vh',
                                height: '25vh',
                                backgroundImage: `url(${photo.hover_image})`
                            }
                        }}
                    >
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <ImageText className="ImageText">
                                {photo.name}
                            </ImageText>
                        </Image>
                    </ImageButton>
                </Grid>
            ))}
        </Grid>
    );
}