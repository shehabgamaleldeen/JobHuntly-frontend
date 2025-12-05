
export interface Job {
  id: string;
  role: string;
  datePosted: string;
  dueDate: string;
  jobType: "Full Time" | "Part Time";
  applicants: number;
}

export const sampleJobs: Job[] = [
  { id: "1", role: "Frontend Developer", datePosted: "2025-11-20", dueDate: "2025-12-01", jobType: "Full Time", applicants: 12 },
  { id: "2", role: "Backend Developer", datePosted: "2025-11-25", dueDate: "2025-12-10", jobType: "Full Time", applicants: 8 },
  { id: "3", role: "UI/UX Designer", datePosted: "2025-11-28", dueDate: "2025-12-05", jobType: "Part Time", applicants: 5 },
  { id: "4", role: "Project Manager", datePosted: "2025-11-15", dueDate: "2025-11-30", jobType: "Full Time", applicants: 20 },
  { id: "5", role: "QA Engineer", datePosted: "2025-11-10", dueDate: "2025-12-15", jobType: "Full Time", applicants: 10 },
  { id: "6", role: "DevOps Engineer", datePosted: "2025-11-12", dueDate: "2025-12-12", jobType: "Full Time", applicants: 7 },
  { id: "7", role: "Frontend Developer", datePosted: "2025-11-20", dueDate: "2025-12-01", jobType: "Full Time", applicants: 12 },
  { id: "8", role: "Backend Developer", datePosted: "2025-11-25", dueDate: "2025-12-10", jobType: "Full Time", applicants: 8 },
  { id: "9", role: "UI/UX Designer", datePosted: "2025-11-28", dueDate: "2025-12-05", jobType: "Part Time", applicants: 5 },
  { id: "10", role: "Project Manager", datePosted: "2025-11-15", dueDate: "2025-11-30", jobType: "Full Time", applicants: 20 },
  { id: "11", role: "QA Engineer", datePosted: "2025-11-10", dueDate: "2025-12-15", jobType: "Full Time", applicants: 10 },
  { id: "12", role: "DevOps Engineer", datePosted: "2025-11-12", dueDate: "2025-12-12", jobType: "Full Time", applicants: 7 },
];

