import Grid from '@mui/material/Grid';
import Map from 'react-map-gl';
import DeckGL, { FlyToInterpolator } from 'deck.gl';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { BIO_INFO } from '../bio-data';
import { useState } from 'react';
import { useCallback, useMemo } from 'react';


const MAPBOX_TOKEN = import.meta.env.VITE_MAPS_API;
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';


export default function BioMap() {
    const theme = useTheme();
    const [state, setState] = useState({
        viewState: BIO_INFO["now"].view,
        buttonState: 0,
    });

    const CountryList = useMemo(() => Object.keys(BIO_INFO), []);

    const onButtonChange = useCallback((increment) => {
        setState((prevState) => {
            const newButtonState = (prevState.buttonState + increment + CountryList.length) % CountryList.length;
            return {
                ...prevState,
                buttonState: newButtonState,
                viewState: {
                    ...BIO_INFO[CountryList[newButtonState]].view,
                    pitch: 0,
                    bearing: 0,
                    transitionInterpolator: new FlyToInterpolator(),
                },
            };
        });
    }, [CountryList]);

    const { buttonState } = state;

    const NextCountry = (increment) => {
        const newButtonState = (buttonState + increment + CountryList.length) % CountryList.length;
        return CountryList[newButtonState];
    }



    return (
        <Grid container spacing={2} style={{ position: 'relative' }}>
            <div style={{
                top: '5vw',
                left: '5vw',
                position: "relative",
                maxHeight: '70vh',
                maxWidth: '40vw',
                minWidth: '37vw',
                minHeight: '30vh',
                textAlign: 'left',
                backgroundColor: "rgba(255, 255, 255)",
                borderRadius: '5px',
                padding: '1%',
                zIndex: 1000,
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${BIO_INFO[CountryList[buttonState]].photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: BIO_INFO[CountryList[buttonState]].opacity,
                    borderRadius: '5px',
                    zIndex: -1,
                }}></div>
                <h1 style={{ fontSize: '2em' }}>{BIO_INFO[CountryList[buttonState]].header}</h1>
                <div dangerouslySetInnerHTML={BIO_INFO[CountryList[buttonState]].paragraph} />
                <MobileStepper
                    variant="progress"
                    steps={4}
                    position="static"
                    sx={{ height: '1vh', width: '70%', margin: 'auto' }}
                    activeStep={state.buttonState}
                    nextButton={
                        <Button size="small" onClick={() => onButtonChange(1)}
                            disabled={state.buttonState === 4}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={() => onButtonChange(-1)}
                            disabled={state.buttonState === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                        </Button>
                    }
                />
            </div>
            <Grid item xs={12} style={{ height: '30vh' }}>
                <DeckGL
                    style={{ width: '100%', height: '100%' }}
                    initialViewState={state.viewState}
                    controller={{
                        "dragPan": false,
                        "dragRotate": false,
                        "scrollZoom": false
                    }}
                >
                    <Map
                        mapStyle={MAP_STYLE}
                        preventStyleDiffing={true}
                        mapboxAccessToken={MAPBOX_TOKEN}

                    />
                </DeckGL>
            </Grid>
        </Grid>
    );
}