import { FolderGit2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ConfirmationModal from './ConfirmationModal'

const MAX_PROJECT_BULLETS = 5;

const ProjectForm = ({ data = [], onChange }) => {
    const { enhanceProjectDesc } = useContext(AppContext)
    const [enhancingIndex, setEnhancingIndex] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)
    const [deleteBulletInfo, setDeleteBulletInfo] = useState(null);
    const normalizeDescription = (description) => {
        if (Array.isArray(description)) {
            return description.length > 0 ? description : [""]
        }
        if (typeof description === "string") {
            const parsed = description.split("\n").map(item => item.trim()).filter(Boolean)
            return parsed.length > 0 ? parsed : [""]
        }
        return [""]
    }

    const handleEnhance = async (index, bulletPoints) => {
        // Normalize bullet points
        const bullets = Array.isArray(bulletPoints) 
            ? bulletPoints.filter(b => b.trim() !== "") 
            : bulletPoints.split("\n").map(b => b.trim()).filter(b => b !== "");

        if (bullets.length === 0) {
            alert("Please write at least one project bullet point before enhancing!")
            return
        }

        setEnhancingIndex(index)
        
        try {
            // Send all bullets in one request with specific instructions
            const bulletList = bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")
            
            const prompt = `Enhance the following resume project bullet points.

IMPORTANT RULES:
1. Keep the exact same number of bullet points as the input.
2. Do not merge bullet points.
3. Do not create additional bullet points.
4. Return exactly one enhanced bullet for each input bullet, in the same order.
5. Make each bullet ATS-friendly and impact-oriented.
6. Keep each bullet concise (under 25 words).
7. Use strong action verbs and technical language.
8. Return ONLY the bullet points, one per line, without any numbering or bullet markers.

Input bullet points:
${bulletList}

Enhanced bullet points (one per line, no markers):`

            const result = await enhanceProjectDesc(prompt)
            
            if (result.success) {
                // Parse the response back into an array of bullet points
                const enhancedBullets = result.enhancedContent
                    .split("\n")
                    .map(line => line.replace(/^[-•*]\s*/, "").trim())
                    .filter(Boolean)

                // Validate we got the same number of bullets
                if (enhancedBullets.length === bullets.length) {
                    updateProject(index, "description", enhancedBullets)
                } else {
                    alert(`Expected ${bullets.length} bullet points but got ${enhancedBullets.length}. Please try again.`)
                }
            } else {
                alert(result.message || "Failed to enhance project description")
            }
        } catch (error) {
            console.error("Enhancement error:", error)
            alert("An error occurred while enhancing bullets")
        } finally {
            setEnhancingIndex(null)
        }
    }

    const addProject = () => {
        const newProject = {
            name: "",
            github_link: "",
            deployment_link: "",
            description: [""]
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
    const addBullet = (projectIndex) => {
        const updated = [...data];
        const project = updated[projectIndex];
        const normalized = normalizeDescription(project.description);
        
        // Check if we've reached the maximum
        if (normalized.length >= MAX_PROJECT_BULLETS) {
            alert(`Maximum of ${MAX_PROJECT_BULLETS} bullet points reached!`);
            return;
        }
        
        normalized.push("");
        project.description = normalized;
        onChange(updated);
    };

    const removeBullet = (projectIndex, bulletIndex) => {
        setDeleteBulletInfo({ projectIndex, bulletIndex });
    };

    const confirmDeleteBullet = () => {
        if (!deleteBulletInfo) return;
        
        const { projectIndex, bulletIndex } = deleteBulletInfo;
        const updated = [...data];
        const project = updated[projectIndex];
        const normalized = normalizeDescription(project.description);
        normalized.splice(bulletIndex, 1);
        project.description = normalized.length > 0 ? normalized : [""];
        onChange(updated);
        setDeleteBulletInfo(null);
    };

    const updateBullet = (projectIndex, bulletIndex, value) => {
        const updated = [...data];
        const project = updated[projectIndex];
        const normalized = normalizeDescription(project.description);
        normalized[bulletIndex] = value;
        project.description = normalized;
        onChange(updated);
    };

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
                                <button
    onClick={() => setDeleteIndex(index)}
    className='p-1 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all'
>
    <Trash2 className='size-4' />
</button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-4'>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>Project Name</label>
                                    <input value={project.name || ""} onChange={(e)=> updateProject(index, "name", e.target.value)} type="text" placeholder='e.g. Portfolio Website' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>GitHub Repository</label>
                                    <input value={project.github_link || ""} onChange={(e)=> updateProject(index, "github_link", e.target.value)} type="url" placeholder='https://github.com/username/repo' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <label className='text-xs font-medium text-gray-500'>Deployment Link (Optional)</label>
                                <input value={project.deployment_link || ""} onChange={(e)=> updateProject(index, "deployment_link", e.target.value)} type="url" placeholder='https://your-app.com' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white' />
                            </div>

                            <div className='space-y-2'>
    <div className='flex items-center justify-between'>
        <label className='text-sm font-medium text-gray-700'>
            Project Highlights ({normalizeDescription(project.description).length}/{MAX_PROJECT_BULLETS})
        </label>

        <button
            type="button"
            onClick={() =>
                handleEnhance(
                    index,
                    Array.isArray(project.description)
                        ? project.description
                        : project.description
                )
            }
            disabled={enhancingIndex !== null}
            className='flex items-center gap-1.5 px-2.5 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors font-medium cursor-pointer disabled:opacity-50'
        >
            <Sparkles className="w-3 h-3" />

            {enhancingIndex === index
                ? 'Enhancing...'
                : 'Enhance with AI'}
        </button>
    </div>

    {(Array.isArray(project.description)
        ? project.description
        : [project.description || ""])
        .map((bullet, bulletIndex) => (
            <div key={bulletIndex} className='flex gap-2'>
                <span className='mt-2'>•</span>

                <input
                    type='text'
                    value={bullet}
                    onChange={(e) =>
                        updateBullet(
                            index,
                            bulletIndex,
                            e.target.value
                        )
                    }
                    placeholder='Enter KeyHighlights of Your project'
                    className='flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white'
                />

                {(Array.isArray(project.description)
                    ? project.description.length
                    : 1) > 1 && (
                    <button
                        type='button'
                        onClick={() =>
                            removeBullet(
                                index,
                                bulletIndex
                            )
                        }
                        className='text-red-500'
                    >
                        <Trash2 className='size-4' />
                    </button>
                )}
            </div>
        ))}

    {normalizeDescription(project.description).length < MAX_PROJECT_BULLETS && (
        <button
            type='button'
            onClick={() => addBullet(index)}
            className='text-sm text-blue-600 font-medium'
        >
            + Add Bullet Point
        </button>
    )}
</div>
                        </div>
                    ))}
                </div> 
            )}
            {/* Delete Project Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteIndex !== null}
                title="Delete Project"
                description="Are you sure you want to permanently delete this project?"
                confirmText="Delete"
                cancelText="Cancel"
                isDangerous={true}
                onConfirm={() => {
                    removeProject(deleteIndex);
                    setDeleteIndex(null);
                }}
                onCancel={() => setDeleteIndex(null)}
            />

            {/* Delete Bullet Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteBulletInfo !== null}
                title="Delete Bullet Point"
                description="Are you sure you want to delete this bullet point?"
                confirmText="Delete"
                cancelText="Cancel"
                isDangerous={true}
                onConfirm={confirmDeleteBullet}
                onCancel={() => setDeleteBulletInfo(null)}
            />
        </div>
    )
}

export default ProjectForm