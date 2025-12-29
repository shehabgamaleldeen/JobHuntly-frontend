import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputTitle } from "./InputTitle";
import { useJobCreateContext, type Step1Data } from "../../JobCreateContext";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "./ConfirmModal";
import { isStep1Filled } from "./StepsFilledHelpers";
import { getSkills } from "@/services/jobService";

type categoryOption = {
    value: string;
    label: string;
};

const categoryOptions: categoryOption[] = [
    { value: 'Design', label: 'Design' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Business', label: 'Business' },
    { value: 'Human Resource', label: 'Human Resource' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Technology', label: 'Technology' },
];

type skillOption = {
    value: string; // This will store the _id
    label: string; // This will store the name
};

// Place these right below your requiredSkillsOptions
const jobTypes = [
    { id: "Full-Time", label: "Full-Time" },
    { id: "Part-Time", label: "Part-Time" },
    { id: "Contract", label: "Contract" },
    { id: "Internship", label: "Internship" }
];

const workplaceModels = [
    { id: "On-Site", label: "On-Site" },
    { id: "Remote", label: "Remote" },
    { id: "Hybrid", label: "Hybrid" }
];

export default function Step1() {
    const [skillsOptions, setSkillsOptions] = useState<skillOption[]>([]);

    // Fetch skills from your API
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await getSkills();

                // Axios puts the backend body in .data
                // If your backend 'response' helper sends { status, data: [...] }, 
                // then you access response.data.data
                const skillsArray = response.data.data || response.data;

                const formattedSkills = skillsArray.map((skill: { _id: string; name: string }) => ({
                    value: skill._id,  // MongoDB ID
                    label: skill.name  // Skill Name
                }));

                setSkillsOptions(formattedSkills);
            } catch (error) {
                console.error("Failed to fetch skills:", error);
            }
        };

        fetchSkills();
    }, []);

    const navigate = useNavigate();
    const { updateStep1, clearStep1, jobData } = useJobCreateContext();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        getValues,
        reset,
        formState: { errors }
    } = useForm<Step1Data>({
        defaultValues: jobData.step1 || {
            jobTitle: "",
            jobType: "", // This will hold a single string
            workplaceModel: "", // This will hold a single string
            salaryFrom: 0,
            salaryTo: 0,
            categories: [],
            skills: []
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (jobData.step1) {
            reset(jobData.step1);
        }
    }, [jobData.step1, reset]);

    const onSubmit = (data: Step1Data) => {
        console.log("=== FORM SUBMISSION ===");
        console.log("Form Data:", data);
        console.log("Is Step1 Filled?", isStep1Filled(data));

        updateStep1(data);

        setTimeout(() => {
            navigate("/company/job-create/step-2");
        }, 100);
    };

    const handleClearStep = () => {
        if (!jobData.step1 || !isStep1Filled(jobData.step1)) {
            return;
        }
        setConfirmOpen(true);
    };

    const confirmClear = () => {
        reset({
            jobTitle: "",
            jobType: "",
            workplaceModel: "",
            salaryFrom: 0,
            salaryTo: 0,
            categories: [],
            skills: [],
        });
        clearStep1();
        setConfirmOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="job-create-step1">
            {/* Basic Information */}
            <section className="mb-4 md:mb-8">
                <InputTitle title="Basic Information" description="This information will be displayed publicly" />
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Job Title */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle title="Job Title" description="Choose a title that best describes the job you are offering" />
                <div className="w-1/2">
                    <input
                        type="text"
                        placeholder="e.g. Software Engineer"
                        className={`
                            text-[11px] sm:text-sm lg:text-base 
                            p-4 h-[35px] md:h-3/5 w-full sm:w-13/15 md:w-10/12 
                            border-2 ${errors.jobTitle ? "border-red-500" : "border-[#D6DDEB]"}`}
                        {...register("jobTitle", {
                            required: "Job title is required",
                            minLength: {
                                value: 10,
                                message: "Title must be at least 10 characters"
                            }
                        })}
                    />
                    {errors.jobTitle && (
                        <p className="text-red-500 text-xs md:text-sm">{errors.jobTitle.message}</p>
                    )}
                    <p className="text-[#7C8493] text-[10px] md:text-xs lg:text-sm">
                        At Least 10 Characters
                    </p>
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Job Type - Radio Buttons */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle title="Job Type" description="Select the employment type" />
                <div className="flex w-1/2 flex-col gap-2">
                    {jobTypes.map((type) => (
                        <div key={type.id} className="flex items-center">
                            <input
                                type="radio"
                                value={type.id}
                                id={type.id}
                                className="w-[12px] md:w-[16px] lg:w-[18px]
                                h-[12px] md:h-[16px] lg:h-[18px] mr-1 md:mr-2"
                                {...register("jobType", { required: "Please select a job type" })}
                            />
                            <label htmlFor={type.id} className="text-[#515B6F] text-xs md:text-base lg:text-lg">
                                {type.label}
                            </label>
                        </div>
                    ))}
                    {errors.jobType && <p className="text-red-500 text-xs">{errors.jobType.message}</p>}
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Workplace Model - Radio Buttons */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle title="Workplace Model" description="Choose the physical environment where an employee performs their duties." />
                <div className="flex w-1/2 flex-col gap-2">
                    {workplaceModels.map((model) => (
                        <div key={model.id} className="flex items-center">
                            <input
                                type="radio"
                                value={model.id}
                                id={model.id}
                                className="w-[12px] md:w-[16px] lg:w-[18px]
                                h-[12px] md:h-[16px] lg:h-[18px] mr-1 md:mr-2"
                                {...register("workplaceModel", { required: "Please select a workplace model" })}
                            />
                            <label htmlFor={model.id} className="text-[#515B6F] text-xs md:text-base lg:text-lg">
                                {model.label}
                            </label>
                        </div>
                    ))}
                    {errors.workplaceModel && <p className="text-red-500 text-xs">{errors.workplaceModel.message}</p>}
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Salary */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle
                    title="Salary"
                    description="Please specify the monthly salary range in EGP for the role"
                />
                <div className="flex items-baseline gap-2 sm:gap-4 w-1/2">
                    <div>
                        <input
                            type="number"
                            placeholder="From"
                            className={`text-[11px] lg:text-base 
                            w-[70px] sm:w-[100px] md:w-[150px] lg:w-[130px] 
                            h-7 md:h-10 p-3 sm:p-4 
                            border-2 rounded ${errors.salaryFrom ? "border-red-500" : "border-[#D6DDEB]"}`}
                            {...register("salaryFrom", {
                                required: "Required",
                                valueAsNumber: true,
                                min: { value: 1, message: "Must be greater than 0" }
                            })}
                        />
                        <p className="text-red-500 text-[11px] sm:text-xs md:text-sm">
                            {errors.salaryFrom ? errors.salaryFrom.message : "\u00A0"}
                        </p>
                    </div>

                    <span className="text-[#515B6F]">-</span>

                    <div>
                        <input
                            type="number"
                            placeholder="To"
                            className={`text-[11px] lg:text-base 
                            w-[70px] sm:w-[100px] md:w-[100px] lg:w-[130px] 
                            h-7 md:h-10 p-3 sm:p-4 
                            border-2 rounded ${errors.salaryTo ? "border-red-500" : "border-[#D6DDEB]"}`}
                            {...register("salaryTo", {
                                required: "Required",
                                valueAsNumber: true,
                                validate: (value) => {
                                    const from = getValues("salaryFrom");
                                    return Number(value) > Number(from) || "Must be greater than 'From'";
                                },
                            })}
                        />
                        <p className="text-red-500 text-[11px] sm:text-xs md:text-sm">
                            {errors.salaryTo ? errors.salaryTo.message : "\u00A0"}
                        </p>
                    </div>
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Categories Controller (Preserved) */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle
                    title="Categories"
                    description="You can select multiple job categories"
                />
                <div className="flex flex-col w-1/2">
                    <label className="text-[#515B6F] text-base font-normal text-sm lg:text-base">
                        Select Job Categories
                    </label>
                    <Controller
                        control={control}
                        name="categories"
                        rules={{
                            validate: (value) =>
                                (value && value.length > 0) || "Select at least one category",
                        }}
                        render={({ field }) => (
                            <Select<categoryOption, true>
                                isMulti
                                options={categoryOptions} // Using the Corrected Capitalized Options
                                value={categoryOptions.filter(option =>
                                    field.value?.includes(option.value)
                                )}
                                onChange={(val) => field.onChange(val.map(v => v.value))}
                                placeholder="Select Job Categories"
                                className="text-[10px] md:text-base lg:text-lg w-full sm:w-13/15 md:w-10/12"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: errors.categories ? "#ef4444" : base.borderColor,
                                        boxShadow: "none",
                                        "&:hover": {
                                            borderColor: errors.categories ? "#ef4444" : base.borderColor,
                                        },
                                    }),
                                    clearIndicator: (base) => ({ ...base, padding: '2px' }),
                                    dropdownIndicator: (base) => ({ ...base, padding: '2px' }),
                                }}
                                classNames={{
                                    clearIndicator: () => `
                                    [&>svg]:w-3 sm:[&>svg]:h-3
                                    sm:[&>svg]:w-4 sm:[&>svg]:h-4
                                    md:[&>svg]:w-6 md:[&>svg]:h-6
                                `,
                                    dropdownIndicator: () => `
                                    [&>svg]:w-3 sm:[&>svg]:h-3
                                    sm:[&>svg]:w-4 sm:[&>svg]:h-4
                                    md:[&>svg]:w-6 md:[&>svg]:h-6
                                `,
                                }}
                                classNamePrefix="rs"
                            />
                        )}
                    />
                    {errors.categories && (
                        <p className="text-red-500 text-xs md:text-sm">{errors.categories.message}</p>
                    )}
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Skills Controller (Preserved) */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle
                    title="Required Skills"
                    description="You can select multiple skills"
                />
                <div className="flex flex-col w-1/2">
                    <label className="text-[#515B6F] font-normal text-sm lg:text-base">
                        Select Required Skills
                    </label>
                    <Controller
                        control={control}
                        name="skills"
                        rules={{
                            validate: (value) =>
                                (value && value.length > 0) || "Select at least one skill",
                        }}
                        render={({ field }) => (
                            <Select<skillOption, true>
                                isMulti
                                options={skillsOptions}     // Use the dynamic state
                                value={skillsOptions.filter(option =>
                                    field.value?.includes(option.value)
                                )}
                                onChange={(val) => field.onChange(val.map(v => v.value))}
                                placeholder="Select Required Skills"
                                className="text-[10px] md:text-base lg:text-lg w-full sm:w-13/15 md:w-10/12"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: errors.skills ? "#ef4444" : base.borderColor,
                                        boxShadow: "none",
                                        "&:hover": {
                                            borderColor: errors.skills ? "#ef4444" : base.borderColor,
                                        },
                                    }),
                                    clearIndicator: (base) => ({ ...base, padding: '2px' }),
                                    dropdownIndicator: (base) => ({ ...base, padding: '2px' }),
                                }}
                                classNames={{
                                    clearIndicator: () => `
                                    [&>svg]:w-3 sm:[&>svg]:h-3
                                    sm:[&>svg]:w-4 sm:[&>svg]:h-4
                                    md:[&>svg]:w-6 md:[&>svg]:h-6
                                `,
                                    dropdownIndicator: () => `
                                    [&>svg]:w-3 sm:[&>svg]:h-3
                                    sm:[&>svg]:w-4 sm:[&>svg]:h-4
                                    md:[&>svg]:w-6 md:[&>svg]:h-6
                                `,
                                }}
                                classNamePrefix="rs"
                            />
                        )}
                    />
                    {errors.skills && (
                        <p className="text-red-500 text-xs md:text-sm">{errors.skills.message}</p>
                    )}
                </div>
            </section>

            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Submit */}
            <section className="flex justify-end">
                <div className="flex gap-3">
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
                        title="Clear Step 1"
                        message="Are you sure you want to remove all fields data? This action cannot be undone."
                        confirmText="Clear"
                        onCancel={() => setConfirmOpen(false)}
                        onConfirm={confirmClear}
                    />

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