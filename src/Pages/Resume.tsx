import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ASCIIArt from "../Components/ASCII/ASCIIArt";

interface JobExperience {
    position: string;
    company: string;
    duration: string;
    location: string;
    contractType: string;
    responsibilities: string[];
}

interface Education {
    degree: string;
    institution: string;
    year: string;
    bullets: string[];
}

const Resume: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('resume');
    const { t: tData } = useTranslation('data');

    const resumeData = tData('resume', { returnObjects: true }) as any;

    const experience: JobExperience[] = resumeData.experiences?.map((exp: any) => ({
        position: exp.jobTitle,
        company: exp.company,
        duration: `${exp.startDate} - ${exp.endDate}`,
        location: exp.location,
        contractType: exp.contractType,
        responsibilities: exp.bullets
    })) || [];

    const education: Education[] = resumeData.educations?.map((edu: any) => ({
        degree: edu.degree,
        institution: edu.school,
        year: `${edu.startDate} - ${edu.endDate}`,
        bullets: edu.bullets || []
    })) || [];

    const certifications: string[] = resumeData.certifications?.map((cert: any) => cert.name) || [];

    return (
        <div className="terminal-crt terminal-scanlines">
            {/* Header */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('header.title')}
                </div>
                <div className="terminal-section-content">
                    <ASCIIArt type="success" size="medium" />
                    <div className="terminal-prompt">{t('header.command')}</div>
                    <div className="terminal-text">
                        <div><strong>{t('profile.name')}</strong> {t('profile.nameValue')}</div>
                        <div><strong>{t('profile.location')}</strong> {t('profile.locationValue')}</div>
                        <div><strong>{t('profile.status')}</strong> {t('profile.statusValue')}</div>
                        <div><strong>{t('profile.specialization')}</strong> {t('profile.specializationValue')}</div>
                        <div><strong>{t('profile.contact')}</strong> {t('profile.contactValue')}</div>
                    </div>
                </div>
            </div>

            {/* Professional Experience */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('experience.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">{t('experience.command')}</div>
                    {experience.map((job: JobExperience, index: number) => (
                        <div key={index} className="terminal-card" style={{ marginBottom: '20px' }}>
                            <div className="terminal-card-header">
                                {job.position} @ {job.company}
                            </div>
                            <div className="terminal-text">
                                <table className="terminal-table">
                                    <tbody>
                                        <tr>
                                            <td>{t('experience.duration')}</td>
                                            <td>{job.duration}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('experience.location')}</td>
                                            <td>{job.location}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('experience.type')}</td>
                                            <td>{job.contractType}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style={{ marginTop: '15px' }}>
                                    <div className="terminal-prompt">{t('experience.achievements', { company: job.company.toLowerCase() })}</div>
                                    <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                        {job.responsibilities.map((resp: string, respIndex: number) => (
                                            <li key={respIndex} className="terminal-text">
                                                &gt; {resp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education & Certifications */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {`${t('education.title')} ${certifications.length > 0 ? t('education.certTitle') : ""} - ${t('education.academicTitle')}`}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-grid">
                        <div className="terminal-card">
                            <div className="terminal-card-header">{t('education.title')}</div>
                            <div className="terminal-prompt">{t('education.educationCommand')}</div>
                            {education.map((edu: Education, index: number) => (
                                <div key={index} className="terminal-text" style={{ marginBottom: '15px' }}>
                                    <strong>{edu.degree}</strong><br/>
                                    <span className="terminal-command">{edu.institution}</span><br/>
                                    <span>{t('education.year')} {edu.year}</span>
                                    {edu.bullets && edu.bullets.length > 0 && (
                                        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                            {edu.bullets.map((bullet: string, bulletIndex: number) => (
                                                <li key={bulletIndex} className="terminal-text">
                                                    &gt; {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>

                        { certifications?.length > 0 && (
                            <div className="terminal-card">
                                <div className="terminal-card-header">{t('education.certTitle').replace('& ', '')}</div>
                                <div className="terminal-prompt">{t('education.certCommand')}</div>
                                <div className="skills-list">
                                    {certifications.map((cert: string, index: number) => (
                                        <div key={index} className="skill-item">
                                            <span className="status-indicator"></span>
                                            <span className="terminal-command">{cert}</span>
                                            <span className="skill-status">{t('education.valid')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Technical Skills Matrix */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('skills.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">{t('skills.command')}</div>
                    <table className="terminal-table">
                        <thead>
                            <tr>
                                <th>{t('skills.headers.category')}</th>
                                <th>{t('skills.headers.technologies')}</th>
                                <th>{t('skills.headers.years')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{t('skills.categories.frontend')}</td>
                                <td>{t('skills.techStacks.frontend')}</td>
                                <td>5+</td>
                            </tr>
                            <tr>
                                <td>{t('skills.categories.backend')}</td>
                                <td>{t('skills.techStacks.backend')}</td>
                                <td>5+</td>
                            </tr>
                            <tr>
                                <td>{t('skills.categories.database')}</td>
                                <td>{t('skills.techStacks.database')}</td>
                                <td>4+</td>
                            </tr>
                            <tr>
                                <td>{t('skills.categories.devops')}</td>
                                <td>{t('skills.techStacks.devops')}</td>
                                <td>3+</td>
                            </tr>
                            <tr>
                                <td>{t('skills.categories.mobile')}</td>
                                <td>{t('skills.techStacks.mobile')}</td>
                                <td>2+</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Download Options */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('download.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="command-grid">
                        <div className="command-item" onClick={() => {
                            const link = document.createElement('a');
                            link.href = '/resume.pdf';
                            link.download = 'Mael_RABOT_Resume.pdf';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }} style={{ cursor: 'pointer' }}>
                            <div className="terminal-prompt">{t('download.pdf.command')}</div>
                            <div className="terminal-text">{t('download.pdf.description')}</div>
                        </div>
                        <div className="command-item" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                            <div className="terminal-prompt">{t('download.home.command')}</div>
                            <div className="terminal-text">{t('download.home.description')}</div>
                        </div>
                        <div className="command-item" onClick={() => {
                            const link = document.createElement('a');
                            link.href = 'https://github.com/Mael-RABOT/portfolio/archive/refs/heads/master.zip';
                            link.download = 'Mael_RABOT_Portfolio.zip';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }} style={{ cursor: 'pointer' }}>
                            <div className="terminal-prompt">{t('download.portfolio.command')}</div>
                            <div className="terminal-text">{t('download.portfolio.description')}</div>
                        </div>
                        <div className="command-item" onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>
                            <div className="terminal-prompt">{t('download.contact.command')}</div>
                            <div className="terminal-text">{t('download.contact.description')}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <ASCIIArt type="divider" size="large" />
            <div className="terminal-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                <span className="blinking-cursor">{t('footer.ready')}</span>
            </div>
        </div>
    );
};

export default Resume;
