import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-5 bg-white text-gray-800 leading-normal">

            {/* Header */}
            <header
                className="text-center mb-4 pb-3 border-b"
                style={{ borderColor: accentColor }}
            >
                <h1
                    className="text-2xl font-bold mb-1"
                    style={{ color: accentColor }}
                >
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-3" />
                            <span>{data.personal_info.email}</span>
                        </div>
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
                        <div className="flex items-center gap-1">
                            <Link className="size-3" />
                            <span>{data.personal_info.linkedin}</span>
                        </div>
                    )}

                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-3" />
                            <span>{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Summary */}
            {data.professional_summary && (
                <section className="mb-4">
                    <h2
                        className="text-lg font-bold mb-2 uppercase"
                        style={{ color: accentColor }}
                    >
                        Professional Summary
                    </h2>

                    <p className="text-sm text-gray-700">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-4">
                    <h2
                        className="text-lg font-bold mb-2 uppercase"
                        style={{ color: accentColor }}
                    >
                        Skills
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-sm bg-gray-100 rounded-md"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-4">
                    <h2
                        className="text-lg font-bold mb-2 uppercase"
                        style={{ color: accentColor }}
                    >
                        Projects
                    </h2>

                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-gray-900">
                                    {proj.name}
                                </h3>

                                {proj.type && (
                                    <p className="text-xs text-gray-500 mb-1">
                                        {proj.type}
                                    </p>
                                )}

                                <p className="text-sm text-gray-700 leading-snug">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-4">
                    <h2
                        className="text-lg font-bold mb-2 uppercase"
                        style={{ color: accentColor }}
                    >
                        Education
                    </h2>

                    <div className="space-y-1">
                        {data.education.map((edu, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-start"
                            >
                                <div>
                                    <h3 className="font-semibold">
                                        {edu.degree}
                                        {edu.field && ` in ${edu.field}`}
                                    </h3>

                                    <p className="text-sm text-gray-700">
                                        {edu.institution}
                                    </p>

                                    {edu.gpa && (
                                        <p className="text-xs text-gray-500">
                                            GPA: {edu.gpa}
                                        </p>
                                    )}
                                </div>

                                <div className="text-xs text-gray-500">
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
                    <h2
                        className="text-lg font-bold mb-2 uppercase"
                        style={{ color: accentColor }}
                    >
                        Experience
                    </h2>

                    <div className="space-y-3">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">
                                            {exp.position}
                                        </h3>

                                        <p className="text-sm text-gray-700">
                                            {exp.company}
                                        </p>
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        {formatDate(exp.start_date)} -
                                        {" "}
                                        {exp.is_current
                                            ? "Present"
                                            : formatDate(exp.end_date)}
                                    </div>
                                </div>

                                {exp.description && (
                                    <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                                        {exp.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;