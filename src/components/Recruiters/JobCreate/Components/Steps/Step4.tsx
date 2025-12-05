import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputTitle } from "./InputTitle";
import { useJobCreateContext } from "../../JobCreateContext";
import type { Question, QuestionType } from "../../JobCreateContext";

export default function Step4() {
    const navigate = useNavigate();
    const { updateStep4, jobData } = useJobCreateContext();

    const [questionType, setQuestionType] = useState<QuestionType>("yesno");
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
    const handleSubmit = () => {
        updateStep4({ questions });

        console.log("FINAL JOB DATA:", jobData);

        //navigate("/company/job-create/finish");
    };

    return (
        <div className="job-create-step4">

            {/* PAGE TITLE */}
            <section className="mb-6 md:mb-10">
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

                <div className="w-2/3 space-y-3 mt-3">
                    {/* Question Type */}
                    <select
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                        className="
                            w-full text-xs lg:text-base p-3 
                            border-2 border-[#D6DDEB] rounded
                        "
                    >
                        <option value="yes_no">Yes / No Question</option>
                        <option value="essay">Essay Question</option>
                    </select>

                    {/* Question Text Input */}
                    <textarea
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Write your question here..."
                        className="
                            w-full text-xs lg:text-base p-4 
                            h-[90px] md:h-[120px]
                            border-2 border-[#D6DDEB] rounded resize-none
                        "
                    />

                    {/* Add Button */}
                    <button
                        onClick={handleAddQuestion}
                        type="button"
                        className="
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
                            <p className="text-xs md:text-sm font-medium text-gray-600 break-words">
                                {q.type === "yesno" ? "Yes / No" : "Essay"}
                            </p>

                            {/* TEXT */}
                            <p className="text-sm md:text-base text-gray-800 break-words leading-5">
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

            {/* POST JOB BUTTON */}
            <section className="flex justify-end pt-4 md:pt-8">
                <button
                    onClick={handleSubmit}
                    className="
                        px-4 md:px-8 py-2 md:py-3 mb-4 md:mb-8
                        bg-indigo-600 hover:bg-indigo-700 
                        text-white rounded-md font-medium text-sm
                        transition-colors
                    "
                >
                    Post Job
                </button>
            </section>
        </div>
    );
}