import instance from '@/components/AxiosConfig/instance';
import { type JobPostPayload } from '../types/job';


export const postNewJob = async (payload: JobPostPayload): Promise<any> => {
    const response = await instance.post('/jobs', payload);
    return response;
};

export const updateJob = async (payload: JobPostPayload): Promise<any> => {
    const jobId = payload._id;
    const response = await instance.patch(`/jobs/${jobId}`, payload);
    return response;
};

export const getSkills = async (): Promise<any> => {
    const response = await instance.get('/skills');
    return response;
};