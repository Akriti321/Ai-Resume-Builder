import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const ClassicTemplate = ({ data, accentColor }) => {
const formatDate = (dateStr) => {
if (!dateStr) return "";

    const [year, month] = dateStr.split("-");

    return new Date(year, month - 1).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
};

const renderSectionHeading = (title) => (
    <div className="border-b border-gray-400 pb-1 mb-2">
        <h2
            className="text-base font-bold uppercase tracking-wide"
            style={{ color: accentColor }}
        >
            {title}
        </h2>
    </div>
);

return (
    <div className="max-w-4xl mx-auto p-4 bg-white text-gray-800 text-sm">

        {/* Header */}
        <header
            className="text-center mb-4 pb-3 border-b"
            style={{ borderColor: accentColor }}
        >
            <h1
                className="text-3xl font-bold mb-2"
                style={{ color: accentColor }}
            >
                {data.personal_info?.full_name || "Your Name"}
            </h1>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600">

                {data.personal_info?.email && (
                    <a
                        href={`mailto:${data.personal_info.email}`}
                        className="flex items-center gap-1"
                    >
                        <Mail className="size-3" />
                        <span>{data.personal_info.email}</span>
                    </a>
                )}

                {data.personal_info?.phone && (
                    <div className="flex items-center gap-1">
                        <Phone className="size-3" />
                        <span>{data.personal_info.phone}</span>
                    </div>
                )}

                {data.personal_info?.location && (
                    <div className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        <span>{data.personal_info.location}</span>
                    </div>
                )}

                {data.personal_info?.linkedin && (
                    <a
                        href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1"
                    >
                        <Link className="size-3" />
                        <span className="break-all">
                            {data.personal_info.linkedin}
                        </span>
                    </a>
                )}

                {data.personal_info?.website && (
                    <a
                        href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1"
                    >
                        <Globe className="size-3" />
                        <span className="break-all">
                            {data.personal_info.website}
                        </span>
                    </a>
                )}
            </div>
        </header>

        {/* Summary */}
        {data.professional_summary && (
            <section className="mb-4">
                {renderSectionHeading("Professional Summary")}

                <p className="text-gray-700 leading-6">
                    {data.professional_summary}
                </p>
            </section>
        )}
        {/* Education */}
        {data.education && data.education.length > 0 && (
            <section>
                {renderSectionHeading("Education")}

                <div className="space-y-2">

                    {data.education.map((edu, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-start gap-4"
                        >

                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {edu.degree}
                                    {edu.field && ` in ${edu.field}`}
                                </h3>

                                <p className="text-gray-700">
                                    {edu.institution}
                                </p>

                                {edu.gpa && (
                                    <p className="text-xs text-gray-500">
                                        GPA: {edu.gpa}
                                    </p>
                                )}
                            </div>

                            <div className="text-xs text-gray-500 whitespace-nowrap">
                                {formatDate(edu.graduation_date)}
                            </div>

                        </div>
                    ))}

                </div>
            </section>
        )}
        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
            <section className="mb-4">
                {renderSectionHeading("Experience")}

                <div className="space-y-3">

                    {data.experience.map((exp, index) => (
                        <div key={index}>

                            <div className="flex justify-between items-start gap-4">

                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {exp.position}
                                    </h3>

                                    <p className="text-gray-700">
                                        {exp.company}
                                    </p>
                                </div>

                                <div className="text-xs text-gray-500 whitespace-nowrap">
                                    {formatDate(exp.start_date)} -{" "}
                                    {exp.is_current
                                        ? "Present"
                                        : formatDate(exp.end_date)}
                                </div>

                            </div>

                            {exp.description && (
                                <p className="text-gray-700 leading-5 mt-1 whitespace-pre-line">
                                    {exp.description}
                                </p>
                            )}

                        </div>
                    ))}

                </div>
            </section>
        )}

        

        {/* Projects */}
        {data.project && data.project.length > 0 && (
            <section className="mb-4">
                {renderSectionHeading("Projects")}

                <div className="space-y-3">

                    {data.project.map((proj, index) => (
                        <div key={index}>

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h3 className="font-semibold text-gray-900">
                                    {proj.name}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-black font-semibold">
                                    {proj.github_link && (
                                        <a href={proj.github_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-70" aria-label="GitHub">
                                            <FaGithub className="w-4 h-4" />
                                            <span>GitHub</span>
                                        </a>
                                    )}
                                    {proj.deployment_link && (
                                        <a href={proj.deployment_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-70" aria-label="Live Site">
                                            <Globe className="w-4 h-4" />
                                            <span>Live</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {(Array.isArray(proj.description)
                                ? proj.description
                                : [proj.description || ""])
                                .filter(point => point.trim() !== "")
                                .length > 0 && (
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {(Array.isArray(proj.description)
                                        ? proj.description
                                        : [proj.description || ""])
                                        .filter(point => point.trim() !== "")
                                        .map((point, i) => (
                                            <li key={i} className="text-gray-700">
                                                {point}
                                            </li>
                                        ))}
                                </ul>
                            )}

                        </div>
                    ))}

                </div>
            </section>
        )}
        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
            <section className="mb-4">
                {renderSectionHeading("Technical Skills")}

                <p className="text-gray-700 leading-6">
                    {data.skills.join(" • ")}
                </p>
            </section>
        )}
        {/* Achievements */}
{data.achievement && data.achievement.length > 0 && (
    <section className="mb-4">
        {renderSectionHeading("Achievements")}

        <ul className="list-disc pl-5 space-y-1">
            {data.achievement.map((achievement, index) => (
                <li key={index} className="text-gray-700">
                    {achievement}
                </li>
            ))}
        </ul>
    </section>
)}

        

        

    </div>
);

};

export default ClassicTemplate;
