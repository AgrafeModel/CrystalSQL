const orangelight_theme = {
    extend: "light",
    colors: {
        background: "#ffe1b5",
        foreground: "#000000",
        primary: {
            '50': '#ffe1b5',
            '100': '#ffc683',
            '200': '#ff9c4e',
            '300': '#ff7721',
            '400': '#ff5700',
            '500': '#ff5700',
            '600': '#ff5700',
            '700': '#ff5700',
            '800': '#ff5700',
            '900': '#ff5700',
            '950': '#ff5700',
            DEFAULT: "#ff5700",
            foreground: "#000000",
        },
    },
};


//same but darked (more blue and black)
const purpledark_theme = {
    extend: "dark", // <- inherit default values from dark theme
    colors: {
        background: "#0D001A",
        foreground: "#ffffff",
        primary: {
            '50': '#0d001a',
            '100': '#18002d',
            '200': '#280047',
            '300': '#3a0067',
            '400': '#4f008c',
            '500': '#670eb0',
            '600': '#7c3aed',
            '700': '#8a48e1',
            '800': '#9c61e4',
            '900': '#ae7ef6',
            '950': '#caabfd',
            DEFAULT: "#670eb0",
            foreground: "#ffffff",

        },
        focus: "#7c3aed",
    },
    layout: {
        disabledOpacity: "0.3",
        radius: {
            small: "4px",
            medium: "6px",
            large: "8px",
        },
        borderWidth: {
            small: "1px",
            medium: "2px",
            large: "3px",
        },
    },
};

const purplelight_theme = {
    extend: "light", // <- inherit default values from dark theme
    colors: {
        background: "#ffffff",
        foreground: "#000000",
        primary: {
            '50': '#f5f3ff',
            '100': '#ede9fe',
            '200': '#ddd6fe',
            '300': '#c4b5fd',
            '400': '#a78bfa',
            '500': '#8b5cf6',
            '600': '#7c3aed',
            '700': '#6d28d9',
            '800': '#5b21b6',
            '900': '#4c1d95',
            '950': '#2e1065',
            DEFAULT: "#8b5cf6",
            foreground: "#000000",


        },

    },
    layout: {
        disabledOpacity: "0.3",
        radius: {
            small: "4px",
            medium: "6px",
            large: "8px",
        },
        borderWidth: {
            small: "1px",
            medium: "2px",
            large: "3px",
        },
    },
};

const bluelight_theme = {
    extend: "light",
    colors: {
        background: "#e3f7ff",
        foreground: "#000000",
        primary: {
            '50': '#e3f7ff',
            '100': '#c7f0ff',
            '200': '#9fdeff',
            '300': '#7ac7ff',
            '400': '#53a6ff',
            '500': '#2e84ff',
            '600': '#0074ff',
            '700': '#0057cc',
            '800': '#004499',
            '900': '#003166',
            '950': '#001a33',
            DEFAULT: "#2e84ff",
            foreground: "#000000",
        },
    },
};

const greenlight_theme = {
    extend: "light",
    colors: {
        background: "#e2fff3",
        foreground: "#000000",
        primary: {
            '50': '#e2fff3',
            '100': '#c3ffd7',
            '200': '#a3ffba',
            '300': '#7dffa0',
            '400': '#53ff85',
            '500': '#29ff6b',
            '600': '#00ff53',
            '700': '#00cc45',
            '800': '#009936',
            '900': '#007b27',
            '950': '#004d17',
            DEFAULT: "#29ff6b",
            foreground: "#000000",
        },
    },
};

