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
    typography: {
        button: {
            textTransform: "none"
          },
        fontFamily: [
            'Quicksand, sans-serif;'
          ].join(','),
    }
});

export default theme;