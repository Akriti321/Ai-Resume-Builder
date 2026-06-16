import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import React from 'react'
import ConfirmationModal from './ConfirmationModal'

const EducationForm = ({ data = [], onChange }) => {
    const [deleteIndex, setDeleteIndex] = React.useState(null);
    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: ""
        };
        onChange([...data, newEducation]);
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data]
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Education</h3>
                        <p className='text-sm text-gray-500'>Add your academic background</p>
                    </div>
                    <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium'>
                        <Plus className='size-4'/>
                        Add Education
                    </button>
                </div>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl'>
                    <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                    <p className='font-medium'>No education added yet.</p>
                    <p className='text-xs text-gray-400 mt-1'>Click "Add Education" to get started.</p>
                </div>
            ) : ( 
                <div className='space-y-4'>
                    {data.map((education, index) => (
                        <div key={index} className='p-5 border border-gray-200 rounded-xl space-y-4 bg-gray-50/50'>
                            <div className='flex justify-between items-center pb-2 border-b border-gray-100'>
                                <h4 className='font-medium text-sm text-gray-700'>Education #{index + 1}</h4>
                                <button
    onClick={() => setDeleteIndex(index)}
    className='p-1 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all'
>
    <Trash2 className='size-4' />
</button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-4'>
                                <div className='space-y-1 md:col-span-2'>
                                    <label className='text-xs font-medium text-gray-500'>School / University</label>
                                    <input value={education.institution || ""} onChange={(e)=> updateEducation(index, "institution", e.target.value)} type="text" placeholder='Institution Name' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>Degree</label>
                                    <input value={education.degree || ""} onChange={(e)=> updateEducation(index, "degree", e.target.value)} type="text" placeholder="Degree (e.g., Bachelor's, Master's)" className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>Field of Study</label>
                                    <input value={education.field || ""} onChange={(e)=> updateEducation(index, "field", e.target.value)} type="text" placeholder='Field of Study' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>Graduation Date</label>
                                    <input value={education.graduation_date || ""} onChange={(e)=> updateEducation(index, "graduation_date", e.target.value)} type="month" className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>GPA / Grade (Optional)</label>
                                    <input value={education.gpa || ""} onChange={(e)=> updateEducation(index, "gpa", e.target.value)} type="text" placeholder='GPA (optional)' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div> 
            )}
            <ConfirmationModal
                isOpen={deleteIndex !== null}
                title="Delete Education"
                description="Are you sure you want to permanently delete this education entry?"
                confirmText="Delete"
                cancelText="Cancel"
                isDangerous={true}
                onConfirm={() => {
                    removeEducation(deleteIndex);
                    setDeleteIndex(null);
                }}
                onCancel={() => setDeleteIndex(null)}
            />
        </div>
    )
}

export default EducationForm