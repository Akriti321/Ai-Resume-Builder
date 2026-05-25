import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data = [], onChange }) => {
    const [newSkill, setNewSkill] = useState("")

    const addSkill = (skillToAdd) => {
        const trimmed = (skillToAdd || newSkill).trim();
        if (trimmed && !data.includes(trimmed)) {
            onChange([...data, trimmed]);
            setNewSkill("");
        }
    }

    const removeSkill = (skillToRemove) => {
        const updated = data.filter(skill => skill !== skillToRemove);
        onChange(updated);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    }

    const suggestedSkills = [
        "JavaScript", "React JS", "Node.js", "Python", 
        "SQL", "Git", "GitHub", "TypeScript", 
        "Tailwind CSS", "NextJS", "Express", "Docker"
    ];

    return (
        <div className='space-y-6'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Skills</h3>
                <p className='text-sm text-gray-500'>Add your core strengths and technical skills</p>
            </div>

            {/* Input area */}
            <div className='flex gap-2'>
                <input 
                    type="text" 
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)} 
                    onKeyPress={handleKeyPress}
                    placeholder="e.g. React JS, Python, Project Management" 
                    className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white'
                />
                <button 
                    onClick={() => addSkill()} 
                    className='flex items-center gap-1.5 px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium cursor-pointer'
                >
                    <Plus className='size-4'/>
                    Add
                </button>
            </div>

            {/* Current Skills list (Badges) */}
            <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Selected Skills</label>
                {data.length === 0 ? (
                    <div className='text-center py-6 text-gray-400 border border-dashed border-gray-200 rounded-xl bg-gray-50/30 text-sm'>
                        No skills added yet. Type a skill above or click suggestions to get started.
                    </div>
                ) : (
                    <div className='flex flex-wrap gap-2 p-4 border border-gray-200 rounded-xl bg-gray-50/50 min-h-12'>
                        {data.map((skill, index) => (
                            <span 
                                key={index} 
                                className='inline-flex items-center gap-1.5 px-3 py-1 text-sm bg-blue-50 text-blue-700 border border-blue-100 rounded-full font-medium transition-all hover:bg-blue-100'
                            >
                                {skill}
                                <button 
                                    onClick={() => removeSkill(skill)} 
                                    className='text-blue-400 hover:text-blue-600 rounded-full focus:outline-none transition-colors'
                                >
                                    <X className='size-3.5' />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Suggested Skills */}
            <div className='space-y-2 pt-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5'>
                    <Sparkles className='size-3.5 text-yellow-500' />
                    Suggested / Popular Skills
                </label>
                <div className='flex flex-wrap gap-2'>
                    {suggestedSkills.map((skill, index) => {
                        const isAdded = data.includes(skill);
                        return (
                            <button
                                key={index}
                                onClick={() => !isAdded && addSkill(skill)}
                                disabled={isAdded}
                                className={`px-3 py-1 text-xs rounded-full border transition-all cursor-pointer font-medium select-none ${
                                    isAdded 
                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50/30'
                                }`}
                            >
                                {isAdded ? '✓ ' : '+ '} {skill}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default SkillsForm