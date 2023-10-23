import React from 'react'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider> 
      <NextThemesProvider attribute="class" defaultTheme="purple-dark">
      <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  )
  
}

export default MyApp
