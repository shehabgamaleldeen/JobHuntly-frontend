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
    _id?:string,
    companyId?: string;
    title: string;
    employmentType: string;
    workplaceModel: string;
    salaryMin: number;
    salaryMax: number;
    salaryCurrency: string;
    categories: string[];
    skillsIds: string[];
    postDate:Date;
    // dueDate: Date;
    description: string;
    responsibilities: string[];
    whoYouAre: string[];
    niceToHaves: string[];
    questions?: Question[];
    benefits?: JobBenefit[];
    isLive?: boolean;
}