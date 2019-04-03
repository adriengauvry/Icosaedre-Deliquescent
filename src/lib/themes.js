import { createMuiTheme } from '@material-ui/core/styles';

import { red, green, yellow, pink } from '@material-ui/core/colors';

function createTheme(t, c) {
  return createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      type: t,
      primary: { main: c[500] },
      secondary: { main: c[400] },
    },
  });
}

function theme(type, color) {
  let t, c = color;
  if (type === "dark") 
    t = type;
  else t = "light";
  switch(color){
    case 'green':
      c = green;
      break;
    case 'yellow':
      c = yellow;
      break;
    case 'pink':
      c = pink;
      break;
    default :
      c = red;
      break;
  }
  return createTheme(t, c);
}
  
export default theme;
