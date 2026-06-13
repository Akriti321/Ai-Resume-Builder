import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeftIcon, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  Brain, 
  Compass, 
  Trophy, 
  TrendingUp, 
  BookOpen, 
  AlertCircle, 
  Calendar, 
  Award, 
  FileText,
  Check,
  ListTodo
} from "lucide-react";
import { AppContext } from "../context/AppContext";

const JDAnalyzer = () => {
  const { resumes, token, backendUrl } = useContext(AppContext);

  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/jd/analyze`, {
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

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        alert(data.message);
      }
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
            <Cpu className="text-blue-600 size-8 shrink-0" /> AI Job Description Analyzer
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm sm:text-base">
            Compare your resume against a target job description, identify critical skill gaps, and get an AI-tailored study roadmap.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <FileText className="size-4 text-blue-500" /> Select Resume
              </label>
              <select
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-xl p-3.5 text-slate-700 transition-all text-sm outline-none cursor-pointer"
                value={resumeId}
                onChange={(e) => setResumeId(e.target.value)}
              >
                <option value="">Choose a resume to analyze...</option>
                {resumes.map((resume) => (
                  <option key={resume._id} value={resume._id}>
                    {resume.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <Brain className="size-4 text-blue-500" /> Job Description
              </label>
              <textarea
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-xl p-3.5 text-slate-700 transition-all text-sm outline-none resize-none font-sans"
                rows={12}
                placeholder="Paste the target Job Description (JD) here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <button
              onClick={analyze}
              disabled={loading || !resumeId || !jobDescription}
              className="w-full group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing compatibility...
                </>
              ) : (
                <>
                  <Sparkles className="size-4 text-blue-200 animate-pulse group-hover:scale-110 transition-transform" />
                  Analyze Compatibility
                </>
              )}
            </button>
          </div>

          {/* Right Column: Analysis Results */}
          <div className="lg:col-span-7">
            {!result && !loading && (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[480px]">
                <div className="size-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Brain className="size-8 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Ready for Analysis</h3>
                <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                  Select your resume and paste the job description on the left. We'll run a detailed keyword match and AI evaluation to check your compatibility.
                </p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 space-y-6 min-h-[480px] flex flex-col justify-center">
                <div className="space-y-5">
                  <div className="h-6 bg-slate-100 rounded-full w-2/3 animate-pulse"></div>
                  <div className="h-16 bg-slate-150 rounded-xl animate-pulse"></div>
                  <div className="h-5 bg-slate-100 rounded-full w-1/2 animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <div className="h-28 bg-slate-100 rounded-xl animate-pulse"></div>
                    <div className="h-28 bg-slate-100 rounded-xl animate-pulse"></div>
                  </div>
                  <div className="h-36 bg-slate-150 rounded-xl animate-pulse"></div>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                {/* Score and Compatibility Header */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-5 w-full">
                    {/* Score Circle */}
                    <div className="relative size-24 flex items-center justify-center rounded-full bg-gradient-to-tr from-slate-50 to-slate-100 border border-slate-200 shadow-inner shrink-0">
                      <svg className="absolute inset-0 size-full -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="42"
                          stroke="#F1F5F9"
                          strokeWidth="6"
                          fill="transparent"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="42"
                          stroke={result.score >= 75 ? "#10B981" : result.score >= 50 ? "#3B82F6" : "#F59E0B"}
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 42}
                          strokeDashoffset={2 * Math.PI * 42 * (1 - result.score / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-2xl font-black text-slate-800">{result.score}%</span>
                    </div>

                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        result.score >= 90 ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        result.score >= 75 ? "bg-blue-50 text-blue-700 border border-blue-200" :
                        result.score >= 60 ? "bg-indigo-50 text-indigo-700 border border-indigo-200" :
                        result.score >= 40 ? "bg-amber-50 text-amber-700 border border-amber-200" :
                        "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}>
                        {result.jobFitCategory}
                      </span>
                      <h2 className="text-xl font-bold text-slate-800 mt-2">ATS Compatibility Score</h2>
                    </div>
                  </div>
                </div>

                {/* Career Readiness Progress Section */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <TrendingUp className="size-5 text-blue-500" /> Career Readiness Details
                  </h3>
                  <div className="space-y-4">
                    {/* Overall Progress */}
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1.5">
                        <span className="text-slate-600">Overall Readiness</span>
                        <span className="text-slate-900 font-bold">{result.careerReadiness?.overall || 0}/100</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${result.careerReadiness?.overall || 0}%` }}></div>
                      </div>
                    </div>

                    {/* Technical Skills Progress */}
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1.5">
                        <span className="text-slate-600">Technical Skill Fit</span>
                        <span className="text-slate-900 font-bold">{result.careerReadiness?.technicalSkills || 0}/100</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${result.careerReadiness?.technicalSkills || 0}%` }}></div>
                      </div>
                    </div>

                    {/* Projects Progress */}
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1.5">
                        <span className="text-slate-600">Projects Depth</span>
                        <span className="text-slate-900 font-bold">{result.careerReadiness?.projects || 0}/100</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${result.careerReadiness?.projects || 0}%` }}></div>
                      </div>
                    </div>

                    {/* Resume Quality Progress */}
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1.5">
                        <span className="text-slate-600">Resume Quality & Formatting</span>
                        <span className="text-slate-900 font-bold">{result.careerReadiness?.resumeQuality || 0}/100</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-violet-500 h-full rounded-full transition-all duration-1000" style={{ width: `${result.careerReadiness?.resumeQuality || 0}%` }}></div>
                      </div>
                    </div>

                    {/* Interview Readiness Progress */}
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1.5">
                        <span className="text-slate-600">Interview Confidence Level</span>
                        <span className="text-slate-900 font-bold">{result.careerReadiness?.interviewReadiness || 0}/100</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${result.careerReadiness?.interviewReadiness || 0}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Matched Skills */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-3.5 flex items-center gap-1.5">
                      <CheckCircle2 className="size-4" /> Matched Skills ({result.matchedSkills?.length || 0})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.matchedSkills && result.matchedSkills.length > 0 ? (
                        result.matchedSkills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-xs font-semibold">
                            <Check className="size-3" /> {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-slate-400 italic">No skills matched yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-rose-700 mb-3.5 flex items-center gap-1.5">
                      <XCircle className="size-4" /> Missing Skills ({result.missingSkills?.length || 0})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills && result.missingSkills.length > 0 ? (
                        result.missingSkills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-xl text-xs font-semibold">
                            <span className="w-1 h-1 rounded-full bg-rose-500"></span> {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-slate-400 italic">Excellent! No missing skills found.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Strengths & Suggestions */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                    <h3 className="text-base font-bold text-slate-800 mb-3.5 flex items-center gap-2">
                      <Award className="size-5 text-emerald-500" /> Key Strengths
                    </h3>
                    <ul className="space-y-3">
                      {result.strengths?.map((item, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                          <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                    <h3 className="text-base font-bold text-slate-800 mb-3.5 flex items-center gap-2">
                      <Compass className="size-5 text-indigo-500" /> Recommendations
                    </h3>
                    <ul className="space-y-3">
                      {result.suggestions?.map((item, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                          <span className="size-1.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Improvement Areas */}
                {result.improvementAreas && result.improvementAreas.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                    <h3 className="text-base font-bold text-slate-800 mb-3.5 flex items-center gap-2">
                      <AlertCircle className="size-5 text-amber-500" /> Improvement Areas
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {result.improvementAreas.map((item, index) => (
                        <div key={index} className="text-sm text-slate-600 bg-amber-50/40 border border-amber-100 rounded-xl p-3 flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Next Steps */}
                {result.nextSteps && result.nextSteps.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <ListTodo className="size-5 text-indigo-500" /> Recommended Action Items
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {result.nextSteps.map((item, index) => (
                        <div key={index} className={`border rounded-2xl p-4 flex flex-col justify-between ${
                          item.priority === 'High' ? 'border-rose-200 bg-rose-50/10' :
                          item.priority === 'Medium' ? 'border-blue-200 bg-blue-50/10' :
                          'border-slate-200 bg-slate-50/10'
                        }`}>
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-bold text-slate-800 text-sm">{item.skill}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                item.priority === 'High' ? 'bg-rose-100 text-rose-700' :
                                item.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                                'bg-slate-150 text-slate-600'
                              }`}>{item.priority}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4-Week Learning Roadmap */}
                {result.learningRoadmap && result.learningRoadmap.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Calendar className="size-5 text-blue-500" /> 4-Week Preparation Roadmap
                    </h3>
                    <div className="relative border-l border-slate-200 ml-4 pl-6 space-y-6">
                      {result.learningRoadmap.map((roadmap, index) => (
                        <div key={index} className="relative">
                          {/* Timeline dot */}
                          <div className="absolute -left-[35px] top-1.5 size-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                          <div>
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Week {roadmap.week || index + 1}</span>
                            <h4 className="text-sm font-bold text-slate-800 mt-0.5">{roadmap.topic}</h4>
                          </div>
                        </div>
                      ))}
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

export default JDAnalyzer;