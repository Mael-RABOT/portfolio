import React, { useLayoutEffect, useMemo, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import './App.css';
import './i18n/i18n';
import { useTranslation } from "react-i18next";
import { getPortfolioData } from "./data/portfolio.data";
import { langFromPath, stripLang, toLanguage, useLanguage, withLang } from "./i18n/locale";

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

/**
 * The URL decides the language (/fr/... is French). Only on the very first load, an English URL
 * is swapped for its French twin when French is preferred (saved choice, else the browser).
 * Layout effect: the language is right before the first paint and before any page transition snapshot.
 */
const LangSync: React.FC = () => {
    const { pathname, hash } = useLocation();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const urlLang = langFromPath(pathname);
    const firstLoad = useRef(true);

    useLayoutEffect(() => {
        const detected = toLanguage(i18n.resolvedLanguage || i18n.language);
        if (firstLoad.current) {
            firstLoad.current = false;
            if (urlLang === 'en' && detected === 'fr') {
                navigate(withLang(pathname, 'fr') + hash, { replace: true });
                return;
            }
        }
        if (detected !== urlLang) i18n.changeLanguage(urlLang);
    }, [urlLang, pathname, hash, i18n, navigate]);

    return null;
};

const Site: React.FC = () => {
    const location = useLocation();
    const lang = useLanguage();
    const data = useMemo(() => getPortfolioData(lang), [lang]);
    // routes are written once, without the language prefix
    const bareLocation = useMemo(() => ({ ...location, pathname: stripLang(location.pathname) }), [location]);

    return (
        <>
            <GridBackground />
            <LangSync />
            <Seo projects={data.projects} />
            <Layout>
                <Routes location={bareLocation}>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects projects={data.projects} />} />
                    <Route path="/projects/:id" element={<Projects projects={data.projects} />} />
                    <Route path="/resume" element={<Resume experiences={data.experiences} educations={data.educations} />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/accessibility" element={<Accessibility />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </>
    );
};

const App: React.FC = () => (
    <Router>
        <Routes>
            {/* Printable CV: standalone A4 page, no site chrome */}
            <Route path="/cv/:lang?" element={<CvPage />} />
            <Route path="*" element={<Site />} />
        </Routes>
    </Router>
);

export default App;
