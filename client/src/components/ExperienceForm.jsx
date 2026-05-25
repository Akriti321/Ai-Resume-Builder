import { Briefcase, Plus, Sparkles, Trash, Trash2 } from 'lucide-react'
import React from 'react'

const ExperienceForm = ({ data = [], onChange }) => {

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newExperience]);
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data]
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
                        <p className='text-sm text-gray-500'>Add your job experience</p>
                    </div>
                    <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium'>
                        <Plus className='size-4'/>
                        Add Experience
                    </button>
                </div>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl'>
                    <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                    <p className='font-medium'>No experience added yet.</p>
                    <p className='text-xs text-gray-400 mt-1'>Click "Add Experience" to get started.</p>
                </div>
            ) : ( 
                <div className='space-y-4'>
                    {data.map((experience, index) => (
                        <div key={index} className='p-5 border border-gray-200 rounded-xl space-y-4 bg-gray-50/50'>
                            <div className='flex justify-between items-center pb-2 border-b border-gray-100'>
                                <h4 className='font-medium text-sm text-gray-700'>Experience #{index + 1}</h4>
                                <button onClick={()=> removeExperience(index)} className='p-1 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all'>
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-4'>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>Company Name</label>
                                    <input value={experience.company || ""} onChange={(e)=> updateExperience(index, "company", e.target.value)} type="text" placeholder='e.g. Google' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>Job Title</label>
                                    <input value={experience.position || ""} onChange={(e)=> updateExperience(index, "position", e.target.value)} type="text" placeholder='e.g. Software Engineer' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>Start Date</label>
                                    <input value={experience.start_date || ""} onChange={(e)=> updateExperience(index, "start_date", e.target.value)} type="month" className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>End Date</label>
                                    <input value={experience.end_date || ""} onChange={(e)=> updateExperience(index, "end_date", e.target.value)} type="month" disabled={experience.is_current} className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white disabled:bg-gray-100' />
                                </div>
                            </div>
                            <label className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none'>
                                <input type="checkbox" checked={experience.is_current || false} onChange={(e)=> updateExperience(index, "is_current", e.target.checked)} className='rounded border-gray-300 text-blue-600 accent-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer' />
                                <span className='text-sm text-gray-700 font-medium'>I currently work here</span>
                            </label>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-sm font-medium text-gray-700'>Job Description</label>
                                    <button className='flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors font-medium'>
                                        <Sparkles className='w-3 h-3' />
                                        Enhance with AI
                                    </button>
                                </div>
                                <textarea rows={4} value={experience.description || ""} onChange={(e)=> updateExperience(index, "description", e.target.value)} className='w-full py-2 px-3 text-sm  rounded-lg resize-none ' placeholder='Describe your key responsibilities, achievements, and impact at this position...' />
                            </div>
                        </div>
                    ))}
                </div> 
            )}
        </div>
    )
}

export default ExperienceForm