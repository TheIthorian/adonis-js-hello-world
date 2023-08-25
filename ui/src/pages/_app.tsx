import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme } from '@/styles/themes'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            {/* <ThemeProvider theme={lightTheme}> */}
            <CssBaseline />
            <Component {...pageProps} />{' '}
        </ThemeProvider>
    )
}
