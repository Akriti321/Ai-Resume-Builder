import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeftIcon, 
  Sparkles, 
  Cpu, 
  FolderGit2, 
  UserCheck, 
  MessageSquareCode, 
  FileText, 
  Brain, 
  HelpCircle
} from "lucide-react";
import { AppContext } from "../context/AppContext";

const InterviewPrep = () => {
  const { resumes, token, backendUrl } = useContext(AppContext);

  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/interview/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          resumeId,
          jobDescription,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        alert("API Error: " + response.status);
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link to={'/app'} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all font-semibold text-sm">
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquareCode className="text-emerald-600 size-8 shrink-0" /> AI Interview Prep Generator
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm sm:text-base">
            Generate customized technical, project-based, and HR interview questions based on your resume and target job role.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <FileText className="size-4 text-emerald-500" /> Select Resume
              </label>
              <select
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl p-3.5 text-slate-700 transition-all text-sm outline-none cursor-pointer"
                value={resumeId}
                onChange={(e) => setResumeId(e.target.value)}
              >
                <option value="">Choose a resume to prepare with...</option>
                {resumes.map((resume) => (
                  <option key={resume._id} value={resume._id}>
                    {resume.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Brain className="size-4 text-emerald-500" /> Job Description <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
                </label>
              </div>
              <textarea
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl p-3.5 text-slate-700 transition-all text-sm outline-none resize-none font-sans"
                rows={12}
                placeholder="Paste the target Job Description to generate context-specific role questions..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <button
              onClick={generateQuestions}
              disabled={loading || !resumeId}
              className="w-full group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating questions...
                </>
              ) : (
                <>
                  <Sparkles className="size-4 text-emerald-200 animate-pulse group-hover:scale-110 transition-transform" />
                  Generate Questions
                </>
              )}
            </button>
          </div>

          {/* Right Column: Generated Questions */}
          <div className="lg:col-span-7">
            {!result && !loading && (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[480px]">
                <div className="size-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <HelpCircle className="size-8 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Ready to Generate</h3>
                <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                  Select your resume and optionally paste a job description. We'll generate customized technical, project, and HR interview questions.
                </p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 space-y-6 min-h-[480px] flex flex-col justify-center">
                <div className="space-y-5">
                  <div className="h-6 bg-slate-100 rounded-full w-1/3 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-12 bg-slate-50 rounded-xl animate-pulse"></div>
                    <div className="h-12 bg-slate-50 rounded-xl animate-pulse"></div>
                    <div className="h-12 bg-slate-50 rounded-xl animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-slate-100 rounded-full w-1/4 animate-pulse pt-6"></div>
                  <div className="space-y-3">
                    <div className="h-12 bg-slate-50 rounded-xl animate-pulse"></div>
                    <div className="h-12 bg-slate-50 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                {/* Technical Questions Card */}
                {result.technicalQuestions && result.technicalQuestions.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50/40 border-b border-slate-100 p-5 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-500 text-white shadow-sm shrink-0">
                        <Cpu className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Technical Questions</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Core concepts, languages, and technologies mentioned in your resume</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        {result.technicalQuestions.map((q, index) => (
                          <li key={index} className="flex gap-4 items-start text-slate-700 text-sm leading-relaxed">
                            <span className="flex items-center justify-center size-6 rounded-full bg-blue-50 text-blue-600 font-bold text-xs shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="pt-0.5 font-medium">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Project Questions Card */}
                {result.projectQuestions && result.projectQuestions.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50/40 border-b border-slate-100 p-5 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-sm shrink-0">
                        <FolderGit2 className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Project & System Architecture</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Deep-dive questions targeting the projects, tools, and implementations you listed</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        {result.projectQuestions.map((q, index) => (
                          <li key={index} className="flex gap-4 items-start text-slate-700 text-sm leading-relaxed">
                            <span className="flex items-center justify-center size-6 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="pt-0.5 font-medium">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* HR & Behavioral Questions Card */}
                {result.hrQuestions && result.hrQuestions.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50/40 border-b border-slate-100 p-5 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-violet-500 text-white shadow-sm shrink-0">
                        <UserCheck className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">HR & Behavioral Questions</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Scenario-based behavioral questions to evaluate culture fit and communication</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        {result.hrQuestions.map((q, index) => (
                          <li key={index} className="flex gap-4 items-start text-slate-700 text-sm leading-relaxed">
                            <span className="flex items-center justify-center size-6 rounded-full bg-violet-50 text-violet-600 font-bold text-xs shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="pt-0.5 font-medium">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;