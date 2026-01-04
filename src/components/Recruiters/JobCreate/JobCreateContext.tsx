import { createContext, useContext, useEffect, useState, useCallback } from "react";

/* ------------------------------------------
   TYPES
-------------------------------------------*/

export type Step1Data = {
    jobTitle: string;
    jobType: string;
    workplaceModel: string;
    salaryFrom: number;
    salaryTo: number;
    dueDate: Date | string | null;
    categories: string[];
    skills: string[];
};

export type Step2Data = {
    jobDescription: string;
    responsibilities: string[];
    whoYouAre: string[];
    niceToHaves: string[];
};
export interface Benefit {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export type Step3Data = {
    benefits: Benefit[];
};

export type QuestionType = "YES_NO" | "TEXT";
export type Question = {
    id: number;
    type: QuestionType;
    text: string;
};

export type Step4Data = {
    questions: Question[];
};

export interface JobPostData {
    _id?: string;
    companyId?: string;
    step1?: Step1Data;
    step2?: Step2Data;
    step3?: Step3Data;
    step4?: Step4Data;
}

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
    clearAllData: () => void;
    setJobId: (id: string) => void;
    setCompanyId: (id: string) => void;
}

/* ------------------------------------------
   CONTEXT
-------------------------------------------*/
const JobCreateContext = createContext<JobCreateContextType | undefined>(undefined);

/* ------------------------------------------
   PROVIDER
-------------------------------------------*/
export function JobCreateProvider({ children }: { children: React.ReactNode }) {
    const [jobData, setJobData] = useState<JobPostData>(() => {

        // check if there is a draft in progress.
        const saved = localStorage.getItem("job_create_data");
        if (saved) {
            try {
                console.log("➡️ Restoring existing job draft from storage.");
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse job draft:", e);
                return {};
            }
        }
        return {};
    });

    const setJobId = useCallback((id: string) => {
        setJobData((prev) => ({ ...prev, _id: id }));
    }, []);

    const setCompanyId = useCallback((id: string) => {
        setJobData((prev) => ({ ...prev, companyId: id }));
    }, []);

    // On any change on the jobData context
    useEffect(() => {
        if (Object.keys(jobData).length > 0) {
            localStorage.setItem("job_create_data", JSON.stringify(jobData));
        }
    }, [jobData]);

    const updateStep1 = useCallback((data: Step1Data) => {
        setJobData((prev) => ({ ...prev, step1: { ...data } }));
    }, []);

    const updateStep2 = useCallback((data: Step2Data) => {
        setJobData((prev) => ({ ...prev, step2: { ...data } }));
    }, []);

    const updateStep3 = useCallback((data: Step3Data) => {
        setJobData((prev) => ({ ...prev, step3: { ...data } }));
    }, []);

    const updateStep4 = useCallback((data: Step4Data) => {
        setJobData((prev) => ({ ...prev, step4: { ...data } }));
    }, []);

    const clearStep1 = useCallback(() => {
        setJobData((prev) => { const u = { ...prev }; delete u.step1; return u; });
    }, []);
    const clearStep2 = useCallback(() => {
        setJobData((prev) => { const u = { ...prev }; delete u.step2; return u; });
    }, []);
    const clearStep3 = useCallback(() => {
        setJobData((prev) => { const u = { ...prev }; delete u.step3; return u; });
    }, []);
    const clearStep4 = useCallback(() => {
        setJobData((prev) => { const u = { ...prev }; delete u.step4; return u; });
    }, []);

    const clearAllData = useCallback(() => {
        console.log("🗑️ Clearing ALL data");
        setJobData({});
        localStorage.removeItem("job_create_data");
    }, []);

    return (
        <JobCreateContext.Provider
            value={{
                jobData,
                updateStep1, updateStep2, updateStep3, updateStep4,
                clearStep1, clearStep2, clearStep3, clearStep4,
                setJobId, setCompanyId,
                clearAllData
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
        throw new Error("useJobCreateContext must be used inside JobCreateProvider");
    }
    return ctx;
};