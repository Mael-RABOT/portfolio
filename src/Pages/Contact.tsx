import React from "react";
import { Box, Container, Typography, Link, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion } from "framer-motion";
import withPage from "../hoc/withPage";
import TextGradient from "../Components/Text/TextGradient.tsx";

const ContactContent: React.FC = () => {
    const { t } = useTranslation();

    React.useEffect(() => {
        console.log(t('con'))
    });

    return (
        <Container maxWidth="md">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                <Box
                    sx={{
                        py: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <TextGradient text={t('contact.title')} variant="h2" />
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            mb: 6,
                            maxWidth: '600px',
                            color: 'text.secondary'
                        }}
                    >
                        {t('contact.description')}
                    </Typography>

                    <Box
                        sx={{
                            p: 4,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 3,
                            mb: 6,
                            width: '100%',
                            maxWidth: '400px',
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            sx={{fontWeight: 'medium', mb: 2}}
                        >
                            {t('contact.emailTitle')}
                        </Typography>
                        <Link
                            href="mailto:contact@maelrabot.com"
                            sx={{
                                display: 'inline-block',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    textDecoration: 'none',
                                }
                            }}
                        >
                            <Typography variant="h6" color="primary">
                                contact@maelrabot.com
                            </Typography>
                        </Link>
                    </Box>

                    <Stack
                        direction="row"
                        spacing={4}
                        sx={{
                            mt: 2,
                            '& a': {
                                transition: 'all 0.2s',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1,
                                '&:hover': {
                                    transform: 'translateY(-3px)',
                                    color: 'primary.main',
                                }
                            }
                        }}
                    >
                        <Link
                            href="https://github.com/Mael-RABOT"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                        >
                            <GitHubIcon sx={{fontSize: 40}}/>
                            <Typography variant="body2">{t('contact.github')}</Typography>
                        </Link>
                        <Link
                            href="https://linkedin.com/in/mael-rabot"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                        >
                            <LinkedInIcon sx={{fontSize: 40}}/>
                            <Typography variant="body2">{t('contact.linkedin')}</Typography>
                        </Link>
                    </Stack>
                </Box>
            </motion.div>
        </Container>
    );
};

export default withPage(null, null)(ContactContent);
