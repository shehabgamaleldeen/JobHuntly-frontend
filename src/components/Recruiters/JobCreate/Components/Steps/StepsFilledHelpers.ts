// src/JobCreateHelpers.ts
import { type Step1Data, type Step2Data, type Step3Data, type Step4Data } from "../../JobCreateContext";

export const isStep1Filled = (step1: Step1Data | undefined) => {
    if (!step1) return false;
    return (
        step1.jobTitle.trim() !== "" &&
        step1.categories.length > 0 &&
        step1.skills.length > 0 &&              // add skills validation
        step1.salaryFrom > 0 &&
        step1.salaryTo > step1.salaryFrom &&
        step1.jobType !== "" &&
        step1.workplaceModel !== ""
    );
};

export const isStep2Filled = (step2: Step2Data | undefined) => {
    if (!step2) return false;
    return (
        step2.jobDescription.trim() !== "" &&
        step2.responsibilities.length > 0 &&
        step2.responsibilities.every(r => r.trim() !== "") &&
        step2.whoYouAre.length > 0 &&
        step2.whoYouAre.every(r => r.trim() !== "") &&
        step2.niceToHaves.every(r => r.trim() !== "")
    );
};

export const isStep3Filled = (step3: Step3Data | undefined) => {
    if (!step3) return false;
    return step3.benefits.length > 0;
};

export const isStep4Filled = (step4: Step4Data | undefined) => {
    if (!step4) return false;
    return step4.questions.length > 0;
};

