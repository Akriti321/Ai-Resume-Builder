import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, FoldersIcon, GraduationCap, Share2Icon, Sparkles, User, Save } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPricker from '../components/ColorPricker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import AchievementsForm from '../components/AchievementsForm'
import { AppContext } from '../context/AppContext'

const ResumeBuilder = () => {

    const { resumeId } = useParams()
    const { fetchSingleResume, saveResume } = useContext(AppContext)
    const isFirstRender = useRef(true)

    const [resumeData, setResumeData] = useState({
        _id: '',
        title: '',
        personal_info: {},
        professional_summary: "",
        experience: [],
        education: [],
        projects: [],
        achievement: [],
        skills: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false
    })

    const [saveStatus, setSaveStatus] = useState('saved') // 'saving', 'saved', 'error'
    const [errorMsg, setErrorMsg] = useState('')
    const [toast, setToast] = useState(null)

    const loadExistingResume = async (resumeId) => {
        setSaveStatus('saving')
        const result = await fetchSingleResume(resumeId)
        if (result.success) {
            setResumeData(result.resume)
            document.title = result.resume.title
            isFirstRender.current = true
            setSaveStatus('saved')
        } else {
            setSaveStatus('error')
            setErrorMsg(result.message || 'Failed to load resume')
        }
    }

    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    const [removeBackground, setRemoveBackground] = useState(false)

    const sections = [
        { id: "personal", name: "Personal Info", icon: User },
        { id: "summary", name: "Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "projects", name: "Projects", icon: FoldersIcon },
        { id: "achievements", name: "Achievements", icon: Sparkles },
        { id: "skills", name: "Skills", icon: Sparkles },
    ]

    const activeSection = sections[activeSectionIndex]

    // Load resume from MongoDB
    useEffect(() => { 
        if (resumeId) {
            loadExistingResume(resumeId);
        }
    }, [resumeId]); 

    // Debounced Auto-save to MongoDB
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (!resumeData._id) return;

        setSaveStatus('saving')
        const delayDebounceFn = setTimeout(async () => {
            const result = await saveResume(resumeId, resumeData);
            if (result.success) {
                setSaveStatus('saved')
                setToast({ message: "Resume updated successfully", type: "success" })
                const timeoutId = setTimeout(() => setToast(null), 3000)
                return () => clearTimeout(timeoutId)
            } else {
                setSaveStatus('error')
                setErrorMsg(result.message || 'Network error')
            }
        }, 1500);

        return () => clearTimeout(delayDebounceFn);
    }, [resumeData]);

    const changeResumeVisiibility = async () => {
        const updated = { ...resumeData, public: !resumeData.public }
        setResumeData(updated)
        await saveResume(resumeId, updated)
    }

    const handleShare = async () => {
        const frontendUrl = window.location.href.split ('/app')[0];
        const resumeUrl = frontendUrl + '/view/' + resumeId

        if (navigator.share) {
            navigator.share({url: resumeUrl, text: "My Resume"})
        } else {
            alert("Share now supported on this browser. ")
        }

    }

    const downloadResume = async () => {
        window.print();
    }
  return (
    <div>
      
        <div className='max-w-7xl mx-auto px-4 py-6'>
            <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
                <ArrowLeftIcon className='size-4' /> Back to Dashboard
            </Link>
        </div>

        <div className='max-w-7xl mx-auto px-4 pb-8'>
            <div className='grid lg:grid-cols-12 gap-8'>
                {/*   Left Panel -Form   */}
                <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
                    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
                        {/*  progess bar using activeSectionIndex */}
                        <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200'/>
                        <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000' style={{ width: `${activeSectionIndex * 100 / (sections.length-1)}%` }} />

                        {/* Section Navigation */}
                        <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                            <div className='flex items-center gap-2'>
                                <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=> setResumeData(prev => ({...prev, template}))}/>
                                <ColorPricker selectedColor={resumeData.accent_color} onChange={(color)=>setResumeData(prev => ({...prev, accent_color:color}))} />
                            </div>

                            <div className='flex items-center'>
                                {activeSectionIndex !==0 && (
                                    <button onClick={()=> setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0}>
                                        <ChevronLeft className='size-4'/> Previous
                                    </button>
                                )}
                                <button onClick={()=> setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50 '}`} disabled={activeSectionIndex === sections.length - 1}>
                                        Next <ChevronRight className='size-4'/>
                                    </button>
                            </div>
                        </div>
                        {/* form content */}
                        <div className='space-y-6'>
                            {activeSection.id === 'personal' && (
                                <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData(prev=>({...prev, personal_info: data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                            )}
                            {activeSection.id === 'summary' && (
                                <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data)=> setResumeData(prev => ({...prev, professional_summary: data}))} setResumeData={setResumeData}/>
                            )}
                            {activeSection.id === 'experience' && (
                                <ExperienceForm data={resumeData.experience} onChange={(data)=> setResumeData(prev => ({...prev, experience: data}))} />
                            )}
                            {activeSection.id === 'education' && (
                                <EducationForm data={resumeData.education || []} onChange={(data)=> setResumeData(prev => ({...prev, education: data}))} />
                            )}
                            {activeSection.id === 'projects' && (
                                <ProjectForm data={resumeData.project || resumeData.projects || []} onChange={(data)=> setResumeData(prev => ({...prev, project: data, projects: data}))} />
                            )}
                            {activeSection.id === 'achievements' && (
                                <AchievementsForm data={resumeData.achievement || []} onChange={(data)=> setResumeData(prev => ({...prev, achievement: data}))} />
                            )}
                            {activeSection.id === 'skills' && (
                                <SkillsForm data={resumeData.skills || []} onChange={(data)=> setResumeData(prev => ({...prev, skills: data}))} />
                            )}
                        </div>

                        {/* Premium manual Save Changes Button and Status Indicator */}
                        <div className='mt-8 pt-4 border-t border-gray-100 flex items-center justify-between'>
                            <button 
                                onClick={async () => {
                                    setSaveStatus('saving');
                                    const result = await saveResume(resumeId, resumeData);
                                    if (result.success) {
                                        setSaveStatus('saved');
                                        setToast({ message: "Resume saved successfully", type: "success" })
                                        setTimeout(() => setToast(null), 3000)
                                    } else {
                                        setSaveStatus('error');
                                        setErrorMsg(result.message || 'Failed to save');
                                    }
                                }}
                                className='group flex items-center gap-2 px-4 py-2 text-sm text-green-600 bg-gradient-to-br from-green-50 to-green-100 ring-green-300 hover:ring transition-all rounded-xl border border-green-200/30 active:scale-95 cursor-pointer'
                                disabled={saveStatus === 'saving'}
                            >
                                <Save className='size-4 text-green-600 group-hover:text-green-700 transition-colors' />
                                {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                            </button>

                            {/* Status indicator text */}
                            <div className='text-xs font-semibold'>
                                {saveStatus === 'saving' && (
                                    <span className='text-blue-500 animate-pulse flex items-center gap-1'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping'></span>
                                        Saving...
                                    </span>
                                )}
                                {saveStatus === 'saved' && (
                                    <span className='text-green-600 flex items-center gap-1'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-green-500'></span>
                                        Saved in Cloud
                                    </span>
                                )}
                                {saveStatus === 'error' && (
                                    <span className='text-red-500 flex items-center gap-1'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce'></span>
                                        Error: {errorMsg}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/*   Right Panel - Resume Preview   */}
                <div className='lg:col-span-7 max-lg:mt-6'>
                    <div className='relative w-full'>
                            <div className='absolute bottom-3 left-0 right-0 flex items center justify-end gap-2'>
                                {resumeData.public && (
                                    <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors' >
                                        <Share2Icon className='size-4' /> Share
                                    </button>
                                )}
                                <button onClick={changeResumeVisiibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors' >
                                    {resumeData.public ? <EyeIcon className='size-4' /> : 
                                    <EyeOffIcon className='size-4'/>}
                                    {resumeData.public ? 'Public' : 'Private'}
                                </button>
                                <button onClick={downloadResume} className='flex items-center py-2 px-6 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                                        <DownloadIcon className='size-4' /> Download
                                    </button>
                            </div>
                    </div>
                    <ResumePreview data={resumeData} template={resumeData.template}
                    accentColor={resumeData.accent_color} />          
                </div>
            </div>
        </div>

        {/* Premium Sliding Toast Notification */}
        {toast && (
            <div className='fixed left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2.5 px-4.5 py-3 bg-white border border-gray-200/80 rounded-xl shadow-md transition-all duration-300 animate-slide-in'>
                <div className='flex items-center justify-center size-5 rounded-full bg-green-600 text-white shadow-sm'>
                    <svg className='size-3 stroke-[2.5] stroke-current fill-none' viewBox='0 0 24 24'>
                        <polyline points='20 6 9 17 4 12'></polyline>
                    </svg>
                </div>
                <p className='text-[13px] font-semibold text-slate-700 font-sans tracking-wide'>{toast.message}</p>
            </div>
        )}
        <style dangerouslySetInnerHTML={{ __html: `
            @keyframes slideIn {
                from {
                    top: -50px;
                    opacity: 0;
                }
                to {
                    top: 24px;
                    opacity: 1;
                }
            }
            .animate-slide-in {
                animation: slideIn 0.3s ease-out forwards;
            }
        ` }} />
    </div>
  )
}

export default ResumeBuilder