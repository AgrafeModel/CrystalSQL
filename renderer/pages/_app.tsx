import React from "react";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import {NavigationProvider} from "../utils/NavigationContext";
config.autoAddCss = false;
import {QueryContextProvider} from "../utils/QueryManager";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme={"light"}
        themes={[
          "light",
          "dark",
          "lightblue",
          "darkblue",
          "lightgreen",
          "darkgreen",
          "lightorange",
          "darkorange",
          "lightgrey",
          "darkgrey",
          "lightpink",
          "darkpink",
        ]}
      >
        <NavigationProvider>
          <QueryContextProvider>
            <Component {...pageProps} />
          </QueryContextProvider>
          </NavigationProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default MyApp;
