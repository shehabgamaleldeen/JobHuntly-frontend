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

export const openCloseJob = async (jobId: string): Promise<any> => {
    const response = await instance.patch(`/jobs/${jobId}/live`);
    return response;
};

export const deleteJob = async (jobId: string): Promise<any> => {
    const response = await instance.delete(`/jobs/${jobId}`);
    return response;
};

export const getJobById = async (jobId: String): Promise<any> => {
    const response = await instance.get(`/jobs/${jobId}`);
    return response;
};

export const getSkills = async (): Promise<any> => {
    const response = await instance.get('/skills');
    return response;
};