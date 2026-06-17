import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";
const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-4xl font-thin mb-3 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <a
                            href={`mailto:${data.personal_info.email}`}
                        >
                            {data.personal_info.email}
                        </a>
                    )}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <a
                            href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`}
                            target="_blank"
                            rel="noreferrer"
                            className="break-all"
                        >
                            {data.personal_info.linkedin}
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a
                            href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`}
                            target="_blank"
                            rel="noreferrer"
                            className="break-all"
                        >
                            {data.personal_info.website}
                        </a>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <p className=" text-gray-700">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-3">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-1">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <h3 className="text-lg font-medium">{proj.name}</h3>
                                    <div className="flex items-center gap-3 text-xs text-black font-medium">
                                        {proj.github_link && (
                                            <a href={proj.github_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1" aria-label="GitHub">
                                                 <FaGithub className="w-4 h-4" />
                                                <span>GitHub</span>
                                            </a>
                                        )}
                                        {proj.deployment_link && (
                                            <a href={proj.deployment_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1" aria-label="Live Site">
                                                <Globe className="w-4 h-4" />
                                                <span>Live</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {proj.description && (
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {(Array.isArray(proj.description) ? proj.description : [proj.description])
                                            .filter(d => d?.trim())
                                            .map((line, i) => (
                                                <li key={i}>{line}</li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    <div className="text-gray-700">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
            {/* Achievements */}
            {data.achievement && data.achievement.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Achievements
                    </h2>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {data.achievement.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;