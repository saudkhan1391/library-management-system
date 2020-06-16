import React from 'react'
import { BrowserRouter,  } from 'react-router-dom'
import Routes from './routes'
import ContextProvider from '../store/store'
export default function MyApp() {
    return (
        <BrowserRouter>
            <ContextProvider>
                <Routes />
            </ContextProvider>
        </BrowserRouter>
    )
}