const greylight_theme = {
    extend: "light",
    colors: {
      background: "#f3f3f3",
      foreground: "#000000",
      primary: {
        '50': '#f3f3f3',
        '100': '#e0e0e0',
        '200': '#cccccc',
        '300': '#b8b8b8',
        '400': '#a6a6a6',
        '500': '#949494',
        '600': '#838383',
        '700': '#727272',
        '800': '#616161',
        '900': '#515151',
        '950': '#404040',
        DEFAULT: "#949494",
        foreground: "#000000",
      },
    },
  };
  
  const pinklight_theme = {
    extend: "light",
    colors: {
      background: "#ffebf2",
      foreground: "#000000",
      primary: {
        '50': '#ffebf2',
        '100': '#ffccd8',
        '200': '#ffaebd',
        '300': '#ff8ca1',
        '400': '#ff6a84',
        '500': '#ff4a68',
        '600': '#ff3b58',
        '700': '#ff2c48',
        '800': '#ff1e37',
        '900': '#ff0f26',
        '950': '#ff0811',
        DEFAULT: "#ff4a68",
        foreground: "#000000",
      },
    },
  };

  const bluedark_theme = {
    extend: "dark",
    colors: {
      background: "#001f3f",
      foreground: "#ffffff",
      primary: {
        '50': '#001f3f',
        '100': '#003d71',
        '200': '#0077cc',
        '300': '#00a8e8',
        '400': '#00b9ff',
        '500': '#00ccff',
        '600': '#33dfff',
        '700': '#66ecff',
        '800': '#99f9ff',
        '900': '#ccffff',
        '950': '#e5fcff',
        DEFAULT: "#00ccff",
        foreground: "#ffffff",
      },
      focus: "#0077cc",
    },
  };

  const greendark_theme = {
    extend: "dark",
    colors: {
      background: "#002900",
      foreground: "#ffffff",
      primary: {
        '50': '#002900',
        '100': '#004b00',
        '200': '#008d00',
        '300': '#00c100',
        '400': '#00ff00',
        '500': '#00ff33',
        '600': '#00ff66',
        '700': '#00ff99',
        '800': '#00ffcc',
        '900': '#00ffff',
        '950': '#99ffcc',
        DEFAULT: "#00ff33",
        foreground: "#ffffff",
      },
      focus: "#008d00",
    },
  };

  const orangedark_theme = {
    extend: "dark",
    colors: {
      background: "#3d0000",
      foreground: "#ffffff",
      primary: {
        '50': '#3d0000',
        '100': '#ff3300',
        '200': '#ff6600',
        '300': '#ff9900',
        '400': '#ffcc00',
        '500': '#ffcc33',
        '600': '#ffcc66',
        '700': '#ffcc99',
        '800': '#ffcccc',
        '900': '#ffff00',
        '950': '#ff9900',
        DEFAULT: "#ffcc33",
        foreground: "#ffffff",
      },
      focus: "#ff9900",
    },
  };
  
  const greydark_theme = {
    extend: "dark",
    colors: {
      background: "#333333",
      foreground: "#ffffff",
      primary: {
        '50': '#333333',
        '100': '#666666',
        '200': '#999999',
        '300': '#cccccc',
        '400': '#e5e5e5',
        '500': '#f2f2f2',
        '600': '#f9f9f9',
        '700': '#ffffff',
        '800': '#ffffff',
        '900': '#ffffff',
        '950': '#f2f2f2',
        DEFAULT: "#f2f2f2",
        foreground: "#ffffff",
      },
      focus: "#999999",
    },
  };

  const pinkdark_theme = {
    extend: "dark",
    colors: {
      background: "#33001b",
      foreground: "#ffffff",
      primary: {
        '50': '#33001b',
        '100': '#660036',
        '200': '#990053',
        '300': '#cc006f',
        '400': '#ff008c',
        '500': '#ff1aa3',
        '600': '#ff34b9',
        '700': '#ff4ecf',
        '800': '#ff68e6',
        '900': '#ff82fc',
        '950': '#ffccff',
        DEFAULT: "#ff1aa3",
        foreground: "#ffffff",
      },
      focus: "#990053",
    },
  };
  
  
  
  
  

export {purpledark_theme, purplelight_theme, bluelight_theme, greenlight_theme, orangelight_theme, greylight_theme, pinklight_theme, bluedark_theme, greendark_theme, orangedark_theme, greydark_theme, pinkdark_theme}
