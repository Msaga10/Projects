import React from "react";

function AddItem({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            <div className="fixed z-50 w-1/2 p-4 bg-gray-500 rounded-lg shadow-lg inset-1/4">
                <input type="text" placeholder="name" className="rounded" />
                <button >submit</button>
                <button onClick={onClose} className="absolute top-0 right-0 px-1 m-2 bg-red-600">X</button>
            </div>
        </div>
    );
}

export default AddItem;
