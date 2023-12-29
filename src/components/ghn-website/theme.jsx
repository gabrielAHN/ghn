import { createTheme } from '@material-ui/core/styles';
import { yellow, lightBlue } from '@material-ui/core/colors';

const theme = createTheme({
    palette:{
        primary: yellow,
        secondary: lightBlue
    },
    transitions: {
      duration: {
        shortest: 1000
      }
    },
    button: {
        // textTransform: "none"
        // fontWeight: 500,
        // fontStyle: 'italic',
        // fontFamily: 'Comfortaa, cursive;',
      },
    typography: {
        button: {
            textTransform: "none"
          },
        fontFamily: [
            'Quicksand, sans-serif;'
          ].join(','),
    },
    // h3: undefined,
});

export default theme;