import { Sparkles } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const ProfessionalSummary = ({data, onChange, setResumeData}) => {

  const { enhanceSummary } = useContext(AppContext)
  const [loading, setLoading] = useState(false)

  const handleEnhance = async () => {
    if (!data) {
        alert("Please write a summary first so AI can enhance it!")
        return
    }
    setLoading(true)
    const result = await enhanceSummary(data)
    if (result.success) {
        onChange(result.enhancedContent)
    } else {
        alert(result.message || "Failed to enhance summary")
    }
    setLoading(false)
  }

  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
                <p className='text-sm text-gray-500'>Add summary for your resume here</p>
            </div>
            <button 
                onClick={handleEnhance}
                disabled={loading}
                className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 cursor-pointer'
            >
                {loading ? (
                    <svg className="animate-spin size-4 text-purple-700" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <Sparkles className="size-4" />
                )}
                {loading ? 'Enhancing...' : 'AI Enhance'}
            </button>
        </div>
        <div className='mt-6'>
            <textarea value={data || ""} onChange={(e)=> onChange(e.target.value)} rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...' />
            <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
        </div>
    </div>
  )
}

export default ProfessionalSummary