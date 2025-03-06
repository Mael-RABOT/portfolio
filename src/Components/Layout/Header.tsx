import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ThemeSwitch from '../Buttons/ThemeSwitch';
import LanguageSwitch from '../Buttons/LanguageSwitch';

const links: { to: string, labelKey: string }[] = [
    { to: '/', labelKey: 'navigation.home' },
    { to: '/projects', labelKey: 'navigation.projects' },
    { to: '/resume', labelKey: 'navigation.resume' },
    { to: '/contact', labelKey: 'navigation.contact' }
];

const Navigation: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <Box
            component="header"
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography
                variant="h6"
                component="div"
                sx={{
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                }}
            >
                Maël RABOT
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {links.map((link) => (
                    <MuiLink
                        key={link.to}
                        component={RouterLink}
                        to={link.to}
                        sx={{
                            textDecoration: 'none',
                            color: 'text.primary',
                            padding: '0.5rem 1rem',
                            borderRadius: 1,
                            transition: 'background-color 0.2s',
                            backgroundColor: location.pathname === link.to ? 'action.selected' : 'transparent',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        {t(link.labelKey)}
                    </MuiLink>
                ))}
                <ThemeSwitch />
                <LanguageSwitch />
            </Box>
        </Box>
    );
};

export default Navigation;
