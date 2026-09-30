import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Grid,
    Button,
    Chip,
} from "@mui/material";

interface SkillCategory {
    title: string;
    skills: string[];
    command: string;
}

const Home: React.FC = () => {
    const { t } = useTranslation('home');
    const navigate = useNavigate();
    const [uptime, setUptime] = useState<string>("");

    useEffect(() => {
        const calculateUptime = () => {
            const startDate = new Date('2004-02-24T00:00:00');
            const now = new Date();
            const diffMs = now.getTime() - startDate.getTime();

            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

            setUptime(`${days}d ${hours}h ${minutes}m (${Math.floor(days / 365)}y)`);
        };

        calculateUptime();
        const interval = setInterval(calculateUptime, 60000);

        return () => clearInterval(interval);
    }, []);

    const programmingSkills: SkillCategory[] = useMemo(() => [
        {
            title: t("skills.programmingLanguages.title"),
            command: t("skills.programmingLanguages.command"),
            skills: Array.isArray(t("skills.programmingLanguages.list", { returnObjects: true }))
                ? t("skills.programmingLanguages.list", { returnObjects: true }) as string[]
                : []
        },
        {
            title: t("skills.tools.title"),
            command: t("skills.tools.command"),
            skills: Array.isArray(t("skills.tools.list", { returnObjects: true }))
                ? t("skills.tools.list", { returnObjects: true }) as string[]
                : []
        },
        {
            title: t("skills.softSkills.title"),
            command: t("skills.softSkills.command"),
            skills: Array.isArray(t("skills.softSkills.list", { returnObjects: true }))
                ? t("skills.softSkills.list", { returnObjects: true }) as string[]
                : []
        },
        {
            title: t("skills.languages.title"),
            command: t("skills.languages.command"),
            skills: Array.isArray(t("skills.languages.list", { returnObjects: true }))
                ? t("skills.languages.list", { returnObjects: true }) as string[]
                : []
        }
    ], [t]);

    return (
        <Box component="main" aria-label="Home">
            {/* System Status - Clean, uncrowded telemetry */}
            <Card sx={{ mb: 3 }} component="section" aria-label="System Telemetry">
                <CardHeader title="SYSTEM TELEMETRY // MAËL RABOT" />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 2 }} aria-hidden="true">
                        sysinfo --summary
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
                                <Typography variant="caption" sx={{ color: 'secondary.text', display: 'block', mb: 0.5 }}>
                                    OPERATOR
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    mael_rabot
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
                                <Typography variant="caption" sx={{ color: 'secondary.text', display: 'block', mb: 0.5 }}>
                                    DISCIPLINE
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    Software & Robotics
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
                                <Typography variant="caption" sx={{ color: 'secondary.text', display: 'block', mb: 0.5 }}>
                                    STATUS
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                    ● READY // ONLINE
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
                                <Typography variant="caption" sx={{ color: 'secondary.text', display: 'block', mb: 0.5 }}>
                                    UPTIME
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    {uptime}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Highlights */}
            <Card sx={{ mb: 3 }} component="section" aria-label="Highlights">
                <CardHeader title={t('highlight.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" aria-hidden="true">{t('highlight.command')}</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1">{t('highlight.description')}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }} aria-label="Project Status">
                            <Chip label={t('highlight.techStack')} variant="outlined" />
                            <Chip label={t('highlight.status')} color="primary" />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/projects')} aria-label="View Projects Page">
                            {t('highlight.viewProject')}
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => window.open('https://github.com/Sentience-Robotics', '_blank')} aria-label="View Sentience Robotics on GitHub">
                            {t('highlight.viewGitHub')}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Profile Overview */}
            <Card sx={{ mb: 3 }} component="section" aria-label="Profile">
                <CardHeader title={t('profile.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" aria-hidden="true">{t('profile.command')}</Typography>
                    <Box sx={{ mt: 2 }}>
                        {/* Smaller, properly proportioned badges */}
                        <Typography
                            component="h3"
                            sx={{
                                fontSize: '13px',
                                fontWeight: 600,
                                display: 'inline-block',
                                py: 0.5,
                                px: 1.25,
                                color: 'primary.main',
                                border: '1px solid',
                                borderColor: 'secondary.border',
                                bgcolor: 'background.default',
                                fontFamily: 'inherit',
                                letterSpacing: '0.5px',
                                mb: 1,
                            }}
                        >
                            {t('profile.aboutMe').toUpperCase()}.EXE
                        </Typography>
                        <Typography sx={{ mt: 0.5 }}>&gt; {t('profile.description1')}</Typography>
                        <Typography>&gt; {t('profile.description2')}</Typography>

                        <Typography
                            component="h3"
                            sx={{
                                fontSize: '13px',
                                fontWeight: 600,
                                display: 'inline-block',
                                py: 0.5,
                                px: 1.25,
                                color: 'primary.main',
                                border: '1px solid',
                                borderColor: 'secondary.border',
                                bgcolor: 'background.default',
                                fontFamily: 'inherit',
                                letterSpacing: '0.5px',
                                mt: 2.5,
                                mb: 1,
                            }}
                        >
                            {t('profile.involvement').toUpperCase()}.txt
                        </Typography>
                        <Typography sx={{ mt: 0.5 }}>&gt; {t('profile.description3')}</Typography>
                    </Box>
                </CardContent>
            </Card>

            {/* Skills Summary - All 4 boxes strictly equal in height and size */}
            <Card sx={{ mb: 3 }} component="section" aria-label="Skills Summary">
                <CardHeader title={t('skills.title')} />
                <CardContent>
                    <Grid container spacing={2}>
                        {programmingSkills.map((category, index) => (
                            <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
                                <Card
                                    variant="outlined"
                                    component="article"
                                    aria-label={category.title}
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <CardHeader title={category.title} subheader={category.command} />
                                    <CardContent
                                        role="list"
                                        aria-label={`Skills in ${category.title}`}
                                        sx={{
                                            flexGrow: 1,
                                            minHeight: '140px',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            alignContent: 'flex-start',
                                            gap: 0.5,
                                        }}
                                    >
                                        {category.skills.map((skill, skillIndex) => (
                                            <Chip role="listitem" key={skillIndex} label={skill} variant="outlined" />
                                        ))}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

            {/* Note: Passions section is hidden per user request */}
            {/* Note: Quick actions navigation buttons at the bottom removed per user request */}

            <Typography align="center" sx={{ mt: 3, mb: 1 }} aria-hidden="true">
                <span className="blinking-cursor">{t('footer.ready')}</span>
            </Typography>
        </Box>
    );
};

export default Home;