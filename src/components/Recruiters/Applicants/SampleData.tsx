export interface Applicant {
  id: string;
  fullName: string;
  score: number; 
  appliedDate: string;
}

export const sampleApplicants: Applicant[] = [
  { id: "1", fullName: "Alice Johnson", score: 4.5, appliedDate: "2025-11-20" },
  { id: "2", fullName: "Bob Smith", score: 3.8, appliedDate: "2025-11-21" },
  { id: "3", fullName: "Charlie Brown", score: 5, appliedDate: "2025-11-22" },
  { id: "4", fullName: "Diana Prince", score: 4.2, appliedDate: "2025-11-23" },
  { id: "5", fullName: "Ethan Hunt", score: 3.5, appliedDate: "2025-11-24" },
  { id: "6", fullName: "Fiona Gallagher", score: 4.8, appliedDate: "2025-11-25" },
  { id: "7", fullName: "George Michael", score: 4, appliedDate: "2025-11-26" },
  { id: "8", fullName: "Hannah Baker", score: 3.9, appliedDate: "2025-11-27" },
  { id: "9", fullName: "Ian Somerhalder", score: 4.7, appliedDate: "2025-11-28" },
  { id: "10", fullName: "Jane Doe", score: 4.1, appliedDate: "2025-11-29" },
];
