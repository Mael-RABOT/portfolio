import React from "react";
import ASCIIArt from "../Components/ASCII/ASCIIArt";
import { RESUME_DATA } from "../Constants/resume";

const Resume: React.FC = () => {
    const experience = RESUME_DATA.experiences.map(exp => ({
        position: exp.jobTitle,
        company: exp.company,
        duration: `${exp.startDate} - ${exp.endDate === 'Present' ? 'Present' : exp.endDate}`,
        location: exp.location,
        contractType: exp.contractType,
        responsibilities: exp.bullets
    }));

    const education = RESUME_DATA.educations.map(edu => ({
        degree: edu.degree,
        institution: edu.school,
        year: `${edu.startDate} - ${edu.endDate === 'Present' ? 'Present' : edu.endDate}`,
        gpa: edu.bullets[0] || "N/A"
    }));

    const certifications = RESUME_DATA.certifications.map(cert => cert.name);

    return (
        <div className="terminal-crt terminal-scanlines">
            {/* Header */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    CURRICULUM VITAE - DEVELOPER PROFILE
                </div>
                <div className="terminal-section-content">
                    <ASCIIArt type="success" size="medium" />
                    <div className="terminal-prompt">cat /home/developer/cv.txt | head -20</div>
                                         <div className="terminal-text">
                        <div><strong>Name:</strong> Maël RABOT</div>
                        <div><strong>Location:</strong> Lyon, France</div>
                        <div><strong>Status:</strong> Computer Science Student at Epitech</div>
                        <div><strong>Specialization:</strong> Full-Stack Development, Robotics, AI Research</div>
                        <div><strong>Contact:</strong> Available for opportunities</div>
                    </div>
                </div>
            </div>

            {/* Professional Experience */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    PROFESSIONAL EXPERIENCE - WORK HISTORY
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">cat /var/log/career.log</div>
                    {experience.map((job, index) => (
                        <div key={index} className="terminal-card" style={{ marginBottom: '20px' }}>
                            <div className="terminal-card-header">
                                {job.position} @ {job.company}
                            </div>
                            <div className="terminal-text">
                                <table className="terminal-table">
                                    <tbody>
                                        <tr>
                                            <td>DURATION:</td>
                                            <td>{job.duration}</td>
                                        </tr>
                                        <tr>
                                            <td>LOCATION:</td>
                                            <td>{job.location}</td>
                                        </tr>
                                        <tr>
                                            <td>TYPE:</td>
                                            <td>{job.contractType}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style={{ marginTop: '15px' }}>
                                    <div className="terminal-prompt">grep "achievements" {job.company.toLowerCase()}.log</div>
                                    <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                        {job.responsibilities.map((resp, respIndex) => (
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
                    {`EDUCATION ${certifications.length > 0 ? "& CERTIFICATIONS" : ""} - ACADEMIC RECORDS`}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-grid">
                        <div className="terminal-card">
                            <div className="terminal-card-header">EDUCATION</div>
                            <div className="terminal-prompt">ls /etc/education/</div>
                            {education.map((edu, index) => (
                                <div key={index} className="terminal-text" style={{ marginBottom: '15px' }}>
                                    <strong>{edu.degree}</strong><br/>
                                    <span className="terminal-command">{edu.institution}</span><br/>
                                    <span>Year: {edu.year} | GPA: {edu.gpa}</span>
                                </div>
                            ))}
                        </div>

                        { certifications?.length > 0 && (
                            <div className="terminal-card">
                                <div className="terminal-card-header">CERTIFICATIONS</div>
                                <div className="terminal-prompt">find /certs -name "*.pem" -type f</div>
                                <div className="skills-list">
                                    {certifications.map((cert, index) => (
                                        <div key={index} className="skill-item">
                                            <span className="status-indicator"></span>
                                            <span className="terminal-command">{cert}</span>
                                            <span className="skill-status">[VALID]</span>
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
                    TECHNICAL PROFICIENCY MATRIX
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">cat /proc/skillset | column -t</div>
                    <table className="terminal-table">
                        <thead>
                            <tr>
                                <th>CATEGORY</th>
                                <th>TECHNOLOGIES</th>
                                <th>YEARS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Frontend</td>
                                <td>React, TypeScript, Vue.js</td>
                                <td>5+</td>
                            </tr>
                            <tr>
                                <td>Backend</td>
                                <td>Node.js, Python, Java</td>
                                <td>5+</td>
                            </tr>
                            <tr>
                                <td>Database</td>
                                <td>PostgreSQL, MongoDB</td>
                                <td>4+</td>
                            </tr>
                            <tr>
                                <td>DevOps</td>
                                <td>Docker, Kubernetes, AWS</td>
                                <td>3+</td>
                            </tr>
                            <tr>
                                <td>Mobile</td>
                                <td>React Native, Flutter</td>
                                <td>2+</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Download Options */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    DOCUMENT DOWNLOAD - EXPORT OPTIONS
                </div>
                <div className="terminal-section-content">
                    <div className="command-grid">
                        <div className="command-item">
                            <div className="terminal-prompt">wget resume.pdf</div>
                            <div className="terminal-text">Download PDF version</div>
                        </div>
                        <div className="command-item">
                            <div className="terminal-prompt">curl -O resume.docx</div>
                            <div className="terminal-text">Download Word document</div>
                        </div>
                        <div className="command-item">
                            <div className="terminal-prompt">git clone portfolio</div>
                            <div className="terminal-text">Clone entire portfolio</div>
                        </div>
                        <div className="command-item">
                            <div className="terminal-prompt">echo $CONTACT_INFO</div>
                            <div className="terminal-text">Display contact details</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <ASCIIArt type="divider" size="large" />
            <div className="terminal-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                <span className="blinking-cursor">RESUME LOADED SUCCESSFULLY</span>
            </div>
        </div>
    );
};

export default Resume;
