export interface Location {
  name: string; 
  logo?: string;
  code?: string; 
}

export interface Tech {
  name: string; 
  logo?: string;  
}

export interface Images {
  src: string;
}

export interface Job {
  _id: string;
  title: string;
  employmentTypes: string[];
  categories: string[];
  [key: string]: any;
}

export interface Company {
  id: string;
  _id?: string;
  name: string;
  logo: string;
  logoUrl?: string;
  locations: Location[]; 
  website: string;
  industry: string;
  about: string;
  founded: string;
  employees: string;
  linkedin: string;
  facebook?: string;
  twitter?: string;
  techStack: Tech[];
  images: Images[];
  hqCity?: string;
  hqCountry?: string;
  jobs?: Job[];
  jobCount?: number;
}