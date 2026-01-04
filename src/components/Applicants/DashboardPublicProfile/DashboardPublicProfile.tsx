// src/pages/ProfileView/ProfileView.tsx
// صفحة عرض Profile بدون أزرار تعديل - للعرض العام فقط
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Github, 
  ExternalLink,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import Loader from '@/components/Basic/Loader';
import instance from '@/components/AxiosConfig/instance';
import { PageHeader } from '../DashboardSettings/headParts/headerPart';

interface Language {
  name: string;
  level: string;
  _id: string;
}

interface Experience {
  jobTitle: string;
  companyName: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description: string;
  _id: string;
}

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  _id: string;
}

interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

interface Skill {
  _id: string;
  name: string;
  seekerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProfileData {
  user: {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
    role: string;
    lastLoginAt: string;
  };
  profile: {
    headline?: string;
    currentJobTitle?: string;
    locationCity?: string;
    locationCountry?: string;
    aboutMe?: string;
    experienceYears?: number;
    openForOpportunities?: boolean;
    skills: Skill[];
    languages: Language[];
    socialLinks: SocialLinks;
    experiences: Experience[];
    educations: Education[];
    portfolioUrl?: string;
    avatarUrl?: string;
  };
}

const ProfileView: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showAllEducations, setShowAllEducations] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await instance.get('/settings/getProfile');
      if (response.data.success) {
        setProfileData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (startDate: string, endDate?: string, currentlyWorking?: boolean) => {
    const start = new Date(startDate);
    const end = currentlyWorking ? new Date() : new Date(endDate || '');
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years}y ${remainingMonths}m`;
    } else if (years > 0) {
      return `${years}y`;
    } else {
      return `${remainingMonths}m`;
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">No profile data available</div>
      </div>
    );
  }

  const { user, profile } = profileData;
  const visibleExperiences = profile.experiences && profile.experiences.length > 0 
    ? (showAllExperiences ? profile.experiences : profile.experiences.slice(0, 2))
    : [];
  const visibleEducations = profile.educations && profile.educations.length > 0
    ? (showAllEducations ? profile.educations : profile.educations.slice(0, 2))
    : [];

  return (
    
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Banner */}
              <div className="h-32 bg-gradient-to-r from-pink-200 via-purple-300 to-purple-600"></div>

              <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-white flex items-center justify-center overflow-hidden">
                    {profile.avatarUrl ? (
                      <img src={profile.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-white">
                        {user.fullName.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name and Title */}
                <div className="mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.fullName}</h1>
                  {(profile.currentJobTitle || profile.headline) && (
                    <p className="text-gray-600 mb-2">
                      {profile.currentJobTitle || profile.headline}
                      {profile.experiences && profile.experiences.length > 0 && profile.experiences[0].companyName && 
                        ` at ${profile.experiences[0].companyName}`
                      }
                    </p>
                  )}
                  {(profile.locationCity || profile.locationCountry) && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {[profile.locationCity, profile.locationCountry].filter(Boolean).join(', ')}
                    </div>
                  )}
                </div>

                {/* Open for Opportunities Badge */}
                {profile.openForOpportunities && (
                  <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                    <Briefcase className="w-4 h-4 mr-2" />
                    OPEN FOR OPPORTUNITIES
                  </div>
                )}
              </div>
            </div>

            {/* About Me */}
            {profile.aboutMe && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {profile.aboutMe}
                </p>
                {profile.experienceYears && (
                  <p className="text-gray-600 mt-4">
                    {profile.experienceYears} years of experience in this field
                  </p>
                )}
              </div>
            )}

            {/* Experiences */}
            {profile.experiences && profile.experiences.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Experiences</h2>

                <div className="space-y-6">
                  {visibleExperiences.map((exp) => (
                    <div key={exp._id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900 text-lg">{exp.jobTitle}</h3>
                        <p className="text-gray-600">
                          {exp.companyName} • {exp.employmentType} • {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate!)} ({calculateDuration(exp.startDate, exp.endDate, exp.currentlyWorking)})
                        </p>
                        <p className="text-gray-500 text-sm">{exp.location}</p>
                        {exp.description && (
                          <p className="text-gray-600 mt-2">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {profile.experiences.length > 2 && (
                  <button
                    onClick={() => setShowAllExperiences(!showAllExperiences)}
                    className="mt-6 w-full text-center text-indigo-600 font-medium hover:text-indigo-700 transition"
                  >
                    {showAllExperiences ? 'Show Less' : `Show ${profile.experiences.length - 2} more experiences`}
                  </button>
                )}
              </div>
            )}

            {/* Educations */}
            {profile.educations && profile.educations.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Educations</h2>

                <div className="space-y-6">
                  {visibleEducations.map((edu) => (
                    <div key={edu._id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900 text-lg">{edu.institution}</h3>
                        <p className="text-gray-600">{edu.degree}, {edu.fieldOfStudy}</p>
                        <p className="text-gray-500 text-sm">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {profile.educations.length > 2 && (
                  <button
                    onClick={() => setShowAllEducations(!showAllEducations)}
                    className="mt-6 w-full text-center text-indigo-600 font-medium hover:text-indigo-700 transition"
                  >
                    {showAllEducations ? 'Show Less' : `Show ${profile.educations.length - 2} more educations`}
                  </button>
                )}
              </div>
            )}

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill._id}
                      className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Additional Details */}
          <div className="space-y-6">
            {/* Additional Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Additional Details</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>

                {user.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Languages</p>
                    <p className="text-gray-900">
                      {profile.languages && profile.languages.length > 0
                        ? profile.languages.map(lang => `${lang.name} (${lang.level})`).join(', ')
                        : 'Not specified'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {(profile?.socialLinks?.linkedin || profile?.socialLinks?.github || profile?.portfolioUrl || profile?.socialLinks?.twitter || profile?.socialLinks?.website) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Social Links</h2>

                <div className="space-y-3">
                  {profile.socialLinks.linkedin && (
                    <a
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition group"
                    >
                      <Linkedin className="w-5 h-5 text-gray-400" />
                      <div className="flex-grow">
                        <p className="text-sm text-gray-500">LinkedIn</p>
                        <p className="text-indigo-600 group-hover:text-indigo-700">
                          {profile.socialLinks.linkedin.replace('https://', '')}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  )}

                  {profile.socialLinks.github && (
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition group"
                    >
                      <Github className="w-5 h-5 text-gray-400" />
                      <div className="flex-grow">
                        <p className="text-sm text-gray-500">GitHub</p>
                        <p className="text-indigo-600 group-hover:text-indigo-700">
                          {profile.socialLinks.github.replace('https://', '')}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  )}

                  {profile.portfolioUrl && (
                    <a
                      href={profile.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition group"
                    >
                      <Globe className="w-5 h-5 text-gray-400" />
                      <div className="flex-grow">
                        <p className="text-sm text-gray-500">Website</p>
                        <p className="text-indigo-600 group-hover:text-indigo-700">
                          {profile.portfolioUrl.replace('https://', '')}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;