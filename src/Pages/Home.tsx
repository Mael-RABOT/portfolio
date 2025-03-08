import React from "react";
import {Box, Container, Typography, Paper, Chip, Stack, Divider} from "@mui/material";
import { useTranslation } from "react-i18next";
import withPage from "../hoc/withPage";
import TextGradient from "../Components/Text/TextGradient";
import { motion } from "framer-motion";

interface SkillCategory {
    title: string;
    skills: string[];
}

const HomeContent: React.FC = () => {
    const { t } = useTranslation();

    const programmingSkills: SkillCategory[] = React.useMemo(() => [
        {
            title: t("home.skills.programmingLanguages.title"),
            skills: t("home.skills.programmingLanguages.list", { returnObjects: true }) as string[]
        },
        {
            title: t("home.skills.tools.title"),
            skills: t("home.skills.tools.list", { returnObjects: true }) as string[]
        },
        {
            title: t("home.skills.softSkills.title"),
            skills: t("home.skills.softSkills.list", { returnObjects: true }) as string[]
        },
        {
            title: t("home.skills.languages.title"),
            skills: t("home.skills.languages.list", { returnObjects: true }) as string[]
        }
    ], [t]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 8 }}>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Box sx={{ mb: 12, textAlign: 'center' }}>
                        <TextGradient
                            text={t('home.welcome')}
                            variant="h1"
                        />
                        <Typography
                            variant="h5"
                            sx={{
                                mt: 2,
                                mb: 4,
                                color: 'text.secondary',
                                maxWidth: '800px',
                                mx: 'auto',
                                lineHeight: 1.8
                            }}
                        >
                            {t('home.subtitle')}
                        </Typography>
                    </Box>
                </motion.div>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                        mb: 12,
                        maxWidth: '900px',
                        mx: 'auto'
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                p: { xs: 3, md: 5 },
                                borderRadius: 4,
                                transition: 'all 0.3s ease-in-out',
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
                                    : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                                '&:hover': {
                                    boxShadow: (theme) => `0 8px 24px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`,
                                }
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignItems: 'center',
                                gap: 4,
                                mb: 4
                            }}>
                                <Box
                                    component="img"
                                    src="/me.png"
                                    alt="Maël RABOT"
                                    sx={{
                                        width: { xs: 180, md: 220 },
                                        height: { xs: 180, md: 220 },
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: (theme) => `4px solid ${theme.palette.primary.main}`,
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
                                        {t('home.aboutMe')}
                                    </Typography>
                                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                        {t('home.description1')}
                                    </Typography>
                                    <Typography variant="body1" sx={{ lineHeight: 1.8, mt: 2 }}>
                                        {t('home.description2')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                p: { xs: 3, md: 5 },
                                borderRadius: 4,
                                transition: 'all 0.3s ease-in-out',
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
                                    : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                                '&:hover': {
                                    boxShadow: (theme) => `0 8px 24px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`,
                                }
                            }}
                        >
                            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                                {t('home.involvement')}
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                {t('home.description3')}
                            </Typography>
                        </Paper>
                    </motion.div>
                </Box>

                <Divider sx={{ my: 6 }} />

                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{
                                textAlign: 'center',
                                mb: 6,
                                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {t('home.skills.title')}
                        </Typography>
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: '1fr 1fr',
                                lg: '1fr 1fr 1fr 1fr'
                            },
                            gap: 4
                        }}>
                            {programmingSkills.map((category, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Paper
                                        elevation={6}
                                        sx={{
                                            p: 4,
                                            height: '100%',
                                            borderRadius: 3,
                                            transition: 'all 0.3s ease-in-out',
                                            background: (theme) => theme.palette.mode === 'dark'
                                                ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
                                                : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                                            '&:hover': {
                                                boxShadow: (theme) => `0 8px 24px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`,
                                            }
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                mb: 3,
                                                fontWeight: 600,
                                                color: 'primary.main'
                                            }}
                                        >
                                            {category.title}
                                        </Typography>
                                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                            {category.skills.map((skill, skillIndex) => (
                                                <motion.div
                                                    key={skillIndex}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Chip
                                                        label={skill}
                                                        color="primary"
                                                        sx={{
                                                            mb: 1,
                                                            fontWeight: 500,
                                                            background: (theme) =>
                                                                `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                                                            '&:hover': {
                                                                transform: 'translateY(-2px)',
                                                            }
                                                        }}
                                                    />
                                                </motion.div>
                                            ))}
                                        </Stack>
                                    </Paper>
                                </motion.div>
                            ))}
                        </Box>
                    </Box>
                </motion.div>
            </Box>
        </Container>
    );
};

export default withPage(null, null)(HomeContent);
