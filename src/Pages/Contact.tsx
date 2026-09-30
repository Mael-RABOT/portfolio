import React, { useState } from "react";
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

const Contact: React.FC = () => {
    const [copiedEmail, setCopiedEmail] = useState(false);

    const emailAddress = "contact@maelrabot.com";
    const githubUrl = "https://github.com/Mael-RABOT";
    const linkedinUrl = "https://linkedin.com/in/mael-rabot";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    return (
        <Box component="main" aria-label="Contact">
            {/* Header Telemetry */}
            <Card sx={{ mb: 3 }} component="section">
                <CardHeader title="COMMUNICATION CHANNELS // DIRECT DISPATCH" />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 1.5 }} aria-hidden="true">
                        contact --status --available-routes
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 1 }}>
                        <Chip label="STATUS: ACCEPTING TRANSMISSIONS" color="primary" />
                        <Chip label="RESPONSE TIME: < 24 HOURS" variant="outlined" />
                        <Chip label="LOCATION: LYON, FRANCE" variant="outlined" />
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary' }}>
                        Direct transmission endpoints are open for software engineering inquiries, robotics collaborations, and technical opportunities.
                    </Typography>
                </CardContent>
            </Card>

            {/* Channels Grid */}
            <Grid container spacing={2}>
                {/* Email Channel */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                    <Card variant="outlined" sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardHeader
                            title="01 // DIRECT EMAIL"
                            subheader="PROTOCOL: SMTP / SECURE MAIL"
                        />
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'secondary.text', display: 'block', mb: 0.5 }}>
                                    PRIMARY INBOX
                                </Typography>
                                <Box sx={{ p: 1.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', mb: 2 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', wordBreak: 'break-all' }}>
                                        {emailAddress}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                                    Recommended channel for project inquiries, technical specifications, and detailed proposals.
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    href={`mailto:${emailAddress}`}
                                    aria-label="Send email to Mael Rabot"
                                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                                >
                                    Open Mailer
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleCopyEmail}
                                    aria-label="Copy email address to clipboard"
                                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                                >
                                    {copiedEmail ? "✓ Copied to Clipboard" : "Copy Address"}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* LinkedIn Channel */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                    <Card variant="outlined" sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardHeader
                            title="02 // LINKEDIN NETWORK"
                            subheader="PROTOCOL: PROFESSIONAL NETWORK"
                        />
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'secondary.text', display: 'block', mb: 0.5 }}>
                                    PROFILE IDENTIFIER
                                </Typography>
                                <Box sx={{ p: 1.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', mb: 2 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                        linkedin.com/in/mael-rabot
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                                    Direct professional messaging, industry networking, and collaborative endorsements.
                                </Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Open LinkedIn profile"
                                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                                >
                                    Connect on LinkedIn →
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* GitHub Channel */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                    <Card variant="outlined" sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardHeader
                            title="03 // GITHUB REPOSITORIES"
                            subheader="PROTOCOL: CODE REPOSITORIES"
                        />
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'secondary.text', display: 'block', mb: 0.5 }}>
                                    ORGANIZATION & USER
                                </Typography>
                                <Box sx={{ p: 1.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', mb: 2 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                        github.com/Mael-RABOT
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                                    Explore open source contributions, robotics frameworks (ROS 2), game engines, and code repositories.
                                </Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Open GitHub profile"
                                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                                >
                                    Explore GitHub →
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Dispatch Summary */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                    <Card variant="outlined" sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardHeader
                            title="04 // OPERATIONAL AVAILABILITY"
                            subheader="DISPATCH INFO"
                        />
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'secondary.text', display: 'block', mb: 0.5 }}>
                                    ENGAGEMENT SCOPE
                                </Typography>
                                <Box sx={{ p: 1.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', mb: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
                                        ● Full-Stack Systems & Robotics
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                        Open for Full-time roles, contracts, and innovative open-source initiatives.
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Based in Lyon, France (UTC+1 / CET). Available for on-site, hybrid, and remote workflows.
                                </Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" sx={{ color: 'secondary.text' }}>
                                    PGP / GPG Fingerprint available upon request.
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Note: Bottom navigation buttons removed per user request */}
            <Typography align="center" sx={{ mt: 4, mb: 1 }} aria-hidden="true">
                <span className="blinking-cursor">TRANSMISSION CHANNELS READY</span>
            </Typography>
        </Box>
    );
};

export default Contact;