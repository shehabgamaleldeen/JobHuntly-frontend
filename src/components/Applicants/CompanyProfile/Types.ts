export interface Country {
  code: string;
  name: string;
}
export interface Tech {
  name: string;
  logo: string;
}

export interface Images {
  src: string;
}

export interface Company {
  _id: string;
  name: string;
  logoUrl: string;
  countries: Country[];
  website: string;
  industry: string;
  about: string;
  foundedDate: string;
  employeesRange: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
    website?: string;
  };
  techStack: Tech[];
  images: Images[];
}

// export interface Job {
//   id: number;
//   title: string;
//   location: string;
//   type: string;
//   level: string;
// }
