//Services
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React, {useState, useEffect} from 'react';
// import { Analytics } from "@vercel/analytics/react"
//Views
import HomePage from './views/home/HomePage.jsx';
import MainAuthView from './views/authentication/MainAuthView.jsx';
import AboutPage from './views/about/AboutPage.jsx';
import NavBar from './shared/navigation/NavBar.jsx';
function App(){

    return(
        <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<MainAuthView/>}/>
            <Route path='/about' element={<AboutPage/>}/>

            <Route path="*" element={<Navigate to='/' replace/>}/>

        </Routes>
        {/* Vercel analitics
        <Analytics/> */}
        </BrowserRouter>
    )
}

export default App;