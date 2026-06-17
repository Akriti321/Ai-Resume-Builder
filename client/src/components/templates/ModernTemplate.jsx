import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";
const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short"
		});
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800">
			{/* Header */}
			<header className="p-4 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-4xl font-light mb-3">
					{data.personal_info?.full_name || "Your Name"}
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
					{data.personal_info?.email && (
						<a
							href={`mailto:${data.personal_info.email}`}
							className="flex items-center gap-2"
						>
							<Mail className="size-4" />
							<span>{data.personal_info.email}</span>
						</a>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-2">
							<Phone className="size-4" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-2">
							<MapPin className="size-4" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a
							target="_blank"
							rel="noreferrer"
							href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`}
							className="flex items-center gap-2"
						>
							<Link className="size-4" />
							<span className="break-all text-xs">{data.personal_info.linkedin.split("https://www.")[1] ? data.personal_info.linkedin.split("https://www.")[1] : data.personal_info.linkedin}</span>
						</a>
					)}
					{data.personal_info?.website && (
						<a
							target="_blank"
							rel="noreferrer"
							href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`}
							className="flex items-center gap-2"
						>
							<Globe className="size-4" />
							<span className="break-all text-xs">{data.personal_info.website.split("https://")[1] ? data.personal_info.website.split("https://")[1] : data.personal_info.website}</span>
						</a>
					)}
				</div>
			</header>

			<div className="p-4">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className="mb-4">
						<h2 className="text-2xl font-light mb-3 pb-1 border-b border-gray-200">
							Professional Summary
						</h2>
						<p className="text-gray-700 ">{data.professional_summary}</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section className="mb-4">
						<h2 className="text-2xl font-light mb-3 pb-1 border-b border-gray-200">
							Experience
						</h2>

						<div className="space-y-4">
							{data.experience.map((exp, index) => (
								<div key={index} className="relative pl-6 border-l border-gray-200">

									<div className="flex justify-between items-start mb-1">
										<div>
											<h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
											<p className="font-medium" style={{ color: accentColor }}>{exp.company}</p>
										</div>
										<div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									{exp.description && (
										<div className="text-gray-700 leading-relaxed mt-2 whitespace-pre-line">
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
					<section className="mb-4">
						<h2 className="text-2xl font-light mb-3 pb-1 border-b border-gray-200">
							Projects
						</h2>

						<div className="space-y-4">
							{data.project.map((p, index) => (
								<div key={index} className="relative pl-6 border-l border-gray-200" style={{borderLeftColor: accentColor}}>


									<div className="flex justify-between items-start">
										<div className="flex flex-wrap items-center justify-between gap-3">
											<h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
											<div className="flex items-center gap-3 text-xs text-black font-medium mt-2">
												{p.github_link && (
													<a href={p.github_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1" aria-label="GitHub">
														<FaGithub className="w-4 h-4" />
														<span>GitHub</span>
													</a>
												)}
												{p.deployment_link && (
													<a href={p.deployment_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1" aria-label="Live Site">
														<Globe className="w-4 h-4" />
														<span>Live</span>
													</a>
												)}
											</div>
										</div>
									</div>
									{p.description && (
										<ul className="list-disc pl-5 mt-3 text-gray-700 text-sm space-y-1">
											{(Array.isArray(p.description) ? p.description : [p.description])
												.filter(d => d?.trim())
												.map((line, idx) => (
													<li key={idx}>{line}</li>
												))}
										</ul>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				<div className="grid sm:grid-cols-2 gap-4">
					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
								Education
							</h2>

							<div className="space-y-3">
								{data.education.map((edu, index) => (
									<div key={index}>
										<h3 className="font-semibold text-gray-900">
											{edu.degree} {edu.field && `in ${edu.field}`}
										</h3>
										<p style={{ color: accentColor }}>{edu.institution}</p>
										<div className="flex justify-between items-center text-sm text-gray-600">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section>
							<h2 className="text-2xl font-light mb-3 pb-1 border-b border-gray-200">
								Skills
							</h2>

							<div className="flex flex-wrap gap-1">
    {data.skills.map((skill, index) => (
        <span
            key={index}
            className="px-2 py-0.5 text-xs text-black rounded-full"
        >
            {skill}
        </span>
    ))}
</div>
						</section>
					)}

					{/* Achievements */}
					{data.achievement && data.achievement.length > 0 && (
						<section className="sm:col-span-2 mt-4">
							<h2 className="text-2xl font-light mb-3 pb-1 border-b border-gray-200">Achievements</h2>
							<ul className="list-disc pl-5 space-y-1">
								{data.achievement.map((a, i) => (
									<li key={i} className="text-gray-700">{a}</li>
								))}
							</ul>
						</section>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModernTemplate;