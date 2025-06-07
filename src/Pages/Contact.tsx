import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ASCIIArt from "../Components/ASCII/ASCIIArt";

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [connectionStatus, setConnectionStatus] = useState('DISCONNECTED');
    const [isTransmitting, setIsTransmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsTransmitting(true);
        setConnectionStatus('TRANSMITTING');

        // Simulate sending
        setTimeout(() => {
            setConnectionStatus('MESSAGE_SENT');
            setIsTransmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => {
                setConnectionStatus('DISCONNECTED');
            }, 10000);
        }, 2000);
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
                    COMMUNICATION INTERFACE - CONTACT PROTOCOLS
                </div>
                <div className="terminal-section-content">
                    <ASCIIArt type="computer" size="medium" />
                    <div className="terminal-prompt">netstat -an | grep LISTEN</div>
                    <div className="terminal-text">
                        <div><strong>CONNECTION STATUS:</strong>
                            <span style={{
                                color: connectionStatus === 'DISCONNECTED' ? 'var(--terminal-gray)' :
                                       connectionStatus === 'TRANSMITTING' ? 'var(--terminal-bright-green)' :
                                       'var(--terminal-green)',
                                marginLeft: '10px'
                            }}>
                                {connectionStatus}
                            </span>
                        </div>
                        <div><strong>RESPONSE TIME:</strong> {networkInfo.responseTime}</div>
                        <div><strong>AVAILABILITY:</strong> {networkInfo.availability}</div>
                        <div><strong>SERVER LOAD:</strong> {networkInfo.serverLoad}</div>
                    </div>
                </div>
            </div>

            {/* Contact Methods */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    AVAILABLE COMMUNICATION CHANNELS
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">ps aux | grep communication</div>
                    <table className="terminal-table">
                        <thead>
                            <tr>
                                <th>PROTOCOL</th>
                                <th>ADDRESS</th>
                                <th>PORT</th>
                                <th>ENCRYPTION</th>
                                <th>STATUS</th>
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
                    SECURE MESSAGE TRANSMISSION FORM
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">nano message.txt</div>
                    <form onSubmit={handleSubmit} className="terminal-form">
                        <div className="terminal-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label className="terminal-text">SENDER_NAME:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="terminal-input"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="terminal-text">EMAIL_ADDRESS:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="terminal-input"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="terminal-text">MESSAGE_SUBJECT:</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="terminal-input"
                                placeholder="Brief subject line"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="terminal-text">MESSAGE_BODY:</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="terminal-input"
                                rows={8}
                                placeholder="Type your message here..."
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="terminal-button primary"
                                disabled={isTransmitting}
                            >
                                {isTransmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                            </button>
                            <button
                                type="button"
                                className="terminal-button"
                                onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                            >
                                CLEAR BUFFER
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
                                <div className="command-item">
                                    <div className="terminal-prompt">ping -c 4 portfolio.dev</div>
                                    <div className="terminal-text">Test connection</div>
                                </div>
                                <div className="command-item">
                                    <div className="terminal-prompt">whois developer</div>
                                    <div className="terminal-text">View public info</div>
                                </div>
                                <div className="command-item">
                                    <div className="terminal-prompt">ssh github.com</div>
                                    <div className="terminal-text">Connect via SSH</div>
                                </div>
                                <div className="command-item">
                                    <div className="terminal-prompt">curl -X POST /message</div>
                                    <div className="terminal-text">Send via API</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                <span className="blinking-cursor">COMMUNICATION CHANNELS OPEN</span>
            </div>
        </div>
    );
};

export default Contact;
