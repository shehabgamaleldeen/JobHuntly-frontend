import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputTitle } from "./InputTitle";
import { useJobCreateContext } from "../../JobCreateContext";


type Option = {
    value: string;
    label: string;
};

const categoryOptions: Option[] = [
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
    { value: "design", label: "Design" },
    { value: "software development", label: "Software Development" },
    { value: "information technology", label: "Information Technology" },
    { value: "human resources", label: "Human Resources" },
    { value: "teaching", label: "Teaching" },
];

const requiredSkillsOptions: Option[] = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
    { value: "express", label: "Express.js" },
    { value: "mongodb", label: "MongoDB" },
    { value: "sql", label: "SQL" },
    { value: "git", label: "Git" },
    { value: "problem_solving", label: "Problem Solving" },
    { value: "communication", label: "Communication" },
    { value: "teamwork", label: "Teamwork" },
    { value: "time_management", label: "Time Management" },
    { value: "testing", label: "Unit Testing" },
    { value: "api_design", label: "API Design" },
    { value: "debugging", label: "Debugging" },
    { value: "docker", label: "Docker" },
    { value: "linux", label: "Linux" }
];

export default function Step1() {
    const navigate = useNavigate();
    const { updateStep1 } = useJobCreateContext();

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            jobTitle: "",
            fullTime: false,
            partTime: false,
            remote: false,
            internship: false,
            contract: false,
            salaryFrom: "",
            salaryTo: "",
            categories: [],
            skills: []
        },
        mode: "onChange"
    });

    const atLeastOne = (_: any, allValues: any) =>
        allValues.fullTime ||
        allValues.partTime ||
        allValues.remote ||
        allValues.internship ||
        allValues.contract ||
        "Select at least one job type";


    const onSubmit = (data: any) => {
        console.log("FORM DATA:", data);
        updateStep1(data);
        navigate("/company/job-create/step-2")
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
                        className="text-[11px] sm:text-sm lg:text-base p-4 h-[35px] md:h-3/5 w-10/11 md:w-2/3 border-2 border-[#D6DDEB]"
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

            {/* Job Type Checkboxes */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle title="Job Title" description="Choose a title that best describes the job you are offering" />
                <div className="flex w-1/2 flex-col">
                    <div className="flex items-center pb-2">
                        <input
                            type="checkbox"
                            className="w-[12px] md:w-1/30 h-[12px] md:h-6/7 mr-2 md:mr-4"
                            {...register("fullTime", { validate: atLeastOne })}
                        />
                        <label className="text-[#515B6F] text-sm lg:text-base">
                            Full-Time
                        </label>
                    </div>

                    <div className="flex items-center pb-2">
                        <input type="checkbox" className="w-[12px] md:w-1/30 h-[12px] md:h-6/7 mr-2 md:mr-4"
                            {...register("partTime", { validate: atLeastOne })}
                        />
                        <label className="text-[#515B6F] text-sm lg:text-base">
                            Part-Time
                        </label>
                    </div>

                    <div className="flex items-center pb-2">
                        <input type="checkbox" className="w-[12px] md:w-1/30 h-[12px] md:h-6/7 mr-2 md:mr-4"
                            {...register("remote", { validate: atLeastOne })}
                        />
                        <label className="text-[#515B6F] text-sm lg:text-base">
                            Remote
                        </label>
                    </div>

                    <div className="flex items-center pb-2">
                        <input type="checkbox" className="w-[12px] md:w-1/30 h-[12px] md:h-6/7 mr-2 md:mr-4"
                            {...register("internship", { validate: atLeastOne })}
                        />
                        <label className="text-[#515B6F] text-sm lg:text-base">
                            Internship
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" className="w-[12px] md:w-1/30 h-[12px] md:h-6/7 mr-2 md:mr-4"
                            {...register("contract", { validate: atLeastOne })}
                        />
                        <label className="text-[#515B6F] text-sm lg:text-base">
                            Contract
                        </label>
                    </div>
                    {errors.fullTime && errors.partTime && errors.contract && errors.remote && errors.internship && (
                        <p className="text-red-500 text-xs md:text-sm">{errors.fullTime.message}</p>
                    )}
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
                            className="text-[11px] lg:text-base 
                            w-[70px] sm:w-[120px] md:w-[150px] lg:w-[200px] h-7 md:h-10 p-3 sm:p-4 border-2 border-[#D6DDEB] rounded"
                            {...register("salaryFrom", { required: "Required" })}
                        />
                        {/* reserved error space: show message or a non-breaking space so height stays same */}
                        <p className="text-red-500 text-[11px] sm:text-xs md:text-sm">
                            {errors.salaryFrom ? errors.salaryFrom.message : "\u00A0"}
                        </p>
                    </div>

                    <span className="text-[#515B6F]">-</span>

                    <div>
                        <input
                            type="number"
                            placeholder="To"
                            className="text-[11px] lg:text-base 
                            w-[70px] sm:w-[100px] md:w-[150px] lg:w-[200px] h-7 md:h-10 p-3 sm:p-4 border-2 border-[#D6DDEB] rounded"
                            {...register("salaryTo", {
                                required: "Required",
                                validate: (value) => {
                                    const from = getValues("salaryFrom");
                                    return Number(value) > Number(from) || "Must be greater than 'From'";
                                },
                            })}
                        />

                        {/* same reserved error space for the 'To' input */}
                        <p className="text-red-500 text-[11px] sm:text-xs md:text-sm">
                            {errors.salaryTo ? errors.salaryTo.message : "\u00A0"}
                        </p>
                    </div>
                </div>
            </section>


            <hr className="border-[#D6DDEB] pb-4 md:pb-8" />

            {/* Categories with React-Select */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle
                    title="Categories"
                    description="You can select multiple job categories"
                />
                <div className="flex flex-col w-1/2">
                    <label className="text-[#515B6F] text-base font-normal
                            text-sm
                            lg:text-base">
                        Select Job Categories
                    </label>

                    <Controller
                        control={control}
                        name="categories"
                        rules={{ required: "Select at least one category" }}
                        render={({ field }) => (
                            <Select<Option, true>
                                isMulti
                                options={categoryOptions}
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
                                placeholder="Select Job Categories"
                                className="text-[10px] sm:text-xs lg:text-base w-14/15 sm:w-12/15 md:w-2/3"
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

            {/* Skills */}
            <section className="flex mb-4 md:mb-8">
                <InputTitle
                    title="Required Skills"
                    description="You can select multiple skills"
                />
                <div className="flex flex-col w-1/2">
                    <label className="text-[#515B6F] font-normal
                            text-sm lg:text-base">
                        Select Required Skills
                    </label>

                    <Controller
                        control={control}
                        name="skills"
                        rules={{ required: "Select at least one skill" }}
                        render={({ field }) => (
                            <Select<Option, true>
                                isMulti
                                options={requiredSkillsOptions}
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
                                placeholder="Select Required Skills"
                                className="text-[10px] sm:text-xs lg:text-base w-14/15 sm:w-12/15 md:w-2/3"
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
                <button type="submit" className="
                px-4 md:px-8 py-2 md:py-3 mb-4 md:mb-8
                self-end rounded-md font-medium text-white transition-colors text-sm
                  bg-indigo-600 hover:bg-indigo-700">
                    Next Step
                </button>
            </section>
        </form>
    );
}
