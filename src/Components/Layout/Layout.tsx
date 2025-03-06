import { useLocation } from 'react-router-dom';
import Navigation from './Header';
import AppFooter from './Footer';
import React from "react";
import { Box } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const headerExcludedPaths: (string | RegExp)[] = [];
    const footerExcludedPaths: (string | RegExp)[] = [];

    const isHeaderIncluded = !headerExcludedPaths.some(path =>
        typeof path === 'string' ? path === location.pathname : path.test(location.pathname)
    );

    const isFooterIncluded = !footerExcludedPaths.some(path =>
        typeof path === 'string' ? path === location.pathname : path.test(location.pathname)
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            {isHeaderIncluded && <Navigation />}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    overflowX: 'hidden',
                }}
            >
                {children}
            </Box>
            {isFooterIncluded && <AppFooter />}
        </Box>
    );
};

export default Layout;
