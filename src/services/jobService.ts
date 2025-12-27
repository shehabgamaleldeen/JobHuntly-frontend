import axios from 'axios';
import { type JobPostPayload } from '../types/job';

const API_BASE_URL = 'http://localhost:3000';

export const postNewJob = async (payload: JobPostPayload): Promise<any> => {
    // Replace with your actual auth logic
    const token = localStorage.getItem('token'); 
    
    const response = await axios.post(`${API_BASE_URL}/jobs`, payload, {
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`
        }
    });
    return response;
};

export const getSkills = async (): Promise<any> => {
    // Replace with your actual auth logic
    const token = localStorage.getItem('token'); 
    
    const response = await axios.get(`${API_BASE_URL}/company/job-create/step-1`, {
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`
        }
    });
    return response;
};