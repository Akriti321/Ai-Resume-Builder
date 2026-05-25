import { FolderGit2, Plus, Sparkles, Trash, Trash2 } from 'lucide-react'
import React from 'react'

const ProjectForm = ({ data = [], onChange }) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: ""
        };
        onChange([...data, newProject]);
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateProject = (index, field, value) => {
        const updated = [...data]
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Projects</h3>
                        <p className='text-sm text-gray-500'>Add your key projects and portfolios</p>
                    </div>
                    <button onClick={addProject} className='flex items-center gap-2 px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium'>
                        <Plus className='size-4'/>
                        Add Project
                    </button>
                </div>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl'>
                    <FolderGit2 className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                    <p className='font-medium'>No projects added yet.</p>
                    <p className='text-xs text-gray-400 mt-1'>Click "Add Project" to get started.</p>
                </div>
            ) : ( 
                <div className='space-y-4'>
                    {data.map((project, index) => (
                        <div key={index} className='p-5 border border-gray-200 rounded-xl space-y-4 bg-gray-50/50'>
                            <div className='flex justify-between items-center pb-2 border-b border-gray-100'>
                                <h4 className='font-medium text-sm text-gray-700'>Project #{index + 1}</h4>
                                <button onClick={()=> removeProject(index)} className='p-1 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all'>
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-4'>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>Project Name</label>
                                    <input value={project.name || ""} onChange={(e)=> updateProject(index, "name", e.target.value)} type="text" placeholder='e.g. Portfolio Website' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>Project Type</label>
                                    <input value={project.type || ""} onChange={(e)=> updateProject(index, "type", e.target.value)} type="text" placeholder='e.g. Web App, Mobile App' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-sm font-medium text-gray-700'>Project Description</label>
                                    <button className='flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors font-medium'>
                                        <Sparkles className='w-3 h-3' />
                                        Enhance with AI
                                    </button>
                                </div>
                                <textarea value={project.description || ""} onChange={(e)=> updateProject(index, "description", e.target.value)} rows={4} className='w-full p-3 px-4 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none bg-white' placeholder='Describe the goal, your individual role, and achievements in this project...' />
                            </div>
                        </div>
                    ))}
                </div> 
            )}
        </div>
    )
}

export default ProjectForm