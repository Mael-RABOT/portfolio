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
    Table,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Paper,
    TableContainer
} from "@mui/material";
import SystemLoading from "../Components/Loading/SystemLoading";

interface SkillCategory {
    title: string;
    skills: string[];
    command: string;
}

const Home: React.FC = () => {
    const { t } = useTranslation('home');
    const navigate = useNavigate();
    const [loadingProgress, setLoadingProgress] = useState<number>(0);
    const [systemReady, setSystemReady] = useState<boolean>(false);
    const [uptime, setUptime] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setSystemReady(true);
        }, 1500);

        const progressTimer = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return Math.min(100, prev + Math.random() * 15);
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            clearInterval(progressTimer);
        };
    }, []);

    useEffect(() => {
        const calculateUptime = () => {
            const startDate = new Date('2004-02-24T00:00:00');
            const now = new Date();
            const diffMs = now.getTime() - startDate.getTime();

            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

            setUptime(`${days}d ${hours}h ${minutes}m - (${Math.floor(days / 365)} years)`);
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

    const systemInfo = {
        hostname: "maelrabot.com",
        user: "mael_rabot",
        kernel: "Linux-Portfolio 5.4.0",
        uptime: uptime,
        load: "3.5",
        memory: "8.1GB / 16GB",
        processes: "156",
        shell: "/bin/coding_passion"
    };

    if (false && !systemReady) { // Disable for now
        return <SystemLoading progress={loadingProgress} />;
    }

    return (
        <Box>
            <Card sx={{ mb: 4 }}>
                <CardHeader title={`${t('systemInfo.title')} - ${t('systemInfo.welcome').toUpperCase()}`} />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TableContainer component={Paper} variant="outlined">
                                <Table size="small">
                                    <TableBody>
                                        <TableRow><TableCell>{t('systemInfo.hostInfo.hostname')}</TableCell><TableCell>{systemInfo.hostname}</TableCell></TableRow>
                                        <TableRow><TableCell>{t('systemInfo.hostInfo.user')}</TableCell><TableCell>{systemInfo.user}</TableCell></TableRow>
                                        <TableRow><TableCell>{t('systemInfo.hostInfo.kernel')}</TableCell><TableCell>{systemInfo.kernel}</TableCell></TableRow>
                                        <TableRow><TableCell>{t('systemInfo.hostInfo.shell')}</TableCell><TableCell>{systemInfo.shell}</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TableContainer component={Paper} variant="outlined">
                                <Table size="small">
                                    <TableBody>
                                        <TableRow><TableCell>{t('systemInfo.performance.uptime')}</TableCell><TableCell>{systemInfo.uptime}</TableCell></TableRow>
                                        <TableRow><TableCell>{t('systemInfo.performance.loadAvg')}</TableCell><TableCell>{systemInfo.load}</TableCell></TableRow>
                                        <TableRow><TableCell>{t('systemInfo.performance.memory')}</TableCell><TableCell>{systemInfo.memory}</TableCell></TableRow>
                                        <TableRow><TableCell>{t('systemInfo.performance.processes')}</TableCell><TableCell>{systemInfo.processes}</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ mb: 4 }}>
                <CardHeader title={t('highlight.title')} />
                <CardContent>
                    <Typography className="terminal-prompt">{t('highlight.command')}</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1">{t('highlight.description')}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                            <Chip label={t('highlight.techStack')} variant="outlined" />
                            <Chip label={t('highlight.status')} color="primary" />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/projects')}>
                            {t('highlight.viewProject')}
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => window.open('https://github.com/Sentience-Robotics', '_blank')}>
                            {t('highlight.viewGitHub')}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ mb: 4 }}>
                <CardHeader title={t('profile.title')} />
                <CardContent>
                    <Typography className="terminal-prompt">{t('profile.command')}</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h3" component="h2" className="terminal-command">{t('profile.aboutMe').toUpperCase()}.EXE</Typography>
                        <Typography sx={{ mt: 1 }}>&gt; {t('profile.description1')}</Typography>
                        <Typography>&gt; {t('profile.description2')}</Typography>
                        <Typography variant="h3" component="h2" className="terminal-command" sx={{ mt: 2 }}>{t('profile.involvement').toUpperCase()}.txt</Typography>
                        <Typography sx={{ mt: 1 }}>&gt; {t('profile.description3')}</Typography>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ mb: 4 }}>
                <CardHeader title={t('skills.title')} />
                <CardContent>
                    <Grid container spacing={2}>
                        {programmingSkills.map((category, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Card variant="outlined">
                                    <CardHeader title={category.title} subheader={category.command} />
                                    <CardContent>
                                        {category.skills.map((skill, skillIndex) => (
                                            <Chip key={skillIndex} label={skill} variant="outlined" sx={{ m: 0.5 }} />
                                        ))}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ mb: 4 }}>
                <CardHeader title={t('passions.title')} />
                <CardContent>
                    <Typography className="terminal-prompt">{t('passions.command')}</Typography>
                    <Box sx={{ mt: 2 }}>
                        {(Array.isArray(t('passions.list', { returnObjects: true }))
                            ? t('passions.list', { returnObjects: true }) as string[]
                            : []
                        ).map((passion, index) => (
                            <Chip key={index} label={passion} sx={{ m: 0.5 }} />
                        ))}
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ mb: 4 }}>
                <CardHeader title={t('quickActions.title')} />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Button fullWidth variant="outlined" onClick={() => navigate('/projects')}>{t('quickActions.viewProjects.command')}</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button fullWidth variant="outlined" onClick={() => navigate('/resume')}>{t('quickActions.viewResume.command')}</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button fullWidth variant="outlined" onClick={() => navigate('/contact')}>{t('quickActions.sendMessage.command')}</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button fullWidth variant="outlined" onClick={() => window.open('https://github.com/Mael-RABOT', '_blank')}>{t('quickActions.gitStatus.command')}</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Typography align="center" sx={{ mt: 4 }}>
                <span className="blinking-cursor">{t('footer.ready')}</span>
            </Typography>
        </Box>
    );
};

export default Home;