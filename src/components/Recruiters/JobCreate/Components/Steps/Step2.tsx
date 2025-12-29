import { InputTitle } from "./InputTitle";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useJobCreateContext, type Step2Data } from "../../JobCreateContext";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ConfirmDeleteModal from "./ConfirmModal";
import { isStep2Filled } from "./StepsFilledHelpers";

const schema = yup.object({
    jobDescription: yup
        .string()
        .required("This field is required")
        .min(50, "Minimum 50 characters")
        .max(1000, "Maximum 1000 characters allowed"),
    responsibilities: yup
        .array()
        .of(
            yup
                .string()
                .required("This field is required")
                .min(10, "Minimum 10 characters")
                .max(300, "Maximum 300 characters allowed")
        )
        .min(1, "At least one responsibility is required")
        .required(),
    whoYouAre: yup
        .array()
        .of(
            yup
                .string()
                .required("This field is required")
                .min(10, "Minimum 10 characters")
                .max(300, "Maximum 300 characters allowed")
        )
        .min(1, "At least one item is required")
        .required(),
    // <-- changed: made niceToHaves required as well
    niceToHaves: yup
        .array()
        .of(
            yup
                .string()
                .required("This field is required")
                .min(10, "Minimum 10 characters")
                .max(300, "Maximum 300 characters allowed")
        )
        .min(1, "At least one item is required")
        .required(),
});

type Step2ArrayFields = "responsibilities" | "whoYouAre" | "niceToHaves";

type ListInputSectionProps = {
    title: string;
    description: string;
    fieldArray: any;
    name: Step2ArrayFields;
    placeholder: string;
    minLength: number;
    register: any;
    errors: any;
    watch: any;
};

