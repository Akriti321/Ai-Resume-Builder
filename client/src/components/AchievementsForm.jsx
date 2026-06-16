import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import ConfirmationModal from './ConfirmationModal'

const AchievementsForm = ({ data = [], onChange }) => {
    const [newItem, setNewItem] = useState("")
    const [itemToDelete, setItemToDelete] = useState(null)

    const addItem = (value) => {
        const trimmed = (value || newItem).trim()
        if (!trimmed) return
        onChange([...data, trimmed])
        setNewItem("")
    }

    const removeItem = (index) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)
        setItemToDelete(null)
    }

    const updateItem = (index, value) => {
        const updated = [...data]
        updated[index] = value
        onChange(updated)
    }

    return (
        <div className='space-y-4'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Achievements</h3>
                <p className='text-sm text-gray-500'>Add notable achievements, awards, or recognitions</p>
            </div>

            <div className='flex gap-2'>
                <input
                    type='text'
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder='e.g. Increased sales by 30%'
                    className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm bg-white'
                    onKeyPress={(e)=> { if (e.key === 'Enter') { e.preventDefault(); addItem() } }}
                />
                <button onClick={() => addItem()} className='flex items-center gap-1.5 px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium'>
                    <Plus className='size-4'/> Add
                </button>
            </div>

            <div>
                {data.length === 0 ? (
                    <div className='text-sm text-gray-400 border border-dashed border-gray-200 rounded-xl p-4'>No achievements added yet.</div>
                ) : (
                    <div className='space-y-2'>
                        {data.map((item, i) => (
                            <div key={i} className='flex items-start gap-2 p-2 border border-gray-100 rounded-lg'>
                                <input value={item} onChange={(e)=> updateItem(i, e.target.value)} className='flex-1 px-2 py-1 text-sm bg-white border-none outline-none' />
                                <button onClick={()=> setItemToDelete(i)} className='text-red-500 hover:text-red-700'>
                                    <X className='size-4' />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={itemToDelete !== null}
                title="Remove Achievement"
                description={`Are you sure you want to remove this achievement?`}
                confirmText="Remove"
                cancelText="Cancel"
                isDangerous={true}
                onConfirm={() => removeItem(itemToDelete)}
                onCancel={() => setItemToDelete(null)}
            />
        </div>
    )
}

export default AchievementsForm
