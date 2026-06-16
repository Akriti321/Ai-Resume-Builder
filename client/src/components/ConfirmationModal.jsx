import React from 'react';
import { AlertCircle } from 'lucide-react';

const ConfirmationModal = ({ 
    isOpen, 
    title = "Confirm Action", 
    description = "Are you sure?", 
    onConfirm, 
    onCancel, 
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDangerous = false 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">
                {/* Icon */}
                {isDangerous && (
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="w-12 h-12 text-red-500" />
                    </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 text-center">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 text-center text-sm">
                    {description}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                            isDangerous
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
