import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';
import ASCIIArt from "../Components/ASCII/ASCIIArt";
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
    TextField,
    CircularProgress
} from "@mui/material";

const Contact: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('contact');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
    const [connectionStatus, setConnectionStatus] = useState(t('connection.disconnected'));
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [pingStatus, setPingStatus] = useState<string[]>([]);
    const [isPinging, setIsPinging] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors: {[key: string]: string} = {};

        if (!formData.name.trim()) {
            errors.name = 'ERROR: SENDER_NAME field cannot be empty';
        }

        if (!formData.email.trim()) {
            errors.email = 'ERROR: EMAIL_ADDRESS field cannot be empty';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'ERROR: Invalid EMAIL_ADDRESS format';
        }

        if (!formData.subject.trim()) {
            errors.subject = 'ERROR: MESSAGE_SUBJECT field cannot be empty';
        }

        if (!formData.message.trim()) {
            errors.message = 'ERROR: MESSAGE_BODY field cannot be empty';
        }

        return errors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            setConnectionStatus('TRANSMISSION_FAILED: Missing required fields');
            setTimeout(() => {
                setConnectionStatus(t('connection.disconnected'));
            }, 3000);
            return;
        }

        setIsTransmitting(true);
        setConnectionStatus(t('connection.transmitting'));

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'contact@maelrabot.com',
            current_date: new Date().toLocaleString(),
        };

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
        )
        .then((response) => {
            console.log('Email sent successfully:', response.status, response.text);
            setConnectionStatus(t('connection.messageSent'));
            setIsTransmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setFormErrors({});

            setTimeout(() => {
                setConnectionStatus(t('connection.disconnected'));
            }, 10000);
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            setConnectionStatus('TRANSMISSION_FAILED: Unable to send message');
            setIsTransmitting(false);

            setTimeout(() => {
                setConnectionStatus(t('connection.disconnected'));
            }, 5000);
        });
    };

    const handlePing = () => {
        setIsPinging(true);
        setPingStatus([]);

        const pingResponses = [
            "PING portfolio.dev (127.0.0.1): 56 data bytes",
            "64 bytes from portfolio.dev: icmp_seq=0 time=12.3ms",
            "64 bytes from portfolio.dev: icmp_seq=1 time=8.7ms",
            "64 bytes from portfolio.dev: icmp_seq=2 time=15.2ms",
            "64 bytes from portfolio.dev: icmp_seq=3 time=9.8ms",
            "--- portfolio.dev ping statistics ---",
            "4 packets transmitted, 4 received, 0% packet loss",
            "round-trip min/avg/max/stddev = 8.7/11.5/15.2/2.8 ms"
        ];

        pingResponses.forEach((response, index) => {
            setTimeout(() => {
                setPingStatus(prev => [...prev, response]);
                if (index === pingResponses.length - 1) {
                    setTimeout(() => {
                        setIsPinging(false);
                        setTimeout(() => setPingStatus([]), 5000);
                    }, 500);
                }
            }, index * 600);
        });
    };

    const handleGitHubConnect = () => {
        window.open('https://github.com/Mael-RABOT', '_blank', 'noopener,noreferrer');
    };

    const handleAPIDemo = () => {
        const form = document.querySelector('.terminal-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth' });
        }

        const apiExample = `
curl -X POST https://api.maelrabot.com/contact \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "API Connection",
    "message": "Hello from the API!"
  }'`;

        console.log("API Endpoint Documentation:", apiExample);
        setTimeout(() => {
            const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
            if (nameInput) nameInput.focus();
        }, 1000);
    };

    const contactMethods = [
        {
            protocol: "EMAIL",
            address: "contact@maelrabot.com",
            port: "587",
            encryption: "TLS",
            status: "ACTIVE"
        },
        {
            protocol: "LINKEDIN",
            address: "linkedin.com/in/mael-rabot",
            port: "443",
            encryption: "HTTPS",
            status: "ACTIVE"
        },
        {
            protocol: "GITHUB",
            address: "github.com/Mael-RABOT",
            port: "443",
            encryption: "SSH",
            status: "ACTIVE"
        }
    ];

    const networkInfo = {
        localTime: new Date().toLocaleString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        responseTime: "< 24h",
        availability: "HIGH",
        serverLoad: "12%"
    };

    return (
        <Box component="main" aria-label="Contact">
            {/* Header */}
            <Card sx={{ mb: 4 }} component="section" aria-label="Connection Status">
                <CardHeader title={t('header.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 2 }} aria-hidden="true">{t('header.command')}</Typography>
                    <Box aria-live="polite">
                        <Typography>
                            <strong>{t('connection.status')}</strong>
                            <Typography component="span" sx={{
                                color: connectionStatus === t('connection.disconnected') ? 'text.disabled' :
                                       connectionStatus === t('connection.transmitting') ? 'primary.main' :
                                       'primary.main',
                                ml: 1,
                                fontWeight: 'bold'
                            }}>
                                {connectionStatus}
                            </Typography>
                        </Typography>
                        <Typography><strong>{t('connection.responseTime')}</strong> {networkInfo.responseTime}</Typography>
                        <Typography><strong>{t('connection.availability')}</strong> {networkInfo.availability}</Typography>
                        <Typography><strong>{t('connection.serverLoad')}</strong> {networkInfo.serverLoad}</Typography>
                    </Box>
                </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card sx={{ mb: 4 }} component="section" aria-label="Contact Channels">
                <CardHeader title={t('channels.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 2 }} aria-hidden="true">{t('channels.command')}</Typography>
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="small" aria-label="List of Contact Channels">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('channels.headers.protocol')}</TableCell>
                                    <TableCell>{t('channels.headers.address')}</TableCell>
                                    <TableCell>{t('channels.headers.port')}</TableCell>
                                    <TableCell>{t('channels.headers.encryption')}</TableCell>
                                    <TableCell>{t('channels.headers.status')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contactMethods.map((method, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{method.protocol}</TableCell>
                                        <TableCell>
                                            <Link href={`https://${method.address}`} target="_blank" rel="noopener noreferrer" color="primary" underline="hover" aria-label={`Open link to ${method.address}`}>
                                                {method.address}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{method.port}</TableCell>
                                        <TableCell>{method.encryption}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ 
                                                    width: 8, 
                                                    height: 8, 
                                                    borderRadius: '50%',
                                                    bgcolor: method.status === 'ACTIVE' || method.status === 'ONLINE' ? 'primary.main' : 'text.disabled'
                                                }} aria-hidden="true" />
                                                <Typography variant="body2">{method.status}</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Message Form */}
            <Card sx={{ mb: 4 }} className="terminal-form" component="section" aria-label="Contact Form">
                <CardHeader title={t('form.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 3 }} aria-hidden="true">{t('form.command')}</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate aria-label="Message transmission form">
                        <Grid container spacing={3} sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={6}>
                                <Typography sx={{ mb: 1, fontWeight: 'bold' }} component="label" htmlFor="name-input">{t('form.senderName')}</Typography>
                                <TextField
                                    id="name-input"
                                    fullWidth
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder={t('form.placeholders.name')}
                                    error={!!formErrors.name}
                                    helperText={formErrors.name}
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ 'aria-required': 'true' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography sx={{ mb: 1, fontWeight: 'bold' }} component="label" htmlFor="email-input">{t('form.emailAddress')}</Typography>
                                <TextField
                                    id="email-input"
                                    fullWidth
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder={t('form.placeholders.email')}
                                    error={!!formErrors.email}
                                    helperText={formErrors.email}
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ 'aria-required': 'true' }}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mb: 3 }}>
                            <Typography sx={{ mb: 1, fontWeight: 'bold' }} component="label" htmlFor="subject-input">{t('form.messageSubject')}</Typography>
                            <TextField
                                id="subject-input"
                                fullWidth
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder={t('form.placeholders.subject')}
                                error={!!formErrors.subject}
                                helperText={formErrors.subject}
                                variant="outlined"
                                size="small"
                                inputProps={{ 'aria-required': 'true' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography sx={{ mb: 1, fontWeight: 'bold' }} component="label" htmlFor="message-input">{t('form.messageBody')}</Typography>
                            <TextField
                                id="message-input"
                                fullWidth
                                multiline
                                rows={8}
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder={t('form.placeholders.message')}
                                error={!!formErrors.message}
                                helperText={formErrors.message}
                                variant="outlined"
                                inputProps={{ 'aria-required': 'true' }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                disabled={isTransmitting}
                                sx={{ minWidth: 150 }}
                                aria-live="polite"
                                aria-busy={isTransmitting}
                            >
                                {isTransmitting ? t('form.transmitting') : t('form.submit')}
                            </Button>
                            <Button 
                                type="button" 
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                    setFormData({ name: '', email: '', subject: '', message: '' });
                                    setFormErrors({});
                                }}
                                aria-label="Clear form"
                            >
                                {t('form.clear')}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Network Information */}
            <Card sx={{ mb: 4 }} component="section" aria-label="Network Diagnostics">
                <CardHeader title="NETWORK DIAGNOSTICS - SYSTEM STATUS" />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ height: '100%' }} component="section" aria-label="Connection Info">
                                <CardHeader title="CONNECTION INFO" />
                                <CardContent>
                                    <Typography className="terminal-prompt" sx={{ mb: 2 }} aria-hidden="true">ifconfig | grep inet</Typography>
                                    <TableContainer component={Paper} elevation={0}>
                                        <Table size="small" aria-label="Connection statistics">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" sx={{ borderBottom: 'none' }}>LOCAL_TIME:</TableCell>
                                                    <TableCell sx={{ borderBottom: 'none' }}>{networkInfo.localTime}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" sx={{ borderBottom: 'none' }}>TIMEZONE:</TableCell>
                                                    <TableCell sx={{ borderBottom: 'none' }}>{networkInfo.timezone}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" sx={{ borderBottom: 'none' }}>RESPONSE_TIME:</TableCell>
                                                    <TableCell sx={{ borderBottom: 'none' }}>{networkInfo.responseTime}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" sx={{ borderBottom: 'none' }}>AVAILABILITY:</TableCell>
                                                    <TableCell sx={{ borderBottom: 'none' }}>{networkInfo.availability}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ height: '100%' }} component="section" aria-label="Quick Commands">
                                <CardHeader title="QUICK COMMANDS" />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Button 
                                                fullWidth 
                                                variant="outlined" 
                                                sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}
                                                onClick={handlePing}
                                                aria-label="Ping Server"
                                            >
                                                <Typography className="terminal-prompt" sx={{ mb: 1, textTransform: 'none' }} aria-hidden="true">ping -c 4 portfolio.dev</Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'left', textTransform: 'none' }}>{isPinging ? t('commands.ping.testing') : t('commands.ping.description')}</Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button 
                                                fullWidth 
                                                variant="outlined" 
                                                sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}
                                                onClick={() => navigate('/')}
                                                aria-label="Go back Home"
                                            >
                                                <Typography className="terminal-prompt" sx={{ mb: 1, textTransform: 'none' }} aria-hidden="true">whois developer</Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'left', textTransform: 'none' }}>{t('commands.whois.description')}</Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button 
                                                fullWidth 
                                                variant="outlined" 
                                                sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}
                                                onClick={handleGitHubConnect}
                                                aria-label="Open GitHub Connect"
                                            >
                                                <Typography className="terminal-prompt" sx={{ mb: 1, textTransform: 'none' }} aria-hidden="true">ssh github.com</Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'left', textTransform: 'none' }}>{t('commands.ssh.description')}</Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button 
                                                fullWidth 
                                                variant="outlined" 
                                                sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}
                                                onClick={handleAPIDemo}
                                                aria-label="Demo API Endpoint"
                                            >
                                                <Typography className="terminal-prompt" sx={{ mb: 1, textTransform: 'none' }} aria-hidden="true">curl -X POST /message</Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'left', textTransform: 'none' }}>{t('commands.api.description')}</Typography>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Ping Results */}
            {(isPinging || pingStatus.length > 0) && (
                <Card sx={{ mb: 4 }} component="section" aria-label="Ping Status Results" aria-live="polite">
                    <CardHeader title={t('commands.ping.title')} />
                    <CardContent>
                        <Typography className="terminal-prompt" sx={{ mb: 2 }} aria-hidden="true">ping -c 4 portfolio.dev</Typography>
                        <Box sx={{ fontFamily: 'monospace' }}>
                            {pingStatus.map((line, index) => (
                                <Typography 
                                    key={index} 
                                    variant="body2" 
                                    sx={{ 
                                        fontFamily: 'inherit',
                                        mb: 0.5,
                                        color: line.includes('packet loss') || line.includes('round-trip') ? 'primary.main' : 'text.primary'
                                    }}
                                >
                                    {line}
                                </Typography>
                            ))}
                            {isPinging && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                    <CircularProgress size={16} aria-label="Waiting for ping response" />
                                    <Typography variant="body2" sx={{ fontFamily: 'inherit' }}>{t('commands.ping.waiting')}</Typography>
                                </Box>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            )}

            {/* Transmission Status */}
            {isTransmitting && (
                <Card sx={{ mb: 4 }} component="section" aria-label="Message Transmission Status" aria-live="polite">
                    <CardHeader title="MESSAGE TRANSMISSION IN PROGRESS" />
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Box aria-hidden="true">
                            <ASCIIArt type="loading" size="small" />
                        </Box>
                        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <CircularProgress size={16} aria-hidden="true" />
                                <Typography>Encrypting message</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, opacity: 0.7 }}>
                                <CircularProgress size={16} aria-hidden="true" />
                                <Typography>Establishing secure connection</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, opacity: 0.4 }}>
                                <CircularProgress size={16} aria-hidden="true" />
                                <Typography>Transmitting data packets</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}

            {/* Footer */}
            <Typography align="center" sx={{ mt: 4 }} aria-hidden="true">
                <span className="blinking-cursor">{t('footer.ready')}</span>
            </Typography>
        </Box>
    );
};

export default Contact;