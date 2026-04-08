import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import './i18n/i18n';
import { portfolioApi, PortfolioItem } from "../src/services/portfolioApi";

import Terminal from "./Components/Terminal/Terminal";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Resume from "./Pages/Resume";
import Contact from "./Pages/Contact";
import Accessibility from "./Pages/Accessibility";
import NotFound from "./Pages/NotFound";

const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'F1':
                    event.preventDefault();
                    navigate('/');
                    break;
                case 'F2':
                    event.preventDefault();
                    navigate('/projects');
                    break;
                case 'F3':
                    event.preventDefault();
                    navigate('/resume');
                    break;
                case 'F4':
                    event.preventDefault();
                    navigate('/contact');
                    break;
                case 'F5':
                    event.preventDefault();
                    navigate('/accessibility');
                    break;
                default:
                    break;
            }
        };

        // Add event listener
        document.addEventListener('keydown', handleKeyPress);

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [navigate]);

    return <>{children}</>;
};

const App: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [data, setData] = useState<{ projects: PortfolioItem[], experiences: PortfolioItem[], educations: PortfolioItem[] }>({ projects: [], experiences: [], educations: [] });

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date());
        };

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                setData(await portfolioApi.getAllData());
            } catch (error) {
                console.error('Failed to fetch portfolio data:', error);
            }
        };

        fetchPortfolioData();
    }, []);

    return (
        <div className="terminal-app">
            <Router>
                <NavigationProvider>
                    <Terminal currentTime={currentTime}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/projects" element={<Projects projects={data.projects} />} />
                            <Route path="/resume" element={<Resume experiences={data.experiences} educations={data.educations} />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/accessibility" element={<Accessibility />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Terminal>
                </NavigationProvider>
            </Router>
        </div>
    );
};

export default App;
