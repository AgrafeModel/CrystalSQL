const colors = require('tailwindcss/colors')
import { nextui } from "@nextui-org/react";
import * as cthemes from "./tailwindthemes"


const tthemes = {
  light: cthemes.purplelight_theme,
  dark: cthemes.purpledark_theme,
  lightblue: cthemes.bluelight_theme,
  darkblue: cthemes.bluedark_theme,
  lightgreen: cthemes.greenlight_theme,
  darkgreen: cthemes.greendark_theme,
  lightorange: cthemes.orangelight_theme,
  darkorange: cthemes.orangedark_theme,
  lightgrey: cthemes.greylight_theme,
  darkgrey: cthemes.greydark_theme,
  lightpink: cthemes.pinklight_theme,
  darkpink: cthemes.pinkdark_theme,
}


module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [nextui(
    {
      themes: tthemes,
    }
  )],
  themes: tthemes,


}
