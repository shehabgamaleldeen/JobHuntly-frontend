import { type Step1Data, type Step2Data, type Step3Data, type Step4Data } from "../../JobCreateContext";

export const isStep1Filled = (step1: Step1Data | undefined): boolean => {
    //console.log("=== Checking Step1 ===");
    //console.log("step1 data:", step1);

    if (!step1) {
        //console.log("❌ step1 is undefined");
        return false;
    }

    const checks = {
        jobTitle: step1.jobTitle?.trim() !== "",
        categories: Array.isArray(step1.categories) && step1.categories.length > 0,
        skills: Array.isArray(step1.skills) && step1.skills.length > 0,
        salaryFrom: step1.salaryFrom > 0,
        salaryTo: step1.salaryTo > step1.salaryFrom,
        dueDate: step1.dueDate 
        ? new Date(step1.dueDate).getTime() > Date.now() 
        : false,
        jobType: step1.jobType !== "",
        workplaceModel: step1.workplaceModel !== ""
    };

    //console.log("Step1 validation checks:", checks);

    const isValid = Object.values(checks).every(check => check === true);
    //console.log(`Step1 is ${isValid ? "✅ VALID" : "❌ INVALID"}`);

    return isValid;
};

export const isStep2Filled = (step2: Step2Data | undefined): boolean => {
    //console.log("=== Checking Step2 ===");
    //console.log("step2 data:", step2);

    if (!step2) {
        //console.log("❌ step2 is undefined");
        return false;
    }

    const checks = {
        jobDescription: step2.jobDescription?.trim() !== "",
        responsibilities: Array.isArray(step2.responsibilities) &&
            step2.responsibilities.length > 0 &&
            step2.responsibilities.every(r => r?.trim() !== ""),
        whoYouAre: Array.isArray(step2.whoYouAre) &&
            step2.whoYouAre.length > 0 &&
            step2.whoYouAre.every(r => r?.trim() !== ""),
        niceToHaves: Array.isArray(step2.niceToHaves) &&
            step2.niceToHaves.length > 0 &&
            step2.niceToHaves.every(r => r?.trim() !== "")
    };

    //console.log("Step2 validation checks:", checks);

    const isValid = Object.values(checks).every(check => check === true);
    //console.log(`Step2 is ${isValid ? "✅ VALID" : "❌ INVALID"}`);

    return isValid;
};

export const isStep3Filled = (step3: Step3Data | undefined): boolean => {
    //console.log("=== Checking Step3 ===");
    //console.log("step3 data:", step3);

    if (!step3) {
        //console.log("❌ step3 is undefined");
        return false;
    }

    const isValid = Array.isArray(step3.benefits) && step3.benefits.length > 0;
    //console.log(`Step3 is ${isValid ? "✅ VALID" : "❌ INVALID"}`);

    return isValid;
};

export const isStep4Filled = (step4: Step4Data | undefined): boolean => {
    //console.log("=== Checking Step4 ===");
    //console.log("step4 data:", step4);

    if (!step4) {
        //console.log("❌ step4 is undefined");
        return false;
    }

    const isValid = Array.isArray(step4.questions) && step4.questions.length > 0;
    //console.log(`Step4 is ${isValid ? "✅ VALID" : "❌ INVALID"}`);

    return isValid;
};