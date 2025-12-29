import { createContext, useContext, useEffect, useState } from "react";

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
    jobType: "full-time" | "part-time" | "contract" | "internship" | "";
    workplaceModel: "on-site" | "remote" | "hybrid" | "";
    salaryFrom: number;
    salaryTo: number;
    categories: any[];
    skills: any[];
};

// Step 2 fields
export type Step2Data = {
    jobDescription: string;
    responsibilities: string[];
    whoYouAre: string[];
    niceToHaves: string[];
};

// Step 3 fields
export type Step3Data = {
    benefits: Benefit[];
};

// Step 4 fields - Application Questions
export type QuestionType = "YES_NO" | "TEXT";
export type Question = {
    id: number;
    type: QuestionType;
    text: string;
};

export type Step4Data = {
    questions: Question[];
};

// Main combined type
export interface JobPostData {
    step1?: Step1Data;
    step2?: Step2Data;
    step3?: Step3Data;
    step4?: Step4Data;
}

// Context value type
export interface JobCreateContextType {
    jobData: JobPostData;
    updateStep1: (data: Step1Data) => void;
    updateStep2: (data: Step2Data) => void;
    updateStep3: (data: Step3Data) => void;
    updateStep4: (data: Step4Data) => void;
    clearStep1: () => void;
    clearStep2: () => void;
    clearStep3: () => void;
    clearStep4: () => void;
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
    // 1. Initialize state from LocalStorage if it exists
    const [jobData, setJobData] = useState<JobPostData>(() => {
        const saved = localStorage.getItem("job_create_data");
        return saved ? JSON.parse(saved) : {
            step3: { benefits: [] },
            step4: { questions: [] },
        };
    });

    // 2. Sync state to LocalStorage whenever jobData updates
    useEffect(() => {
        localStorage.setItem("job_create_data", JSON.stringify(jobData));

        return () => {
            // cleanup when provider unmounts
            localStorage.removeItem("job_create_data");
            setJobData({})
        };
    }, [jobData]);


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

    const updateStep4 = (data: Step4Data) =>
        setJobData((prev) => ({
            ...prev,
            step4: { ...data },
        }));

    const clearStep1 = () =>
        setJobData((prev) => {
            const updated = { ...prev };
            delete updated.step1;
            return updated;
        });

    const clearStep2 = () =>
        setJobData((prev) => {
            const updated = { ...prev };
            delete updated.step2;
            return updated;
        });

    const clearStep3 = () =>
        setJobData((prev) => {
            const updated = { ...prev };
            delete updated.step3;
            return updated;
        });

    const clearStep4 = () =>
        setJobData((prev) => {
            const updated = { ...prev };
            delete updated.step4;
            return updated;
        });


    return (
        <JobCreateContext.Provider
            value={{
                jobData,
                updateStep1,
                updateStep2,
                updateStep3,
                updateStep4,
                clearStep1,
                clearStep2,
                clearStep3,
                clearStep4
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
