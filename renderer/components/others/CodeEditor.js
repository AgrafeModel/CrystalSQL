import React from "react";
import { useTheme } from "next-themes";
import AceEditor from "react-ace";



import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import { purpleDarkTheme } from "./AceThemes";




const Editor = ({ onChange, value }) => {
  //theme is based on the theme of the app
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [editorTheme, setEditorTheme] = React.useState('monokai')
  //set the theme of the editor based on the theme of the app
  const themeManager = (theme) => {
    console.log(theme)
    //Start with dark
    if (theme.startsWith('dark')) {
      //get the rest of the theme name
      const themeName = theme.substring(4)
      switch (themeName) {
        case 'blue':
          setEditorTheme('tomorrow_night_blue')
          break;
        case 'green':
          setEditorTheme('tomorrow_night')
          break;
        case 'orange':
          setEditorTheme('tomorrow_night_eighties')
          break;
        case 'grey':
          setEditorTheme('twilight')
          break;
        case 'pink':
          setEditorTheme('pastel_on_dark')
          break;
        default://custom theme (purple dark)
          setEditorTheme('purple-dark')
          break;
      }
    } else {
      setEditorTheme('github')
    }
    setIsLoaded(true)
  }

  //memoize the themeManager function to avoid re-rendering
  const memoizedEditorTheme = React.useMemo(() => {
    return themeManager(theme)
  }
    , [theme]);

  return (
    <>

          <AceEditor
            mode="mysql"
            theme={editorTheme}
            fontSize={14}
            onChange={onChange}
            value={value}
            name="codeEditor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            width="100%"
            style={{ minHeight: '65vh', height: '100%' }}

          />




    </>
  )
};

export default Editor;