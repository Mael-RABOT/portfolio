import React from "react";
import { Box, Container, Typography, Link, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: theme.palette.background.default,
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {t('footer.rights', { year: currentYear })}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Link
                            href="https://github.com/Mael-RABOT"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <GitHubIcon />
                        </Link>
                        <Link
                            href="https://linkedin.com/in/mael-rabot"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <LinkedInIcon />
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
