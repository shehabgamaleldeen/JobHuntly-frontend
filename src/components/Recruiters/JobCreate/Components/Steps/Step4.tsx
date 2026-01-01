import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputTitle } from "./InputTitle";
import { useJobCreateContext } from "../../JobCreateContext";
import type { Question, QuestionType } from "../../JobCreateContext";
import ConfirmModal from "./ConfirmModal";
import { postNewJob, updateJob } from "@/services/jobService";
import type { JobPostPayload } from "@/types/job";
import { toast } from "sonner";

export default function Step4() {
    const navigate = useNavigate();
    const { updateStep4, clearStep4, clearAllData, jobData } = useJobCreateContext(); // Added clearAllData

    const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

    const [questionType, setQuestionType] = useState<QuestionType>("YES_NO");
    const [questionText, setQuestionText] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);

    /* ------------------ Add Question ------------------ */
    const handleAddQuestion = () => {
        if (!questionText.trim()) return;

        const newQuestion: Question = {
            id: Date.now(),
            type: questionType,
            text: questionText.trim(),
        };

        setQuestions((prev) => [...prev, newQuestion]);
        setQuestionText("");
    };

    /* ------------------ Remove Question ------------------ */
    const handleRemoveQuestion = (id: number) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    /* ------------------ Submit Step 4 ------------------ */
    const [confirmJobOpen, setConfirmJobOpen] = useState(false);

    const handleConfirmJob = () => {
        if (questions.length === 0) {
            return
        }
        setConfirmJobOpen(true);
    };

    const handleSubmit = async () => {
        updateStep4({ questions });
        setIsSubmitting(true);

        const payload: JobPostPayload = {
            _id: jobData._id,

            // Only put here in route of 'Update Job'
            // For 'Create Job' it is put in the backend from access token
            companyId: jobData.companyId,

            // Use ! if you are 100% sure StepGuard prevents getting here without these values
            // Otherwise use || "" to provide a safe fallback string
            title: jobData.step1!.jobTitle!,
            employmentType: jobData.step1!.jobType!,
            workplaceModel: jobData.step1!.workplaceModel!,

            salaryMin: Number(jobData.step1?.salaryFrom) || 0,
            salaryMax: Number(jobData.step1?.salaryTo) || 1,
            salaryCurrency: "EGP",

            // Ensure these match the array requirement in your interface
            categories: jobData.step1?.categories || [],
            skillsIds: jobData.step1?.skills || [],

            dueDate: jobData.step1?.dueDate
                ? new Date(jobData.step1.dueDate).toISOString()
                : undefined,

            description: jobData.step2!.jobDescription!,
            responsibilities: jobData.step2?.responsibilities || [],
            whoYouAre: jobData.step2?.whoYouAre || [],
            niceToHaves: jobData.step2?.niceToHaves || [],

            benefits: jobData.step3?.benefits || [],
            isLive: true,

            // Map frontend 'text' to backend 'questionText'
            // and match the 'TEXT' | 'YES_NO' type exactly
            questions: questions.map(q => ({
                questionText: q.text,
                type: q.type
            }))
        };

        setIsSubmitting(false);
        setConfirmJobOpen(false);

        if (jobData._id) {
            toast.promise(updateJob(payload), {
                loading: 'Updating Job ...',
                success: () => {
                    console.log("Job Updated Successfully");
                    navigate("/company");
                    setTimeout(() => {
                        clearAllData();
                    }, 100);
                    return "Job Updated Successfully";
                },
                error: (err) => {
                    const errorMessage = err.response?.data?.error || "Failed to update job";
                    return `${errorMessage}`;
                },
            });
        }
        else {
            toast.promise(postNewJob(payload), {
                loading: 'Posting Job ...',
                success: () => {
                    console.log("Job Created Successfully");
                    navigate("/company");
                    setTimeout(() => {
                        clearAllData();
                    }, 100);
                    return "Job Created Successfully";
                },
                error: (err) => {
                    const errorMessage = err.response?.data?.error || "Failed to create job";
                    return `${errorMessage}`;
                },
            });
        }
    };

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);


    const handleClearStep = () => {
        if (questions.length === 0) {
            return
        }
        setConfirmDeleteOpen(true);
    };

    const confirmClear = () => {
        // Clear local component state
        setQuestions([]);

        // Clear context (localStorage updates automatically)
        clearStep4();
        setConfirmDeleteOpen(false);
    };

    // Clearing anywhere updates Step 4 UI automatically
    // Context becomes the single source of truth
    useEffect(() => {
        setQuestions(jobData.step4?.questions || []);
    }, [jobData.step4]);


    const goToPreviousStep = () => {
        navigate("/company/jobs/step-3");
    };

    return (
        <div className="step4">

            {/* PAGE TITLE */}
            <section className="mb-6 md:mb-8">
                <InputTitle
                    title="Job Application Questions"
                    description="Add optional questions for your applicants such as essay or yes/no type questions"
                />
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* ADD QUESTION SECTION */}
            <section className="mb-6 md:mb-10">
                <InputTitle
                    title="Add a Question"
                    description="Choose a type and write the question text"
                />

                <div className="flex flex-col space-y-8 mt-3">
                    {/* Question Type */}
                    <select
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                        className="
                            w-[150px]
                            text-xs lg:text-base p-3 
                            border-2 border-[#D6DDEB] rounded
                        "
                    >
                        <option value="YES_NO">Yes / No Question</option>
                        <option value="TEXT">Essay Question</option>
                    </select>

                    {/* Question Text Input */}
                    <textarea
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Write your question here..."
                        className="
                            w-14/16 text-xs lg:text-base p-4 
                            h-[90px] md:h-[120px]
                            border-2 border-[#D6DDEB] rounded resize-none
                        "
                    />

                    {/* Add Button */}
                    <button
                        onClick={handleAddQuestion}
                        type="button"
                        className="
                            w-[150px]
                            px-4 py-2 md:px-6 md:py-3 
                            bg-indigo-600 hover:bg-indigo-700
                            text-white rounded-md text-sm font-medium
                            transition-colors
                        "
                    >
                        Add Question
                    </button>
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* DISPLAY QUESTIONS */}
            <section>
                <InputTitle
                    title="Questions Preview"
                    description="Questions added in the application form"
                />

                <div className="mt-6 w-full space-y-4">
                    {questions.length === 0 && (
                        <p className="text-sm text-gray-500">
                            No questions added yet.
                        </p>
                    )}

                    {questions.map((q) => (
                        <div
                            key={q.id}
                            className="
                                grid 
                                grid-cols-[100px_1fr_auto]
                                md:grid-cols-[140px_1fr_auto]
                                gap-4
                                bg-white border border-[#D6DDEB] rounded
                                p-4
                                items-start
                            "
                        >
                            {/* TYPE */}
                            <p className="text-xs md:text-sm font-medium text-gray-600 wrap-break-word">
                                {q.type === "YES_NO" ? "Yes / No" : "Essay"}
                            </p>

                            {/* TEXT */}
                            <p className="text-sm md:text-base text-gray-800 wrap-break-word leading-5">
                                {q.text}
                            </p>

                            {/* REMOVE BTN (UPDATED) */}
                            <button
                                onClick={() => handleRemoveQuestion(q.id)}
                                className="
                                    px-3 py-1 md:px-4 md:py-2
                                    bg-red-500 hover:bg-red-600
                                    text-white rounded-md
                                    text-xs md:text-sm font-medium
                                    transition-colors
                                    whitespace-nowrap
                                "
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="flex justify-between pt-6">
                {/* Previous Step */}
                <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="px-4 md:px-8 py-2 md:py-3 mb-4 md:mb-8 
                    border border-gray-300
                    text-sm sm:text-base md:text-lg font-medium text-gray-700
                    rounded-md hover:bg-gray-50 transition-colors"
                >
                    Previous Step
                </button>

                <div className="flex gap-3">
                    {/* Clear / Reset */}
                    <button
                        type="button"
                        onClick={handleClearStep}
                        className="px-4 md:px-8 py-2 md:py-3 mb-4 md:mb-8 
                        text-sm sm:text-base md:text-lg font-medium text-white
                        rounded-md bg-red-600 hover:bg-red-700 transition-colors"
                    >
                        Clear Step
                    </button>

                    <ConfirmModal
                        open={confirmDeleteOpen}
                        title="Clear Step 4"
                        message="Are you sure you want to remove all questions? This action cannot be undone."
                        confirmText="Clear"
                        onCancel={() => setConfirmDeleteOpen(false)}
                        onConfirm={confirmClear}
                    />

                    {/* Post Job Button */}
                    <button
                        onClick={handleConfirmJob}
                        disabled={isSubmitting}
                        className="px-4 md:px-8 py-2 md:py-3 mb-4 md:mb-8 
                        text-sm sm:text-base md:text-lg font-medium text-white
                        rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
                    >
                        {isSubmitting ? "Posting..." : "Post Job"}
                    </button>

                    <ConfirmModal
                        open={confirmJobOpen}
                        title="Confirm Job Post"
                        message="Are you sure you want to Post the Job ?"
                        confirmText="Confirm"
                        confirmColor="indigo-600"
                        onCancel={() => setConfirmJobOpen(false)}
                        onConfirm={handleSubmit}
                    />
                </div>
            </section>
        </div>
    );
}