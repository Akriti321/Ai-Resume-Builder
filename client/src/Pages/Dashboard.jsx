import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

    const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
    const { user, resumes, fetchUserResumes, createNewResume, deleteUserResume } = useContext(AppContext)
    const [showCreateResume, setShowCreateResume] = useState(false)
    const [showUploadResume, setShowUploadResume] = useState(false)
    const [title, setTitle] = useState('')
    const [resume, setResume] = useState(null)
    const [editResumeId, setEditResumeId] = useState('')

    const navigate = useNavigate()

    const createResume = async (event) => {
        event.preventDefault()
        if (!title) return
        const result = await createNewResume(title)
        if (result.success) {
            setShowCreateResume(false)
            setTitle('')
            navigate(`/app/builder/${result.resume._id}`)
        } else {
            alert(result.message || "Failed to create resume")
        }
    }

    const uploadResume = async (event) => {
        event.preventDefault()
        if (!title) return
        const result = await createNewResume(title)
        if (result.success) {
            setShowUploadResume(false)
            setTitle('')
            navigate(`/app/builder/${result.resume._id}`)
        } else {
            alert(result.message || "Failed to create resume")
        }
    }

    const editTitle = async (event) => {
        event.preventDefault()
    }

    const deleteResume = async (resumeId) => {
        const confirm = window.confirm('Are you sure you want to delete this resume?')
        if (confirm) {
            const result = await deleteUserResume(resumeId)
            if (!result.success) {
                alert(result.message || "Failed to delete resume")
            }
        }
    }

    useEffect(() => {
        fetchUserResumes()
    }, [])
  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 py-8'>

            <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, {user?.name || 'Guest'}</p>

            <div className='flex gap-4'>
                <button onClick={()=> setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
                    <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full'/>
                    <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
                </button>
                <button onClick={()=> setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
                    <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full'/>
                    <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>Upload Existing</p>
                </button>
                <button
  onClick={() => navigate("/app/jd-analyzer")}
  className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
>
  <FilePenLineIcon className="size-11 p-2.5 bg-gradient-to-br from-blue-300 to-blue-500 text-white rounded-full" />

  <p className="text-sm">
    JD Analyzer
  </p>
</button>
<button
  onClick={() => navigate("/app/interview-prep")}
  className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
>
  <FilePenLineIcon className="size-11 p-2.5 bg-gradient-to-br from-green-300 to-green-500 text-white rounded-full" />
  <p className="text-sm">
    Interview Prep
  </p>
</button>
            </div>
        <hr className='border-slate-300 my-6 sm:w-[305px]'/>
        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
            {resumes.map((resume, index)=>{
                const baseColor = colors[index % colors.length];
                return(
                    <button  key={index} onClick={()=> navigate(`/app/builder/${resume._id}`)} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40'}}>
                        <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{ color: baseColor}}/>
                        <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color:baseColor}}>{resume.title}</p>
                        <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{color: baseColor + '90'}}>
                            Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>
                        <div onClick={e=> e.stopPropagation()} className='absolute  top-1 right-1 group-hover:flex items-center hidden'>
                            <TrashIcon onClick={()=> deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
                            <PencilIcon onClick={()=> {setEditResumeId(resume._id); setTitle(resume.title)}} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
                        </div>
                    </button>
                )
            })}
        </div>  
           { showCreateResume && (
            <form onSubmit={createResume} onClick={()=> setShowCreateResume(false)} className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
                <div onClick={(e) => e.stopPropagation()} className='relative bg-white shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Create Resume</h2>
                    <XIcon className='absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors size-5' onClick={()=>{setShowCreateResume(false); setTitle('')}} />
                    
                    <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-3 mb-6 border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 text-sm text-gray-800 placeholder-gray-400' required/>
                    
                    <button className='w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm'>Create Resume</button>
                </div>
            </form>
           )}

           {showUploadResume && (
            <form onSubmit={uploadResume} onClick={()=> setShowUploadResume(false)} className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
                <div onClick={(e) => e.stopPropagation()} className='relative bg-white shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Upload Resume</h2>
                    <XIcon className='absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors size-5' onClick={()=>{setShowUploadResume(false); setResume(null); setTitle('')}} />
                    
                    <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-3 mb-5 border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 text-sm text-gray-800 placeholder-gray-400' required/>
                    
                    <p className='text-sm text-gray-600 mb-2'>Select resume file</p>
                    <input id='resume-input' onChange={(e)=>setResume(e.target.files[0])} type="file" accept='.pdf,.doc,.docx' className='hidden' required/>
                    <label htmlFor='resume-input' className='block w-full'>
                        <div className='group flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg py-12 hover:bg-green-50 hover:border-green-400 cursor-pointer transition-all duration-300'>
                        {resume ?(
                            <p className='text-gray-500 group-hover:text-green-700 font-medium text-sm transition-colors'>{resume.name}</p>
                        ) : (
                            <>
                                <UploadCloud className='size-12 text-gray-400 group-hover:text-green-600 stroke-[1.5] transition-colors'/>
                                <p className='text-gray-500 group-hover:text-green-600 font-medium text-sm transition-colors'>Upload resume</p> 
                            </>
                        )}
                        </div>
                    </label>
                    <button className='w-full py-3 mt-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm'>Upload resume</button>
                </div>
            </form>
           )}

           { editResumeId && (
            <form onSubmit={editTitle} onClick={()=> setEditResumeId('')} className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
                <div onClick={(e) => e.stopPropagation()} className='relative bg-white shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Edit Resume Title</h2>
                    <XIcon className='absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors size-5' onClick={()=>{setEditResumeId(''); setTitle('')}} />
                    
                    <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-3 mb-6 border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 text-sm text-gray-800 placeholder-gray-400' required/>
                    
                    <button className='w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm'>Update</button>
                </div>
            </form>
           )}

        </div>
    </div>
  )
}

export default Dashboard