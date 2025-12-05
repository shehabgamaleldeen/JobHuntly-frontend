import { createContext, useContext, useState } from "react";

/* ------------------------------------------
   TYPES
-------------------------------------------*/

// Benefit type for Step 3
export interface Benefit {
    id: number;
    icon: string;
    title: string;
    description: string;
}

// Step 1 fields
export type Step1Data = {
    jobTitle: string;
    fullTime: boolean;
    partTime: boolean;
    remote: boolean;
    internship: boolean;
    contract: boolean;
    salaryFrom: string;
    salaryTo: string;
    categories: any[]; // Replace with your Category type
    skills: any[];     // Replace with your Skill type
};

// Step 2 fields
export type Step2Data = {
    jobDescription: string;
    responsibilities: string;
    whoYouAre: string;
    niceToHaves: string;
};

// Step 3 fields
export type Step3Data = {
    benefits: Benefit[];
};

// Main combined type
export interface JobPostData {
    step1?: Step1Data;
    step2?: Step2Data;
    step3: Step3Data; // Always initialized
}

// Context value type
export interface JobCreateContextType {
    jobData: JobPostData;
    updateStep1: (data: Step1Data) => void;
    updateStep2: (data: Step2Data) => void;
    updateStep3: (data: Step3Data) => void;
}

/* ------------------------------------------
   CONTEXT
-------------------------------------------*/

const JobCreateContext = createContext<JobCreateContextType | undefined>(
    undefined
);

/* ------------------------------------------
   PROVIDER
-------------------------------------------*/

export function JobCreateProvider({ children }: { children: React.ReactNode }) {
    const [jobData, setJobData] = useState<JobPostData>({
        step3: { benefits: [] }, // Default so it's never undefined
    });

    const updateStep1 = (data: Step1Data) =>
        setJobData((prev) => ({
            ...prev,
            step1: { ...data },
        }));

    const updateStep2 = (data: Step2Data) =>
        setJobData((prev) => ({
            ...prev,
            step2: { ...data },
        }));

    const updateStep3 = (data: Step3Data) =>
        setJobData((prev) => ({
            ...prev,
            step3: { ...data }, // replaces benefits completely
        }));

    return (
        <JobCreateContext.Provider
            value={{
                jobData,
                updateStep1,
                updateStep2,
                updateStep3,
            }}
        >
            {children}
        </JobCreateContext.Provider>
    );
}

/* ------------------------------------------
   HOOK
-------------------------------------------*/

export const useJobCreateContext = (): JobCreateContextType => {
    const ctx = useContext(JobCreateContext);
    if (!ctx) {
        throw new Error(
            "useJobCreateContext must be used inside JobCreateProvider"
        );
    }
    return ctx;
};
