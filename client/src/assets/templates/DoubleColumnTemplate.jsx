import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const DoubleColumnTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	const renderSidebarSection = (title, children) => (
		<div className="mb-5">
			<h3
				className="text-xs font-bold uppercase tracking-widest mb-2 pb-1"
				style={{ color: accentColor }}
			>
				{title}
			</h3>
			<div className="text-xs text-gray-700 space-y-1.5">{children}</div>
		</div>
	);

	const renderMainSection = (title) => (
		<h2
			className="text-xs font-bold uppercase tracking-widest mb-3"
			style={{ color: accentColor }}
		>
			{title}
		</h2>
	);

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800 p-6">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900 mb-1">
					{data.personal_info?.full_name || "Your Name"}
				</h1>
				<div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
					{data.personal_info?.email && (
						<span>{data.personal_info.email}</span>
					)}
					{data.personal_info?.phone && (
						<span>{data.personal_info.phone}</span>
					)}
					{data.personal_info?.location && (
						<span>{data.personal_info.location}</span>
					)}
					{data.personal_info?.linkedin && (
						<a
							target="_blank"
							rel="noreferrer"
							href={data.personal_info?.linkedin}
							className="hover:underline"
						>
							LinkedIn
						</a>
					)}
					{data.personal_info?.website && (
						<a
							target="_blank"
							rel="noreferrer"
							href={data.personal_info?.website}
							className="hover:underline"
						>
							Website
						</a>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left Column - Main Content */}
				<div className="md:col-span-2 space-y-5">
					{/* Professional Summary */}
					{data.professional_summary && (
						<section>
							{renderMainSection("Summary")}
							<p className="text-xs text-gray-700 leading-relaxed">
								{data.professional_summary}
							</p>
						</section>
					)}

					{/* Experience */}
					{data.experience && data.experience.length > 0 && (
						<section>
							{renderMainSection("Experience")}
							<div className="space-y-4">
								{data.experience.map((exp, index) => (
									<div key={index}>
										<div className="flex justify-between items-baseline mb-1">
											<h3 className="text-sm font-bold text-gray-900">
												{exp.position}
											</h3>
											<span className="text-xs text-gray-500">
												{formatDate(exp.start_date)} –{" "}
												{exp.is_current ? "Present" : formatDate(exp.end_date)}
											</span>
										</div>
										<p className="text-xs font-semibold mb-1" style={{ color: accentColor }}>
											{exp.company}
										</p>
										{exp.description && (
											<div className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
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
						<section>
							{renderMainSection("Projects")}
							<div className="space-y-4">
								{data.project.map((p, index) => (
									<div key={index}>
										<div className="flex justify-between items-baseline mb-1">
											<h3 className="text-sm font-bold text-gray-900">
												{p.name}
											</h3>
										</div>
										<div className="flex items-center gap-3 mb-1 text-xs font-bold">
											{p.github_link && (
												<a
													href={p.github_link}
													target="_blank"
													rel="noreferrer"
													className="inline-flex items-center gap-1 hover:underline"
													style={{ color: accentColor }}
												>
													<FaGithub className="w-3 h-3" />
													GitHub
												</a>
											)}
											{p.deployment_link && (
												<a
													href={p.deployment_link}
													target="_blank"
													rel="noreferrer"
													className="inline-flex items-center gap-1 hover:underline"
													style={{ color: accentColor }}
												>
													<Globe className="w-3 h-3" />
													Live
												</a>
											)}
										</div>
										{p.description && (
											<ul className="list-disc pl-4 text-xs text-gray-700 space-y-0.5">
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
				</div>

				{/* Right Column - Sidebar */}
				<aside className="space-y-4">
					{/* Key Achievements */}
					{data.achievement && data.achievement.length > 0 && (
						renderSidebarSection("Key Achievements", (
							data.achievement.map((a, i) => (
								<div key={i} className="pb-1.5 border-b border-gray-200">
									<p className="font-semibold text-gray-800">{a.split("\n")[0]}</p>
									{a.includes("\n") && (
										<p className="text-gray-600 mt-0.5">
											{a.split("\n").slice(1).join("\n")}
										</p>
									)}
								</div>
							))
						))
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						renderSidebarSection("Skills", (
							<div className="flex flex-wrap gap-1">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-2 py-1 text-xs text-white rounded"
										style={{ backgroundColor: accentColor }}
									>
										{skill}
									</span>
								))}
							</div>
						))
					)}

					{/* Education */}
					{data.education && data.education.length > 0 && (
						renderSidebarSection("Education", (
							data.education.map((edu, index) => (
								<div key={index} className="pb-2 border-b border-gray-200">
									<div className="font-semibold text-gray-800">
										{edu.degree}
										{edu.field && ` in ${edu.field}`}
									</div>
									<div className="text-gray-600">{edu.institution}</div>
									<div className="text-gray-500">{formatDate(edu.graduation_date)}</div>
									{edu.gpa && <div className="text-gray-500">GPA: {edu.gpa}</div>}
								</div>
							))
						))
					)}
				</aside>
			</div>
		</div>
	);
};

export default DoubleColumnTemplate;
