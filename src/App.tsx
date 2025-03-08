import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './theme/ThemeContext';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import './i18n/i18n';

import Layout from "./Components/Layout/Layout.tsx";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Resume from "./Pages/Resume";
import Contact from "./Pages/Contact";

const App: React.FC = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(i18n.language);
        };

        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

    return (
        <ThemeProvider>
            <CssBaseline />
            <Router>
                <Layout>
                    <motion.div
                        key={language}
                        initial={{opacity: 0, x: -100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6}}
                    >
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/projects" element={<Projects/>}/>
                            <Route path="/resume" element={<Resume/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                        </Routes>
                    </motion.div>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;
