import { InputTitle } from "./InputTitle";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useJobCreateContext } from "../../JobCreateContext";

export default function Step2() {
    const navigate = useNavigate();
    const { updateStep2 } = useJobCreateContext();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            jobDescription: "",
            responsibilities: "",
            whoYouAre: "",
            niceToHaves: ""
        }
    });

    const onSubmit = (data: any) => {
        console.log("FORM DATA:", data);
        updateStep2(data);
        navigate("/company/job-create/step-3");
    };

    // Watch for character counters
    const jobDescription = watch("jobDescription") ?? "";
    const responsibilities = watch("responsibilities") ?? "";
    const whoYouAre = watch("whoYouAre") ?? "";
    const niceToHaves = watch("niceToHaves") ?? "";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="job-create-step2">

            {/* DETAILS TITLE */}
            <section className="mb-4 md:mb-8">
                <InputTitle
                    title="Details"
                    description="Add the description of the job, responsibilities, who you are and nice-to-haves sections"
                />
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Job Description */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle
                    title="Job Description"
                    description="Describe the job role in a brief and concise paragraph"
                />

                <div className="w-1/2">
                    <textarea
                        {...register("jobDescription", {
                            required: "This field is required",
                            minLength: {
                                value: 100,
                                message: "Minimum 100 characters"
                            },
                            maxLength: {
                                value: 1000,
                                message: "Maximum 1000 characters allowed"
                            }
                        })}
                        placeholder="Write the job description here..."
                        className="text-xs lg:text-base p-4 
                        w-19/20
                        h-[120px] md:h-[180px] lg:h-[250px]
                        border-2 border-[#D6DDEB] rounded resize-none"
                    ></textarea>

                    {/* Character counter */}
                    <p className="text-[#7C8493] text-[11px] md:text-xs lg:text-sm mt-1">
                        {jobDescription.length} / 1000
                    </p>

                    {/* Errors */}
                    {errors.jobDescription && (
                        <p className="text-red-500 text-xs md:text-sm">
                            {errors.jobDescription.message}
                        </p>
                    )}
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Responsibilities */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle
                    title="Responsibilities"
                    description="List the main responsibilities and tasks for this role"
                />

                <div className="w-1/2">
                    <textarea
                        {...register("responsibilities", {
                            required: "This field is required",
                            minLength: {
                                value: 100,
                                message: "Minimum 100 characters"
                            },
                            maxLength: {
                                value: 1000,
                                message: "Maximum 1000 characters allowed"
                            }
                        })}
                        placeholder="List the responsibilities here..."
                        className="text-xs lg:text-base p-4                         
                        w-19/20
                        h-[120px] md:h-[180px] lg:h-[250px]
                        border-2 border-[#D6DDEB] rounded resize-none"
                    ></textarea>

                    <p className="text-[#7C8493] text-[11px] md:text-xs lg:text-sm mt-1">
                        {responsibilities.length} / 1000
                    </p>

                    {errors.responsibilities && (
                        <p className="text-red-500 text-xs md:text-sm">
                            {errors.responsibilities.message}
                        </p>
                    )}
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Who You Are */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle
                    title="Who You Are"
                    description="Describe the ideal candidate, personality, or experience"
                />

                <div className="w-1/2">
                    <textarea
                        {...register("whoYouAre", {
                            required: "This field is required",
                            minLength: {
                                value: 100,
                                message: "Minimum 100 characters"
                            },
                            maxLength: {
                                value: 1000,
                                message: "Maximum 1000 characters allowed"
                            }
                        })}
                        placeholder="Describe who you are looking for..."
                        className="text-xs lg:text-base p-4 
                        w-19/20
                        h-[120px] md:h-[180px] lg:h-[250px]
                        border-2 border-[#D6DDEB] rounded resize-none"
                    ></textarea>

                    <p className="text-[#7C8493] text-[11px] md:text-xs lg:text-sm mt-1">
                        {whoYouAre.length} / 1000
                    </p>

                    {errors.whoYouAre && (
                        <p className="text-red-500 text-xs md:text-sm">
                            {errors.whoYouAre.message}
                        </p>
                    )}
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Nice-to-Haves */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle
                    title="Nice-to-Haves"
                    description="Optional skills or experience that would be beneficial"
                />

                <div className="w-1/2">
                    <textarea
                        {...register("niceToHaves", {
                            required: "This field is required",
                            minLength: {
                                value: 100,
                                message: "Minimum 100 characters"
                            },
                            maxLength: {
                                value: 1000,
                                message: "Maximum 1000 characters allowed"
                            }
                        })}
                        placeholder="Mention optional but useful skills..."
                        className="text-xs lg:text-base p-4 
                        w-19/20
                        h-[120px] md:h-[180px] lg:h-[250px]
                        border-2 border-[#D6DDEB] rounded resize-none"
                    ></textarea>

                    <p className="text-[#7C8493] text-[11px] md:text-xs lg:text-sm mt-1">
                        {niceToHaves.length} / 1000
                    </p>

                    {errors.niceToHaves && (
                        <p className="text-red-500 text-xs md:text-sm">
                            {errors.niceToHaves.message}
                        </p>
                    )}
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Submit */}
            <section className="flex justify-end">
                <button
                    type="submit"
                    className="
                    px-4 md:px-8 py-2 md:py-3 mb-4 md:mb-8
                    self-end rounded-md font-medium text-white transition-colors text-sm
                    bg-indigo-600 hover:bg-indigo-700"
                >
                    Next Step
                </button>
            </section>
        </form>
    );
}