import React from "react";
import withPage from "../hoc/withPage";
import { Card, CardContent, CardMedia, Typography, Chip, Divider, Box, Stack, Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

type ResumeDataType = {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    contractType: string;
    description?: string;
    bullets?: string[];
    image: string;
};

type EducationDataType = {
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
    bullets?: string[];
    image: string;
};

const useResumeData = (): ResumeDataType[] => {
    const { t } = useTranslation(['resume', 'translation']);

    const experiences: string[] = [
        'audiowizard',
        'cobra',
        'poc',
        'burger-king',
        'MUN',
    ];

    return experiences.map(exp => {
        const jobTitle = t(`experiences.${exp}.jobTitle`, { ns: 'resume', defaultValue: '' });
        if (!jobTitle) {
            return null;
        }

        return {
            jobTitle,
            company: t(`experiences.${exp}.company`, { ns: 'resume' }),
            location: t(`experiences.${exp}.location`, { ns: 'resume' }),
            startDate: t(`experiences.${exp}.startDate`, { ns: 'resume' }),
            endDate: t(`experiences.${exp}.endDate`, { ns: 'resume' }),
            current: t(`experiences.${exp}.endDate`, { ns: 'resume' }) === 'present',
            contractType: t(`experiences.${exp}.contractType`, { ns: 'resume' }),
            description: t(`experiences.${exp}.description`, { ns: 'resume' }).replace(/\n/g, '<br />'),
            bullets: t(`experiences.${exp}.bullets`, { ns: 'resume', returnObjects: true }) as string[],
            image: `${exp}.png`,
        };
    }).filter(exp => exp !== null);
};

const useEducationData = (): EducationDataType[] => {
    const { t } = useTranslation(['resume', 'translation']);

    const educations: string[] = [
        'epitech',
        'CAU',
        'bac',
    ];

    return educations.map(edu => {
        const degree = t(`educations.${edu}.degree`, { ns: 'resume', defaultValue: '' });
        if (!degree) {
            return null;
        }

        return {
            degree,
            school: t(`educations.${edu}.school`, { ns: 'resume' }),
            location: t(`educations.${edu}.location`, { ns: 'resume' }),
            description: t(`educations.${edu}.description`, { ns: 'resume' }).replace(/\n/g, '<br />'),
            startDate: t(`educations.${edu}.startDate`, { ns: 'resume' }),
            endDate: t(`educations.${edu}.endDate`, { ns: 'resume' }),
            current: t(`educations.${edu}.endDate`, { ns: 'resume' }) === 'present',
            bullets: t(`educations.${edu}.bullets`, { ns: 'resume', returnObjects: true }) as string[],
            image: `${edu}.png`,
        };
    }).filter(edu => edu !== null);
};

const Resume: React.FC = () => {
    const { t } = useTranslation(['resume', 'translation']);

    const ExperienceRender = () => {
        const data = useResumeData();

        return (
            <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
                {data.map((experience, index) => (
                    // <motion.div
                    //     key={index}
                    //     // @ts-expect-error sx prop is not recognized by motion
                    //     sx={{maxWidth: 800, mx: "auto", p: 2}}
                    //     initial={{ opacity: 0, x: -100 }}
                    //     animate={{ opacity: 1, x: 0 }}
                    //     transition={{ duration: 0.7, delay: index * 0.2 }}
                    //     whileHover={{scale: 1.05}}
                    // >
                        <Card sx={{mb: 4}}>
                            <CardContent>
                                <Stack direction="row" spacing={2}>
                                    <CardMedia
                                        component="img"
                                        sx={{width: 100, height: 100}}
                                        image={`/${experience.image}`}
                                        alt={`${experience.company} logo`}
                                    />
                                    <Box>
                                        <Typography variant="h5" component="div">
                                            {experience.jobTitle}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                            sx={{
                                                fontWeight: 'bold',
                                                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                color: 'transparent',
                                            }}
                                        >
                                            {experience.company}
                                        </Typography>
                                        <Stack direction="row" spacing={1} mt={1}>
                                            <Chip label={experience.location} color="primary"/>
                                            <Chip label={experience.contractType} color="secondary"/>
                                            {experience.current &&
                                                <Chip label={t('current', {ns: 'resume'})} color="success"/>}
                                        </Stack>
                                        <Typography variant="body2" color="textSecondary" mt={1}>
                                            {experience.startDate} - {experience.current ? t('present', {ns: 'resume'}) : experience.endDate}
                                        </Typography>
                                    </Box>
                                </Stack>
                                {((experience?.bullets?.length ?? 0) > 0 && experience?.description) && (
                                    <Divider sx={{my: 2}}/>
                                )}
                                {/* @ts-expect-error dangerouslySetInnerHTML is not recognized by Typography */}
                                <Typography 
                                    variant="body1" 
                                    color="textSecondary"
                                    sx={{ textAlign: 'justify' }}
                                    dangerouslySetInnerHTML={{__html: experience?.description}}
                                />
                                <ul>
                                    {experience?.bullets?.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex}>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary"
                                                sx={{ textAlign: 'justify' }}
                                            >
                                                {bullet}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    // </motion.div>
                ))}
            </Box>
        );
    };

    const EducationRender = () => {
        const educationData = useEducationData();

        return (
            <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
                {educationData.map((education, index) => (
                    // <motion.div
                    //     key={index}
                    //     // @ts-expect-error sx prop is not recognized by motion
                    //     sx={{maxWidth: 800, mx: "auto", p: 2}}
                    //     initial={{ opacity: 0, x: -100 }}
                    //     animate={{ opacity: 1, x: 0 }}
                    //     transition={{ duration: 0.7, delay: index * 0.2 }}
                    //     whileHover={{scale: 1.05}}
                    // >
                        <Card sx={{ mb: 4 }}>
                            <CardContent>
                                <Stack direction="row" spacing={2}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 100, height: 100 }}
                                        image={`/${education.image}`}
                                        alt={`${education.school} logo`}
                                    />
                                    <Box>
                                        <Typography variant="h5" component="div">
                                            {education.degree}
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            {education.school}
                                        </Typography>
                                        <Stack direction="row" spacing={1} mt={1}>
                                            <Chip label={education.location} color="primary" />
                                            {education.current && <Chip label={t('current', { ns: 'resume' })} color="success" />}
                                        </Stack>
                                        <Typography variant="body2" color="textSecondary" mt={1}>
                                            {education.startDate} - {education.current ? t('present', { ns: 'resume' }) : education.endDate}
                                        </Typography>
                                    </Box>
                                </Stack>
                                {((education?.bullets?.length ?? 0) > 0 && education?.description) && (
                                    <Divider sx={{ my: 2 }} />
                                )}
                                {/* @ts-expect-error dangerouslySetInnerHTML is not recognized by Typography */}
                                <Typography 
                                    variant="body1" 
                                    color="textSecondary" 
                                    sx={{ textAlign: 'justify' }}
                                    dangerouslySetInnerHTML={{ __html: education?.description }} 
                                />
                                <ul>
                                    {education?.bullets?.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex}>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary"
                                                sx={{ textAlign: 'justify' }}
                                            >
                                                {bullet}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    // </motion.div>
                ))}
            </Box>
        );
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
        >
            <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
                <Typography variant="h4" component="div" gutterBottom>
                    {t('experiences.title', { ns: 'resume' })}
                </Typography>
                <ExperienceRender />
                <Divider sx={{ my: 4 }} />
                <Typography variant="h4" component="div" gutterBottom>
                    {t('educations.title', { ns: 'resume' })}
                </Typography>
                <EducationRender />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Fab color="primary" aria-label="scroll to top" onClick={handleScrollToTop}>
                        <KeyboardArrowUp />
                    </Fab>
                </Box>
            </Box>
        </motion.div>
    );
};

export default withPage(null, null)(Resume);
