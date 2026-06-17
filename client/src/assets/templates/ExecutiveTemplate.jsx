import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const ExecutiveTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	const renderSectionHeading = (title) => (
		<div className="mb-4">
			<h2 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h2>
			<div className="h-0.5 w-16 mt-2" style={{ backgroundColor: accentColor }}></div>
		</div>
	);

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800">
			{/* Premium Header */}
			<header className="px-8 pt-10 pb-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
				<h1 className="text-5xl font-light tracking-tight mb-2">
					{data.personal_info?.full_name || "Your Name"}
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-6 max-w-2xl">
					{data.personal_info?.email && (
						<a
							href={`mailto:${data.personal_info.email}`}
							className="flex items-center gap-3"
						>
							<Mail className="size-4 opacity-75 flex-shrink-0" />
							<span className="break-all">{data.personal_info.email}</span>
						</a>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-3">
							<Phone className="size-4 opacity-75 flex-shrink-0" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-3">
							<MapPin className="size-4 opacity-75 flex-shrink-0" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a
							target="_blank"
							rel="noreferrer"
							href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`}
							className="flex items-center gap-3"
						>
							<Link className="size-4 opacity-75 flex-shrink-0" />
							<span className="break-all text-xs">
								{data.personal_info.linkedin.split("https://www.")[1]
									? data.personal_info.linkedin.split("https://www.")[1]
									: data.personal_info.linkedin}
							</span>
						</a>
					)}
					{data.personal_info?.website && (
						<a
							target="_blank"
							rel="noreferrer"
							href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`}
							className="flex items-center gap-3"
						>
							<Globe className="size-4 opacity-75 flex-shrink-0" />
							<span className="break-all text-xs">
								{data.personal_info.website.split("https://")[1]
									? data.personal_info.website.split("https://")[1]
									: data.personal_info.website}
							</span>
						</a>
					)}
				</div>
			</header>

			<div className="px-8 py-8">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className="mb-10">
						{renderSectionHeading("Executive Overview")}
						<p className="text-gray-700 leading-relaxed text-base">
							{data.professional_summary}
						</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section className="mb-10">
						{renderSectionHeading("Professional Experience")}
						<div className="space-y-7">
							{data.experience.map((exp, index) => (
								<div key={index} className="border-l-4 pl-5" style={{ borderColor: accentColor }}>
									<div className="flex justify-between items-baseline mb-2">
										<h3 className="text-xl font-semibold text-gray-900">
											{exp.position}
										</h3>
										<span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
											{formatDate(exp.start_date)} –{" "}
											{exp.is_current ? "Present" : formatDate(exp.end_date)}
										</span>
									</div>
									<p className="text-base font-medium mb-3" style={{ color: accentColor }}>
										{exp.company}
									</p>
									{exp.description && (
										<div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
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
					<section className="mb-10">
						{renderSectionHeading("Key Projects")}
						<div className="space-y-7">
							{data.project.map((p, index) => (
								<div key={index} className="border-l-4 pl-5" style={{ borderColor: accentColor }}>
									<div className="flex justify-between items-baseline mb-2">
										<h3 className="text-lg font-semibold text-gray-900">
											{p.name}
										</h3>
									</div>
									<div className="flex items-center gap-4 mb-3 font-semibold">
										{p.github_link && (
											<a
												href={p.github_link}
												target="_blank"
												rel="noreferrer"
												className="inline-flex items-center gap-2 text-xs"
												style={{ color: accentColor }}
											>
												<FaGithub className="w-4 h-4" />
												<span>GitHub Repository</span>
											</a>
										)}
										{p.deployment_link && (
											<a
												href={p.deployment_link}
												target="_blank"
												rel="noreferrer"
												className="inline-flex items-center gap-2 text-xs"
												style={{ color: accentColor }}
											>
												<Globe className="w-4 h-4" />
												<span>Live Deployment</span>
											</a>
										)}
									</div>
									{p.description && (
										<ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
											{(Array.isArray(p.description) ? p.description : [p.description])
												.filter((d) => d?.trim())
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

				<div className="grid sm:grid-cols-2 gap-10">
					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							{renderSectionHeading("Education")}
							<div className="space-y-5">
								{data.education.map((edu, index) => (
									<div key={index}>
										<h3 className="font-semibold text-gray-900">
											{edu.degree}
											{edu.field && ` in ${edu.field}`}
										</h3>
										<p
											className="font-medium text-sm mt-1"
											style={{ color: accentColor }}
										>
											{edu.institution}
										</p>
										<div className="flex justify-between items-center text-sm text-gray-600 mt-1">
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
							{renderSectionHeading("Core Competencies")}
							<div className="flex flex-wrap gap-2">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-4 py-2 text-sm font-medium text-white rounded-md"
										style={{ backgroundColor: accentColor }}
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}

					{/* Achievements */}
					{data.achievement && data.achievement.length > 0 && (
						<section className="sm:col-span-2">
							{renderSectionHeading("Recognition & Achievements")}
							<ul className="space-y-2">
								{data.achievement.map((a, i) => (
									<li key={i} className="flex items-start gap-3 text-gray-700">
										<span
											className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0"
											style={{ backgroundColor: accentColor }}
										></span>
										<span>{a}</span>
									</li>
								))}
							</ul>
						</section>
					)}
				</div>
			</div>
		</div>
	);
};

export default ExecutiveTemplate;
