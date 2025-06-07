import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';
import ASCIIArt from "../Components/ASCII/ASCIIArt";

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

        // Clear error when user starts typing
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

        // Send email using EmailJS
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'contact@maelrabot.com', // Your email
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

        // Simulate ping responses with delays
        pingResponses.forEach((response, index) => {
            setTimeout(() => {
                setPingStatus(prev => [...prev, response]);
                if (index === pingResponses.length - 1) {
                    setTimeout(() => {
                        setIsPinging(false);
                        setTimeout(() => setPingStatus([]), 5000); // Clear after 5 seconds
                    }, 500);
                }
            }, index * 600);
        });
    };

    const handleGitHubConnect = () => {
        window.open('https://github.com/Mael-RABOT', '_blank', 'noopener,noreferrer');
    };

    const handleAPIDemo = () => {
        // Scroll to form and show API example
        const form = document.querySelector('.terminal-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth' });
        }

        // Show API documentation in an alert or could be a modal
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
        // Focus on the form
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
        <div className="terminal-crt terminal-scanlines">
            {/* Header */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('header.title')}
                </div>
                <div className="terminal-section-content">
                    <ASCIIArt type="computer" size="medium" />
                    <div className="terminal-prompt">{t('header.command')}</div>
                    <div className="terminal-text">
                        <div><strong>{t('connection.status')}</strong>
                            <span style={{
                                color: connectionStatus === t('connection.disconnected') ? 'var(--terminal-gray)' :
                                       connectionStatus === t('connection.transmitting') ? 'var(--terminal-bright-green)' :
                                       'var(--terminal-green)',
                                marginLeft: '10px'
                            }}>
                                {connectionStatus}
                            </span>
                        </div>
                        <div><strong>{t('connection.responseTime')}</strong> {networkInfo.responseTime}</div>
                        <div><strong>{t('connection.availability')}</strong> {networkInfo.availability}</div>
                        <div><strong>{t('connection.serverLoad')}</strong> {networkInfo.serverLoad}</div>
                    </div>
                </div>
            </div>

            {/* Contact Methods */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('channels.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">{t('channels.command')}</div>
                    <table className="terminal-table">
                        <thead>
                            <tr>
                                <th>{t('channels.headers.protocol')}</th>
                                <th>{t('channels.headers.address')}</th>
                                <th>{t('channels.headers.port')}</th>
                                <th>{t('channels.headers.encryption')}</th>
                                <th>{t('channels.headers.status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactMethods.map((method, index) => (
                                <tr key={index}>
                                    <td>{method.protocol}</td>
                                    <td>
                                        <a href={`https://${method.address}`}
                                           className="terminal-link"
                            target="_blank"
                                           rel="noopener noreferrer">
                                            {method.address}
                                        </a>
                                    </td>
                                    <td>{method.port}</td>
                                    <td>{method.encryption}</td>
                                    <td>
                                        <span className="status-indicator"
                                              style={{
                                                  backgroundColor: method.status === 'ACTIVE' || method.status === 'ONLINE' ?
                                                  'var(--terminal-green)' : 'var(--terminal-gray)'
                                              }}>
                                        </span>
                                        {method.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Message Form */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('form.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">{t('form.command')}</div>
                    <form onSubmit={handleSubmit} className="terminal-form" noValidate>
                        <div className="terminal-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label className="terminal-text">{t('form.senderName')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`terminal-input ${formErrors.name ? 'error' : ''}`}
                                    placeholder={t('form.placeholders.name')}
                                />
                                {formErrors.name && (
                                    <div className="terminal-error">
                                        <span className="error-indicator">⚠</span> {formErrors.name}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="terminal-text">{t('form.emailAddress')}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`terminal-input ${formErrors.email ? 'error' : ''}`}
                                    placeholder={t('form.placeholders.email')}
                                />
                                {formErrors.email && (
                                    <div className="terminal-error">
                                        <span className="error-indicator">⚠</span> {formErrors.email}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="terminal-text">{t('form.messageSubject')}</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className={`terminal-input ${formErrors.subject ? 'error' : ''}`}
                                placeholder={t('form.placeholders.subject')}
                            />
                            {formErrors.subject && (
                                <div className="terminal-error">
                                    <span className="error-indicator">⚠</span> {formErrors.subject}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="terminal-text">{t('form.messageBody')}</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className={`terminal-input ${formErrors.message ? 'error' : ''}`}
                                rows={8}
                                placeholder={t('form.placeholders.message')}
                            />
                            {formErrors.message && (
                                <div className="terminal-error">
                                    <span className="error-indicator">⚠</span> {formErrors.message}
                                </div>
                            )}
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="terminal-button primary"
                                disabled={isTransmitting}
                            >
                                {isTransmitting ? t('form.transmitting') : t('form.submit')}
                            </button>
                            <button
                                type="button"
                                className="terminal-button"
                                onClick={() => {
                                    setFormData({ name: '', email: '', subject: '', message: '' });
                                    setFormErrors({});
                                }}
                            >
                                {t('form.clear')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Network Information */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    NETWORK DIAGNOSTICS - SYSTEM STATUS
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-grid">
                        <div className="terminal-card">
                            <div className="terminal-card-header">CONNECTION INFO</div>
                            <div className="terminal-prompt">ifconfig | grep inet</div>
                            <table className="terminal-table">
                                <tbody>
                                    <tr>
                                        <td>LOCAL_TIME:</td>
                                        <td>{networkInfo.localTime}</td>
                                    </tr>
                                    <tr>
                                        <td>TIMEZONE:</td>
                                        <td>{networkInfo.timezone}</td>
                                    </tr>
                                    <tr>
                                        <td>RESPONSE_TIME:</td>
                                        <td>{networkInfo.responseTime}</td>
                                    </tr>
                                    <tr>
                                        <td>AVAILABILITY:</td>
                                        <td>{networkInfo.availability}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="terminal-card">
                            <div className="terminal-card-header">QUICK COMMANDS</div>
                            <div className="command-grid">
                                <div className="command-item" onClick={handlePing} style={{ cursor: 'pointer' }}>
                                    <div className="terminal-prompt">ping -c 4 portfolio.dev</div>
                                    <div className="terminal-text">{isPinging ? t('commands.ping.testing') : t('commands.ping.description')}</div>
                                </div>
                                <div className="command-item" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                                    <div className="terminal-prompt">whois developer</div>
                                    <div className="terminal-text">{t('commands.whois.description')}</div>
                                </div>
                                <div className="command-item" onClick={handleGitHubConnect} style={{ cursor: 'pointer' }}>
                                    <div className="terminal-prompt">ssh github.com</div>
                                    <div className="terminal-text">{t('commands.ssh.description')}</div>
                                </div>
                                <div className="command-item" onClick={handleAPIDemo} style={{ cursor: 'pointer' }}>
                                    <div className="terminal-prompt">curl -X POST /message</div>
                                    <div className="terminal-text">{t('commands.api.description')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ping Results */}
            {(isPinging || pingStatus.length > 0) && (
                <div className="terminal-section">
                    <div className="terminal-section-header">
                        {t('commands.ping.title')}
                    </div>
                    <div className="terminal-section-content">
                        <div className="terminal-prompt">ping -c 4 portfolio.dev</div>
                        <div className="terminal-text">
                            {pingStatus.map((line, index) => (
                                <div key={index} style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.9em',
                                    marginBottom: '4px',
                                    color: line.includes('packet loss') || line.includes('round-trip') ?
                                           'var(--terminal-green)' : 'var(--terminal-text)'
                                }}>
                                    {line}
                                </div>
                            ))}
                            {isPinging && (
                                <div className="terminal-loading">
                                    {t('commands.ping.waiting')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Transmission Status */}
            {isTransmitting && (
                <div className="terminal-section">
                    <div className="terminal-section-header">
                        MESSAGE TRANSMISSION IN PROGRESS
                    </div>
                    <div className="terminal-section-content">
                        <ASCIIArt type="loading" size="small" />
                        <div className="terminal-text">
                            <div className="terminal-loading">Encrypting message</div>
                            <div className="terminal-loading" style={{ animationDelay: '0.5s' }}>
                                Establishing secure connection
                            </div>
                            <div className="terminal-loading" style={{ animationDelay: '1s' }}>
                                Transmitting data packets
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <ASCIIArt type="divider" size="large" />
            <div className="terminal-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                <span className="blinking-cursor">{t('footer.ready')}</span>
            </div>
        </div>
    );
};

export default Contact;
