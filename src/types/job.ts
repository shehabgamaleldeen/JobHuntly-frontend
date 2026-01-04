export type QuestionType = "YES_NO" | "TEXT";
export type Question = {
    questionText: string;
    type: QuestionType;
};

export interface JobBenefit {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export interface JobPostPayload {
    _id?: string,
    companyId?: string;
    title: string;
    employmentType: string;
    workplaceModel: string;
    salaryMin: number;
    salaryMax: number;
    salaryCurrency: string;
    categories: string[];
    skillsIds: string[];
    dueDate: Date | string | undefined;
    description: string;
    responsibilities: string[];
    whoYouAre: string[];
    niceToHaves: string[];
    questions?: Question[];
    benefits?: JobBenefit[];
    isLive?: boolean;
}

export const toLocalISOString = (date: Date) => {
    if (!date) return "";
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
    return localISOTime;
};

export const toLocalISOStringFromDb = (date: any) => {
    if (!date) return "";
    const targetDate = new Date(date);
    // Adjust for the user's timezone offset
    const tzOffset = targetDate.getTimezoneOffset() * 60000;
    return new Date(targetDate.getTime() - tzOffset).toISOString().slice(0, 16);
};