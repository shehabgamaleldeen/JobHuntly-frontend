// 1. Import the instance (default export) from your local file
import instance from '@/components/AxiosConfig/instance';
import { type JobPostPayload } from '../types/job';

// No need for API_BASE_URL here anymore as it's inside the instance

export const postNewJob = async (payload: JobPostPayload): Promise<any> => {
    // 2. Use axiosInstance instead of axios
    // Notice we only use the relative path '/jobs'
    const response = await instance.post('/jobs', payload);
    return response;
};

export const getSkills = async (): Promise<any> => {
    // 3. The instance already handles the baseURL
    const response = await instance.get('/company/job-create/step-1');
    return response;
};