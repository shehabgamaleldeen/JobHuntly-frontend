import React from 'react';
import { Link } from 'react-router-dom';

export interface JobProps {
  _id: string;
  title: string;
  companyId: {
    name: string;
    logoUrl: string;
    hqCity: string;
    hqCountry: string;
  };
  categories: string[]; // Changed from skillsIds to categories (array of strings)
  employmentType: string;
  workplaceModel: string;
}

function JobCard(props: JobProps) {
  const location = `${props.companyId.hqCity}, ${props.companyId.hqCountry}`;

  return (
    <Link
      to={`/jobs/${props._id}`}
      className="block h-full bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-[#4640DE] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Header: Logo & Job Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
            <img
              src={props.companyId.logoUrl}
              alt={`${props.companyId.name} logo`}
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = `https://placehold.co/100x100/FFFFFF/4640DE?text=${encodeURIComponent(props.companyId.name.charAt(0))}`;
              }}
            />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#4640DE] transition-colors line-clamp-2 leading-tight">
              {props.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              {props.companyId.name}
            </p>
          </div>
        </div>

        {/* Badges: Employment & Workplace */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-lime-50 text-lime-600 border border-lime-200">
            {props.employmentType}
          </span>
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-50 text-green-600 border border-green-200">
            {props.workplaceModel}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{location}</span>
        </div>
      </div>

      {/* Footer: Categories (Blue Tags) */}
      <div className="pt-4 border-t border-gray-100 mt-auto">
        <div className="flex flex-wrap gap-2">
          {props.categories && props.categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-100 transition-colors"
            >
              {category}
            </span>
          ))}
          {props.categories && props.categories.length > 2 && (
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-50 text-gray-500 border border-gray-100">
              +{props.categories.length - 2}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default JobCard;