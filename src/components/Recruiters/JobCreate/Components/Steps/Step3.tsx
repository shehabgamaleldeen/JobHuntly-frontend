import React, { useState } from "react";
import PerksBenefitCard from "../PerksBenefitsCard";
import { useJobCreateContext } from "../../JobCreateContext";
import { useNavigate } from "react-router-dom";
import { InputTitle } from "./InputTitle";

interface Benefit {
    id: number;
    icon: string;
    title: string;
    description: string;
}

const staticBenefits: Benefit[] = [
    {
        id: 1,
        icon: "/public/images/Perks/PerksHealth.png",
        title: "Full Healthcare",
        description:
            "We believe in thriving communities and that starts with our team being happy and healthy.",
    },
    {
        id: 2,
        icon: "/public/images/Perks/PerksVacation.png",
        title: "Unlimited Vacation",
        description:
            "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
    },
    {
        id: 3,
        icon: "/public/images/Perks/PerksSkills.png",
        title: "Skill Development",
        description:
            "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
    },
    {
        id: 4,
        icon: "/public/images/Perks/PerksRemote.png",
        title: "Remote Working",
        description:
            "You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.",
    },
    {
        id: 5,
        icon: "/public/images/Perks/PerksTeamSummits.png",
        title: "Team Summits",
        description:
            "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.",
    },
    {
        id: 6,
        icon: "/public/images/Perks/PerksCommuter.png",
        title: "Commuter Benefits",
        description:
            "We’re grateful for all the time and energy each team member puts into getting to work every day.",
    },
    {
        id: 7,
        icon: "/public/images/Perks/PerksGive.png",
        title: "We give back.",
        description:
            "We anonymously match any donation our employees make (up to $/€ 600) so they can support the organizations they care about most—times two.",
    },
];

const Step3: React.FC = () => {
    const { jobData, updateStep3 } = useJobCreateContext();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBenefits, setSelectedBenefits] = useState<Benefit[]>(
        jobData.step3?.benefits || []
    );
    const [error, setError] = useState("");

    const toggleBenefit = (benefit: Benefit) => {
        const exists = selectedBenefits.some((b) => b.id === benefit.id);

        const updated = exists
            ? selectedBenefits.filter((b) => b.id !== benefit.id)
            : [...selectedBenefits, benefit];

        setSelectedBenefits(updated);
        updateStep3({ benefits: updated });
        setError("");
    };

    const removeBenefit = (id: number) => {
        const updated = selectedBenefits.filter((b) => b.id !== id);
        setSelectedBenefits(updated);
        updateStep3({ benefits: updated });

        if (updated.length === 0) setError("Please add at least one benefit.");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedBenefits.length === 0) {
            setError("Please add at least one benefit.");
            return;
        }

        console.log("FORM DATA:", selectedBenefits);
        updateStep3({ benefits: selectedBenefits });

        navigate("/company/job-create/step-4");
    };

    return (
        <form onSubmit={handleSubmit} className="job-create-step3">
            {/* Left section */}
            <section className="mb-4 md:mb-8">
                <InputTitle
                    title="Perks & Benefits"
                    description="Share the attractive perks your company provides."
                />
            </section>

            {/* Add Button */}
            <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md mb-8 hover:bg-indigo-50"
            >
                + Add Benefit
            </button>

            {/* Error message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Selected Benefits Grid */}
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8 mb-8">
                {selectedBenefits.map((benefit) => (
                    <PerksBenefitCard
                        key={benefit.id}
                        icon={benefit.icon}
                        title={benefit.title}
                        description={benefit.description}
                        onRemove={() => removeBenefit(benefit.id)}
                    />
                ))}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
                        <h3 className="text-lg font-semibold text-[#25324B] mb-4">
                            Choose Benefits
                        </h3>

                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {staticBenefits.map((benefit) => {
                                const selected = selectedBenefits.some(
                                    (b) => b.id === benefit.id
                                );

                                return (
                                    <div
                                        key={benefit.id}
                                        className={`cursor-pointer p-3 border rounded-md flex justify-between items-center ${selected
                                            ? "border-indigo-600 bg-indigo-50"
                                            : "border-gray-300"
                                            }`}
                                        onClick={() => toggleBenefit(benefit)}
                                    >
                                        <span className="font-medium">
                                            {benefit.title}
                                        </span>
                                        {selected && (
                                            <span className="text-indigo-600 font-bold">
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}

            {/* Submit */}
            <section className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 md:px-8 py-2 md:py-3 mb-4 md:mb-8
                    self-end rounded-md font-medium text-white transition-colors text-sm
                    bg-indigo-600 hover:bg-indigo-700"
                >
                    Next Step
                </button>
            </section>
        </form>
    );
};

export default Step3;
