import React from 'react'

type Props = {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

function MobileFilterDrawer({ isOpen, onClose, children }: Props) {
    return (
        <div
            className={`fixed inset-0 z-50 max-[1030px]:block hidden transition ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
        >
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Drawer */}
            <div
                className={`absolute top-0 left-0 h-full w-[85%] max-w-sm bg-gray-50 p-4 overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-xl"
                    >
                        ✕
                    </button>
                </div>

                {children}
            </div>
        </div>
    )
}

export default MobileFilterDrawer
