import { createContext, useContext, useEffect, useState, useCallback } from "react";

/* ------------------------------------------
   TYPES
-------------------------------------------*/

export type Step1Data = {
    jobTitle: string;
    jobType: "Full-Time" | "Part-Time" | "Contract" | "Internship" | "";
    workplaceModel: "On-Site" | "Remote" | "Hybrid" | "";
    salaryFrom: number;
    salaryTo: number;
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
        // 1. Get Navigation Type (Reload, Back, Forward, or New Entry)
        const perfEntries = window.performance.getEntriesByType("navigation");
        let navType = "navigate"; // default

        if (perfEntries.length > 0) {
            const navEntry = perfEntries[0] as PerformanceNavigationTiming;
            navType = navEntry.type;
        }

        // ---------------------------------------------------------
        // CASE A: Page Reload or History Traversal (Back/Forward)
        // ---------------------------------------------------------
        // Always keep data. The user is just refreshing or moving through history.
        if (navType === "reload" || navType === "back_forward") {
            console.log("🔄 Reload or History detected. Keeping data.");
            const saved = localStorage.getItem("job_create_data");
            return saved ? JSON.parse(saved) : {};
        }

        // ---------------------------------------------------------
        // CASE B: Fresh Navigation (Link Click or Manual URL)
        // ---------------------------------------------------------
        const currentPath = window.location.pathname;

        // If the user enters specifically at "Step 1", treat it as a NEW session.
        // This solves the issue: clicking "Create Job" from Dashboard -> Step 1 -> Wipes Data.
        if (currentPath.includes("/step-1")) {
            console.log("🆕 New Entry at Step 1. Clearing old draft.");
            localStorage.removeItem("job_create_data");
            return {};
        }

        // If the user enters at Step 2, 3, or 4 directly (e.g., typed URL),
        // we assume they are trying to RESUME an existing draft.
        console.log("➡️ Deep link entry (Step 2+). Trying to restore draft.");
        const saved = localStorage.getItem("job_create_data");
        return saved ? JSON.parse(saved) : {};
    });

    // ... Rest of your useEffect and update functions ...
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