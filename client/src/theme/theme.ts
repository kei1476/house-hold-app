import { createTheme } from "@mui/material";
import { blue, green, lightGreen, red } from "@mui/material/colors";

interface paletteColor {
  main: string;
  light: string;
  dark: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    pageColor: paletteColor;
    incomeColor: paletteColor;
    expenseColor: paletteColor;
    balanceColor: paletteColor;
    incomeCategoryColor: string;
    expenseCategoryColor: string;
  }

  interface PaletteOptions {
		pageColor: paletteColor;
    incomeColor?: paletteColor;
    expenseColor?: paletteColor;
    balanceColor?: paletteColor;
    incomeCategoryColor?: string;
    expenseCategoryColor?: string;
  }
}

export const theme = createTheme({
  typography: {
    // 以降はNoto Sans JPが表示されなかった時の代わりのフォント
    fontFamily: 'Noto Sans JP, Roboto, Helvetica, Arial ,sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  // paletteは色を定義するプロパティ
  palette: {
		pageColor: {
      main: lightGreen[500],
      light: lightGreen[50],
      dark: lightGreen[700],
    },
    incomeColor: {
      main: blue[400],
      light: blue[100],
      dark: blue[700],
    },
    expenseColor: {
      main: red['A200'],
      light: red[100],
      dark: red[700],
    },
    balanceColor: {
      main: green[400],
      light: green[100],
      dark: green[700],
    }
  }
})