import { createTheme } from "@mui/material";
import { amber, blue, cyan, deepOrange, green, lightBlue, lightGreen, pink, purple, red } from "@mui/material/colors";

interface paletteColor {
  main: string;
  light: string;
  dark: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    incomeColor: paletteColor;
    expenseColor: paletteColor;
    balanceColor: paletteColor;
    incomeCategoryColor: string;
    expenseCategoryColor: string;
  }

  interface PaletteOptions {
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
    incomeColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700],
    },
    expenseColor: {
      main: red[500],
      light: red[100],
      dark: red[700],
    },
    balanceColor: {
      main: green[500],
      light: green[100],
      dark: green[700],
    },
    // incomeCategoryColor: {
    //   給与: lightBlue[600],
    //   副収入: cyan[200],
    //   お小遣い: lightGreen["A700"],
    // },
    // expenseCategoryColor: {
    //   食費: deepOrange[500],
    //   日用品: lightGreen[500],
    //   住居費: amber[500],
    //   交際費: pink[300],
    //   娯楽: cyan[200],
    //   交通費: purple[400],
    // },
  }
})