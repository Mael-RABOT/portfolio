import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import './i18n/i18n';

import Terminal from "./Components/Terminal/Terminal";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Resume from "./Pages/Resume";
import Contact from "./Pages/Contact";
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

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date());
        };

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="terminal-app">
            <Router>
                <NavigationProvider>
                    <Terminal currentTime={currentTime}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/resume" element={<Resume />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Terminal>
                </NavigationProvider>
            </Router>
        </div>
    );
};

export default App;
