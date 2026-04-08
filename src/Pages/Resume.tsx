import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { portfolioApi, PortfolioItem } from "../services/portfolioApi";
import {
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    Paper,
    TableContainer,
    Button,
    Link,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from "@mui/material";
/* eslint-disable */

const Resume: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('resume');
    const { t: tData } = useTranslation('data');

    const [experience, setExperience] = useState<PortfolioItem[]>([]);
    const [education, setEducation] = useState<PortfolioItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolioData = async () => {
            setIsLoading(true);
            try {
                const data = await portfolioApi.getAllData();
                setExperience(data.experiences);
                setEducation(data.educations);
            } catch (error) {
                console.error('Failed to fetch portfolio data:', error);
                
                // Fallback to static data if API fails
                const resumeData = tData('resume', { returnObjects: true }) as any;
                
                if (resumeData && resumeData.experiences) {
                    setExperience(resumeData.experiences.map((exp: any) => ({
                        position: exp.jobTitle,
                        company: exp.company,
                        duration: `${exp.startDate} - ${exp.endDate}`,
                        location: exp.location,
                        contractType: exp.contractType,
                        responsibilities: exp.bullets,
                        itemType: 'experience'
                    })));
                }
                
                if (resumeData && resumeData.educations) {
                    setEducation(resumeData.educations.map((edu: any) => ({
                        degree: edu.degree,
                        institution: edu.school,
                        year: `${edu.startDate} - ${edu.endDate}`,
                        bullets: edu.bullets || [],
                        itemType: 'education'
                    })));
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolioData();
    }, [tData]);

    const resumeData = tData('resume', { returnObjects: true }) as any;
    const certifications: string[] = resumeData?.certifications?.map((cert: any) => cert.name) || [];

    if (isLoading) {
        return <Typography aria-live="polite">Loading resume data...</Typography>;
    }

    return (
        <Box component="main" aria-label="Resume">
            {/* Header */}
            <Card sx={{ mb: 4 }} component="section" aria-label="Profile Summary">
                <CardHeader title={t('header.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 2 }} aria-hidden="true">{t('header.command')}{experience.length + education.length}</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>{t('profile.name')}</strong> {t('profile.nameValue')}</Typography>
                            <Typography><strong>{t('profile.location')}</strong> {t('profile.locationValue')}</Typography>
                            <Typography><strong>{t('profile.status')}</strong> {t('profile.statusValue')}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>{t('profile.specialization')}</strong> {t('profile.specializationValue')}</Typography>
                            <Typography>
                                <strong>{t('profile.contact')}</strong> {t('profile.contactValue')} 
                                <Link href="mailto:contact@maelrabot.com" sx={{ ml: 1 }} aria-label="Send an email to Mael Rabot">contact@maelrabot.com</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Professional Experience */}
            <Card sx={{ mb: 4 }} component="section" aria-label="Professional Experience">
                <CardHeader title={t('experience.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 3 }} aria-hidden="true">{t('experience.command')}</Typography>
                    
                    {experience.map((job: PortfolioItem, index: number) => (
                        <Card key={index} variant="outlined" sx={{ mb: 3 }} component="article" aria-label={`${job.position} at ${job.company}`}>
                            <CardHeader title={`${job.position} @ ${job.company}`} sx={{ pb: 0 }} />
                            <CardContent>
                                <TableContainer component={Paper} variant="outlined" sx={{ mb: 2, mt: 2 }}>
                                    <Table size="small" aria-label={`Details for ${job.position}`}>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row" sx={{ width: '150px' }}>{t('experience.duration')}</TableCell>
                                                <TableCell>{job.duration || `${job.startDate} - ${job.endDate}`}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">{t('experience.location')}</TableCell>
                                                <TableCell>{job.location}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">{t('experience.type')}</TableCell>
                                                <TableCell>{job.contractType}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                {job.images && job.images.length > 0 && (
                                    <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, mb: 2, pb: 1 }} role="region" aria-label={`Images for ${job.company} experience`}>
                                        {job.images.map((img, imgIndex) => (
                                            <Box 
                                                component="img"
                                                key={imgIndex}
                                                src={img.url} 
                                                alt={`Image ${imgIndex + 1} representing experience at ${job.company}`} 
                                                sx={{ 
                                                    maxHeight: '200px', 
                                                    maxWidth: '80%',
                                                    objectFit: 'contain',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    flexShrink: 0
                                                }} 
                                            />
                                        ))}
                                    </Box>
                                )}

                                {job.description && (
                                    <Typography sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>{job.description}</Typography>
                                )}

                                {(job.responsibilities && job.responsibilities.length > 0) && (
                                    <Box sx={{ mb: 2 }}>
                                        {job.company && (
                                            <Typography className="terminal-prompt" sx={{ mb: 1 }} aria-hidden="true">{t('experience.achievements', { company: job.company.toLowerCase() })}</Typography>
                                        )}
                                        <List dense disablePadding aria-label="Responsibilities">
                                            {job.responsibilities.map((resp: string, respIndex: number) => (
                                                <ListItem key={respIndex} disableGutters>
                                                    <ListItemIcon sx={{ minWidth: 24, color: 'inherit' }} aria-hidden="true">&gt;</ListItemIcon>
                                                    <ListItemText primary={resp} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}

                                {job.additionalInfo && Object.keys(job.additionalInfo).length > 0 && (
                                    <Box sx={{ mb: 2 }}>
                                        {Object.entries(job.additionalInfo).map(([key, value], infoIndex) => (
                                            <Box key={infoIndex} sx={{ mb: 1 }}>
                                                <Typography component="span" sx={{ fontWeight: 'bold' }}>{key}:</Typography>
                                                {Array.isArray(value) ? (
                                                    <List dense disablePadding sx={{ pl: 3 }}>
                                                        {value.map((item, itemIndex) => (
                                                            <ListItem key={itemIndex} disableGutters>
                                                                <ListItemIcon sx={{ minWidth: 24, color: 'inherit' }} aria-hidden="true">&gt;</ListItemIcon>
                                                                <ListItemText primary={item} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                ) : (
                                                    <Typography component="span" sx={{ whiteSpace: 'pre-wrap' }}> {value}</Typography>
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                )}

                                {job.links && job.links.length > 0 && (
                                    <Box>
                                        <Typography className="terminal-prompt" sx={{ mb: 1 }} aria-hidden="true">ASSOCIATED_LINKS:</Typography>
                                        <List dense disablePadding aria-label="Associated links">
                                            {job.links.map((link, linkIndex) => (
                                                <ListItem key={linkIndex} disableGutters>
                                                    <ListItemIcon sx={{ minWidth: 24, color: 'inherit' }} aria-hidden="true">&gt;</ListItemIcon>
                                                    <Link href={link.url} target="_blank" rel="noopener noreferrer" color="primary" underline="hover" aria-label={`Open link to ${link.url}`}>
                                                        {link.url}
                                                    </Link>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            {/* Education & Certifications */}
            <Card sx={{ mb: 4 }} component="section" aria-label="Education and Certifications">
                <CardHeader title={`${t('education.title')} ${certifications.length > 0 ? t('education.certTitle') : ""} - ${t('education.academicTitle')}`} />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={certifications.length > 0 ? 8 : 12}>
                            <Card variant="outlined" sx={{ height: '100%' }}>
                                <CardHeader title={t('education.title')} />
                                <CardContent>
                                    <Typography className="terminal-prompt" sx={{ mb: 3 }} aria-hidden="true">{t('education.educationCommand')}</Typography>
                                    
                                    {education.map((edu: PortfolioItem, index: number) => (
                                        <Box key={index} sx={{ mb: index < education.length - 1 ? 4 : 0 }} component="article" aria-label={`${edu.degree} from ${edu.institution}`}>
                                            <Typography variant="h6">{edu.degree}</Typography>
                                            <Typography className="terminal-command" sx={{ display: 'inline-block', mb: 1 }}>{edu.institution}</Typography>
                                            <Typography sx={{ mb: 2 }}>{t('education.year')} {edu.year || `${edu.startDate} - ${edu.endDate}`}</Typography>

                                            {edu.images && edu.images.length > 0 && (
                                                <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, mb: 2, pb: 1 }} role="region" aria-label={`Images for ${edu.institution}`}>
                                                    {edu.images.map((img, imgIndex) => (
                                                        <Box 
                                                            component="img"
                                                            key={imgIndex}
                                                            src={img.url} 
                                                            alt={`Image ${imgIndex + 1} representing education at ${edu.institution}`} 
                                                            sx={{ 
                                                                maxHeight: '200px', 
                                                                maxWidth: '80%',
                                                                objectFit: 'contain',
                                                                border: '1px solid',
                                                                borderColor: 'divider',
                                                                flexShrink: 0
                                                            }} 
                                                        />
                                                    ))}
                                                </Box>
                                            )}

                                            {edu.description && (
                                                <Typography sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>{edu.description}</Typography>
                                            )}

                                            {edu.bullets && edu.bullets.length > 0 && (
                                                <List dense disablePadding sx={{ mb: 2 }} aria-label="Key highlights">
                                                    {edu.bullets.map((bullet: string, bulletIndex: number) => (
                                                        <ListItem key={bulletIndex} disableGutters>
                                                            <ListItemIcon sx={{ minWidth: 24, color: 'inherit' }} aria-hidden="true">&gt;</ListItemIcon>
                                                            <ListItemText primary={bullet} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            )}

                                            {edu.additionalInfo && Object.keys(edu.additionalInfo).length > 0 && (
                                                <Box sx={{ mb: 2 }}>
                                                    {Object.entries(edu.additionalInfo).map(([key, value], infoIndex) => (
                                                        <Box key={infoIndex} sx={{ mb: 1 }}>
                                                            <Typography component="span" sx={{ fontWeight: 'bold' }}>{key}:</Typography>
                                                            {Array.isArray(value) ? (
                                                                <List dense disablePadding sx={{ pl: 3 }}>
                                                                    {value.map((item, itemIndex) => (
                                                                        <ListItem key={itemIndex} disableGutters>
                                                                            <ListItemIcon sx={{ minWidth: 24, color: 'inherit' }} aria-hidden="true">&gt;</ListItemIcon>
                                                                            <ListItemText primary={item} />
                                                                        </ListItem>
                                                                    ))}
                                                                </List>
                                                            ) : (
                                                                <Typography component="span" sx={{ whiteSpace: 'pre-wrap' }}> {value}</Typography>
                                                            )}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            )}

                                            {edu.links && edu.links.length > 0 && (
                                                <Box>
                                                    <Typography className="terminal-prompt" sx={{ mb: 1 }} aria-hidden="true">ASSOCIATED_LINKS:</Typography>
                                                    <List dense disablePadding aria-label="Associated links">
                                                        {edu.links.map((link, linkIndex) => (
                                                            <ListItem key={linkIndex} disableGutters>
                                                                <ListItemIcon sx={{ minWidth: 24, color: 'inherit' }} aria-hidden="true">&gt;</ListItemIcon>
                                                                <Link href={link.url} target="_blank" rel="noopener noreferrer" color="primary" underline="hover" aria-label={`Open link to ${link.url}`}>
                                                                    {link.url}
                                                                </Link>
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Box>
                                            )}
                                            
                                            {index < education.length - 1 && <Divider sx={{ mt: 3, mb: 1 }} />}
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>

                        {certifications?.length > 0 && (
                            <Grid item xs={12} md={4}>
                                <Card variant="outlined" sx={{ height: '100%' }}>
                                    <CardHeader title={t('education.certTitle').replace('& ', '')} />
                                    <CardContent>
                                        <Typography className="terminal-prompt" sx={{ mb: 3 }} aria-hidden="true">{t('education.certCommand')}</Typography>
                                        <List disablePadding aria-label="List of certifications">
                                            {certifications.map((cert: string, index: number) => (
                                                <ListItem key={index} disableGutters sx={{ borderBottom: '1px dotted', borderColor: 'divider', pb: 1, mb: 1 }}>
                                                    <ListItemIcon sx={{ minWidth: 20 }}>
                                                        <Box sx={{ width: 8, height: 8, bgcolor: 'primary.main' }} aria-hidden="true" />
                                                    </ListItemIcon>
                                                    <ListItemText 
                                                        primary={<Typography className="terminal-command">{cert}</Typography>} 
                                                    />
                                                    <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                                        {t('education.valid')}
                                                    </Typography>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>

            {/* Technical Skills Matrix */}
            <Card sx={{ mb: 4 }} component="section" aria-label="Technical Skills">
                <CardHeader title={t('skills.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 3 }} aria-hidden="true">{t('skills.command')}</Typography>
                    <TableContainer component={Paper} variant="outlined">
                        <Table aria-label="Technical Skills Matrix">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('skills.headers.category')}</TableCell>
                                    <TableCell>{t('skills.headers.technologies')}</TableCell>
                                    <TableCell>{t('skills.headers.years')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{t('skills.categories.frontend')}</TableCell>
                                    <TableCell>{t('skills.techStacks.frontend')}</TableCell>
                                    <TableCell>5+</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t('skills.categories.backend')}</TableCell>
                                    <TableCell>{t('skills.techStacks.backend')}</TableCell>
                                    <TableCell>5+</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t('skills.categories.database')}</TableCell>
                                    <TableCell>{t('skills.techStacks.database')}</TableCell>
                                    <TableCell>4+</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t('skills.categories.devops')}</TableCell>
                                    <TableCell>{t('skills.techStacks.devops')}</TableCell>
                                    <TableCell>3+</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t('skills.categories.mobile')}</TableCell>
                                    <TableCell>{t('skills.techStacks.mobile')}</TableCell>
                                    <TableCell>2+</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Download Options */}
            <Card sx={{ mb: 4 }} component="section" aria-label="Download and Navigation Options">
                <CardHeader title={t('download.title')} />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                fullWidth 
                                variant="outlined" 
                                sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = '/resume.pdf';
                                    link.download = 'Mael_RABOT_Resume.pdf';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                                aria-label="Download Resume as PDF"
                            >
                                <Typography className="terminal-prompt" sx={{ mb: 1 }} aria-hidden="true">{t('download.pdf.command')}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', textTransform: 'none' }}>{t('download.pdf.description')}</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                fullWidth 
                                variant="outlined" 
                                sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}
                                onClick={() => navigate('/')}
                                aria-label="Navigate to Home Page"
                            >
                                <Typography className="terminal-prompt" sx={{ mb: 1 }} aria-hidden="true">{t('download.home.command')}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', textTransform: 'none' }}>{t('download.home.description')}</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                fullWidth 
                                variant="outlined" 
                                sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = 'https://github.com/Mael-RABOT/portfolio/archive/refs/heads/master.zip';
                                    link.download = 'Mael_RABOT_Portfolio.zip';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                                aria-label="Download Portfolio Source Code"
                            >
                                <Typography className="terminal-prompt" sx={{ mb: 1 }} aria-hidden="true">{t('download.portfolio.command')}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', textTransform: 'none' }}>{t('download.portfolio.description')}</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                fullWidth 
                                variant="outlined" 
                                sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}
                                onClick={() => navigate('/contact')}
                                aria-label="Navigate to Contact Page"
                            >
                                <Typography className="terminal-prompt" sx={{ mb: 1 }} aria-hidden="true">{t('download.contact.command')}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', textTransform: 'none' }}>{t('download.contact.description')}</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Footer */}
            <Typography align="center" sx={{ mt: 4 }} aria-hidden="true">
                <span className="blinking-cursor">{t('footer.ready')}</span>
            </Typography>
        </Box>
    );
};

export default Resume;
