import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./LandingPage";
import Footer from "./Footer";
import ProjectsOverview from "./ProjectsOverview";
import TalksOverview from "./TalksOverview";
import NotFound from "./NotFound"

import ThemeProvider from 'react-bootstrap/ThemeProvider'


function App() {
    return (

        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/projects" element={<ProjectsOverview />} />
                    <Route path="/talks" element={<TalksOverview />} />
                    <Route component={<NotFound />} />
                </Routes>
            </Router>
            <div>
                <Footer />
            </div>
        </ThemeProvider>

    )
}

export default App
