import React, { useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import './i18n/i18n';
import { useTranslation } from "react-i18next";
import { getPortfolioData } from "./data/portfolio.data";

import Layout from "./Components/Layout/Layout";
import GridBackground from "./Components/Decor/GridBackground";
import Seo from "./Components/Seo/Seo";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Resume from "./Pages/Resume";
import Contact from "./Pages/Contact";
import Accessibility from "./Pages/Accessibility";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import CvPage from "./Pages/Cv/CvPage";

// F1–F5 keyboard shortcuts, kept as a hidden nicety
const SHORTCUTS: Record<string, string> = {
    F1: '/',
    F2: '/projects',
    F3: '/resume',
    F4: '/contact',
    F5: '/accessibility',
};

const KeyboardShortcuts: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const path = SHORTCUTS[event.key];
            if (path) {
                event.preventDefault();
                navigate(path);
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [navigate]);

    return null;
};

const App: React.FC = () => {
    const { i18n } = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || 'en').startsWith('fr') ? 'fr' : 'en';
    const data = useMemo(() => getPortfolioData(lang), [lang]);

    return (
        <Router>
            <Routes>
                {/* Printable CV: standalone A4 page, no site chrome */}
                <Route path="/cv/:lang?" element={<CvPage />} />
                <Route
                    path="*"
                    element={
                        <>
                            <GridBackground />
                            <KeyboardShortcuts />
                            <Seo />
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/projects" element={<Projects projects={data.projects} />} />
                                    <Route path="/resume" element={<Resume experiences={data.experiences} educations={data.educations} />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/accessibility" element={<Accessibility />} />
                                    <Route path="/legal" element={<Legal />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Layout>
                        </>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
