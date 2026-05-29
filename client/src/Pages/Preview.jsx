import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import ResumePreview from '../components/ResumePreview'
import { ArrowLeftIcon, Loader } from 'lucide-react'

const Preview = () => {
    const [resumeData, setResumeData] = useState(null)
    const { resumeId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const { fetchPublicResume } = useContext(AppContext)

    const loadResumeData = async () => {
        setIsLoading(true)
        const result = await fetchPublicResume(resumeId)
        if (result.success) {
            setResumeData(result.resume)
        } else {
            setResumeData(null)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (resumeId) {
            loadResumeData()
        }
    }, [resumeId])

    return resumeData ? (
        <div className='bg-slate-100 min-h-screen' >
            <div className='max-w-3xl mx-auto py-10 px-4'>
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes='py-4 bg-white shadow-lg rounded-xl overflow-hidden' />
            </div>
        </div>
    ) : (
        <div className='flex flex-col items-center justify-center h-screen bg-slate-50 px-4'>
            {isLoading ? (
                <div className='flex flex-col items-center gap-3'>
                    <Loader className='animate-spin size-10 text-green-500' />
                    <p className='text-sm text-gray-500 font-medium'>Loading resume preview...</p>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-center text-3xl md:text-5xl text-slate-400 font-medium' >Resume not found.</p>
                    <a href="/" className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-10 ring-offset-1 ring-1 ring-green-400 flex items-center transition-all shadow-md font-medium text-sm' >
                        <ArrowLeftIcon className='mr-2 size-4' /> go to home page
                    </a>
                </div>
            )}
        </div>
    )
}

export default Preview