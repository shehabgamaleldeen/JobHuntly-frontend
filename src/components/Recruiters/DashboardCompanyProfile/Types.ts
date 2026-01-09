export interface Location {
  name: string;
  logo: string;
}
export interface Tech {
  name: string;
  logo: string;
}

export interface Images {
  src: string;
}

export interface Company {
  id: number;
  name: string;
  logoUrl: string;
  backGroundUrl:string;
  locations: Location[];
  website: string;
  industry: string;
  about: string;
  foundedDate: string;
  employeesRange: string;
  // linkedin: string;
  // facebook?: string;
  // twitter?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
  techStack: Tech[];
  images: Images[];
}

export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  level: string;
}
