import {PaletteOptions} from "@mui/material";
import {Colors} from "../constants/colors.constants";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

const palette: PaletteOptions = {
  primary: {
    main: Colors.primary,
  },
  secondary: {
    main: Colors.secondary,
  },
  neutral: {
    main: Colors.white,
  },
  error: {
    main: Colors.error,
  },
  background: {
    default: "rgb(249, 249, 249)"
  },
  text: {
    secondary: Colors.secondaryText
  }
};


export default palette;