const ListInputSection = ({
    title,
    description,
    fieldArray,
    name,
    placeholder,
    minLength,
    register,
    errors,
    watch
}: ListInputSectionProps) => {
    const fieldValues = watch(name) || [];

    return (
        <section className="flex flex-col md:flex-row mb-4 md:mb-8 gap-4">
            <InputTitle title={title} description={description} />
            <div className="w-full md:w-1/2 flex flex-col gap-3">
                {fieldArray.fields.map((field: any, index: number) => {
                    // Access the specific error for this index
                    const fieldErrors = errors[name];
                    const errorMessage = fieldErrors?.[index]?.message;

                    return (
                        <div key={field.id} className="flex flex-col gap-1">
                            <div className="flex items-start gap-2">
                                <textarea
                                    {...register(`${name}.${index}` as const)}
                                    placeholder={placeholder}
                                    rows={2}
                                    className={`flex-1 text-sm lg:text-base p-3 border-2 rounded focus:border-indigo-500 outline-none resize-none ${errorMessage ? "border-red-500" : "border-[#D6DDEB]"
                                        }`}
                                />
                                {fieldArray.fields.length > minLength && (
                                    <button
                                        type="button"
                                        onClick={() => fieldArray.remove(index)}
                                        className="text-red-500 p-2 hover:bg-red-50 rounded"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>

                            {/* Counter and error for the specific index */}
                            <div className="flex justify-between mt-1">
                                {errorMessage ? (
                                    <p className="text-red-500 text-xs">{errorMessage}</p>
                                ) : <div />}
                                <p className="text-[#7C8493] text-xs">{(fieldValues[index] || "").length} / 300</p>
                            </div>
                        </div>
                    );
                })}

                {/* Array-level error (e.g., min length) */}
                {errors[name]?.message && (
                    <p className="text-red-500 text-xs">{errors[name].message}</p>
                )}

                <button
                    type="button"
                    onClick={() => fieldArray.append("")}
                    className="flex items-center gap-1 text-indigo-600 font-medium text-sm mt-1 w-fit"
                >
                    <Plus size={18} /> Add Item
                </button>
            </div>
        </section>
    );
};

export default function Step2() {
    const navigate = useNavigate();
    const { updateStep2, clearStep2, jobData } = useJobCreateContext();

    const defaultValues: Step2Data = {
        jobDescription: "",
        responsibilities: [],
        whoYouAre: [],
        niceToHaves: []
    };

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors }
    } = useForm<Step2Data>({
        resolver: yupResolver(schema),
        defaultValues,
        mode: "onChange"
    });

    // @ts-ignore
    const respArray = useFieldArray({ control, name: "responsibilities" });
    // @ts-ignore
    const whoArray = useFieldArray({ control, name: "whoYouAre" });
    // @ts-ignore
    const niceArray = useFieldArray({ control, name: "niceToHaves" });

    // Ensure at least one field exists for each array on first mount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (respArray.fields.length === 0) respArray.append("");
        if (whoArray.fields.length === 0) whoArray.append("");
        if (niceArray.fields.length === 0) niceArray.append("");
    }, []);

    useEffect(() => {
        if (jobData.step2) {
            const processed: Step2Data = {
                jobDescription: jobData.step2.jobDescription ?? "",
                responsibilities: jobData.step2.responsibilities?.length ? [...jobData.step2.responsibilities] : [""],
                whoYouAre: jobData.step2.whoYouAre?.length ? [...jobData.step2.whoYouAre] : [""],
                niceToHaves: jobData.step2.niceToHaves?.length ? [...jobData.step2.niceToHaves] : [""]
            };
            reset(processed);
        }
    }, [jobData.step2, reset]);

    const onSubmit = (data: Step2Data) => {
        updateStep2(data);
        navigate("/company/job-create/step-3");
    };

    const [confirmOpen, setConfirmOpen] = useState(false);


    const handleClearStep = () => {
        // Prevent modal pop-up when no data is submitted
        if (!jobData.step2 || !isStep2Filled(jobData.step2)) {
            return
        }
        setConfirmOpen(true);
    };

    const confirmClear = () => {
        // Clear local component state
        // Reset RHF fields
        reset({
            jobDescription: "",
            responsibilities: [""],
            whoYouAre: [""],
            niceToHaves: [""],
        });

        // Clear from context + localStorage
        clearStep2();
        setConfirmOpen(false);
    };

    const goToPreviousStep = () => {
        navigate("/company/job-create/step-1");
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="job-create-step2">
            <InputTitle title="Details" description="Add the description and key requirements for this role" />
            <hr className="border-[#D6DDEB] my-6 md:my-8" />

            {/* Job Description */}
            <section className="flex flex-col md:flex-row mb-4 md:mb-8 gap-4">
                <InputTitle title="Job Description" description="Describe the job role in a brief and concise paragraph" />
                <div className="w-full md:w-1/2 flex flex-col">
                    <textarea
                        {...register("jobDescription")}
                        placeholder="Write the job description here..."
                        className={`text-sm lg:text-base p-4 w-full h-[200px] border-2 rounded resize-none focus:border-indigo-500 outline-none ${errors.jobDescription ? "border-red-500" : "border-[#D6DDEB]"}`}
                    />
                    <div className="flex justify-between mt-1">
                        {errors.jobDescription ? (
                            <p className="text-red-500 text-xs">{errors.jobDescription.message}</p>
                        ) : <div />}
                        <p className="text-[#7C8493] text-xs">{(watch("jobDescription") || "").length} / 1000</p>
                    </div>
                </div>
            </section>

            <hr className="border-[#D6DDEB] mb-8" />

            <ListInputSection
                title="Responsibilities"
                description="List the main responsibilities and tasks for this role"
                fieldArray={respArray}
                name="responsibilities"
                placeholder="List the responsibilities here..."
                minLength={1}
                register={register}
                errors={errors}
                watch={watch}
            />
            <hr className="border-[#D6DDEB] mb-8" />

            <ListInputSection
                title="Who You Are"
                description="Describe the ideal candidate, personality, or experience"
                fieldArray={whoArray}
                name="whoYouAre"
                placeholder="Describe who you are looking for..."
                minLength={1}
                register={register}
                errors={errors}
                watch={watch}
            />
            <hr className="border-[#D6DDEB] mb-8" />

            <ListInputSection
                title="Nice-to-Haves"
                description="Optional skills or experience that would be beneficial"
                fieldArray={niceArray}
                name="niceToHaves"
                placeholder="Mention optional but useful skills..."
                minLength={1} // changed from 0 -> 1 to prevent removing last item
                register={register}
                errors={errors}
                watch={watch}
            />

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

                    <ConfirmDeleteModal
                        open={confirmOpen}
                        title="Clear Step 2"
                        message="Are you sure you want to remove all fields data? This action cannot be undone."
                        confirmText="Clear"
                        onCancel={() => setConfirmOpen(false)}
                        onConfirm={confirmClear}
                    />

                    {/* Next Step */}
                    <button
                        type="submit"
                        className="px-4 md:px-8 py-2 md:py-3 mb-4 md:mb-8 
                        text-sm sm:text-base md:text-lg font-medium text-white
                        rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                        Next Step
                    </button>
                </div>
            </section>

        </form>
    );
}
