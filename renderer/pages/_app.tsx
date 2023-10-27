import React from "react";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { NavigationProvider } from "../utils/NavigationContext";
import { QueryContextProvider } from "../utils/QueryManager";
import { DashboardContextProvider } from "../utils/DashboardManager";

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
            <DashboardContextProvider>
              <Component {...pageProps} />
            </DashboardContextProvider>
          </QueryContextProvider>
        </NavigationProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default MyApp;
