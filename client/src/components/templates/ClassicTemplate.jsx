import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
const formatDate = (dateStr) => {
if (!dateStr) return "";

    const [year, month] = dateStr.split("-");

    return new Date(year, month - 1).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
};

const SectionHeading = ({ title }) => (
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
                        <span className="break-all">
                            {data.personal_info.linkedin}
                        </span>
                    </div>
                )}

                {data.personal_info?.website && (
                    <div className="flex items-center gap-1">
                        <Globe className="size-3" />
                        <span className="break-all">
                            {data.personal_info.website}
                        </span>
                    </div>
                )}
            </div>
        </header>

        {/* Summary */}
        {data.professional_summary && (
            <section className="mb-4">
                <SectionHeading title="Professional Summary" />

                <p className="text-gray-700 leading-6">
                    {data.professional_summary}
                </p>
            </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
            <section className="mb-4">
                <SectionHeading title="Technical Skills" />

                <p className="text-gray-700 leading-6">
                    {data.skills.join(" • ")}
                </p>
            </section>
        )}

        {/* Projects */}
        {data.project && data.project.length > 0 && (
            <section className="mb-4">
                <SectionHeading title="Projects" />

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

                            {proj.description && (
                                <p className="text-gray-700 leading-5 mt-1">
                                    {proj.description}
                                </p>
                            )}

                        </div>
                    ))}

                </div>
            </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
            <section className="mb-4">
                <SectionHeading title="Experience" />

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

        {/* Education */}
        {data.education && data.education.length > 0 && (
            <section>
                <SectionHeading title="Education" />

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

    </div>
);

};

export default ClassicTemplate;
