import { type ReactNode, useEffect } from 'react'

type MobileFilterDrawerProps = {
    open: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export default function MobileFilterDrawer({
    open,
    onClose,
    title = 'Filters',
    children,
}: MobileFilterDrawerProps) {
    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    if (!open) return null

    return (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/30">
            <div className="absolute inset-0 bg-gray-50 flex flex-col h-[100dvh]">

                {/* Header */}
                <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-4 pb-24">
                    {children}
                </div>
            </div>
        </div>
    )
}
