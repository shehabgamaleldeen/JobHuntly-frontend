import instance from "@/components/AxiosConfig/instance";

export const getJobViewStatistics = async (filter:String): Promise<any> => {
    const response = await instance.get(`/companyDashboard/jobViews?filter=${filter}`);
    return response;
};

export const getJobApplicationStatistics = async (filter:String): Promise<any> => {
    const response = await instance.get(`/companyDashboard/jobApplications?filter=${filter}`);
    return response;
};

export const getNewJobApplicationsCount = async (): Promise<any> => {
    const response = await instance.get(`/companyDashboard/newJobApplications`);
    return response;
};

export const getReviewedJobApplicationsCount = async (): Promise<any> => {
    const response = await instance.get(`/companyDashboard/reviewedJobApplications`);
    return response;
};

export const getOpenJobsCount = async (): Promise<any> => {
    const response = await instance.get(`/companyDashboard/openJobs`);
    return response;
};