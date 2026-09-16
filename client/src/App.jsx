//Services
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React, {useState, useEffect} from 'react';
// import { Analytics } from "@vercel/analytics/react"
//Views
import HomePage from './views/home/HomePage';
import MainAuthView from './views/authentication/MainAuthView';
import AboutPage from './views/about/AboutPage';
import NavBar from './shared/navigation/NavBar';
function App(){

    return(
        <BrowserRouter>
        <Routes>
            <NavBar/>
            <Route path='/' element={HomePage}/>
            <Route path='/login' element={MainAuthView}/>
            <Route path='/about' element={AboutPage}/>

        </Routes>
        {/* Vercel analitics
        <Analytics/> */}
        </BrowserRouter>
    )
}

export default App;