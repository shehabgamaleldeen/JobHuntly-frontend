import React from "react";

interface PerksBenefitCardProps {
    icon: string;
    title: string;
    description: string;
    onRemove?: () => void;
}

const PerksBenefitCard: React.FC<PerksBenefitCardProps> = ({
    icon,
    title,
    description,
    onRemove,
}) => {
    return (
        <article className="relative mt-6 p-4 border rounded-lg shadow-sm bg-white">
            {onRemove && (
                <button
                    onClick={onRemove}
                    className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
                >
                    ✕
                </button>
            )}

            <img src={icon} alt={title} className="w-10 h-10 mb-3" />

            <h3 className="text-xl text-[#25324B] font-semibold mb-2">
                {title}
            </h3>

            <p className="text-[#515B6F] my-2">
                {description}
            </p>
        </article>
    );
};

export default PerksBenefitCard;
