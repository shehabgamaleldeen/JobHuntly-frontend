type ConfirmModalProps = {
    open: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmColor?: string; // new prop
};

export default function ConfirmModal({
    open,
    title = "Confirm Action",
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    confirmColor = "red-600", // default red
}: ConfirmModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                <h3 className="text-lg font-semibold text-[#25324B] mb-2">
                    {title}
                </h3>

                <p className="text-[#515B6F] mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-md bg-${confirmColor} text-white 
                        hover:bg-${confirmColor.replace("-600", "-700")}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
