import type { Company } from './Types';
import CompanyPath from './CompanyHeader/CompanyPath';
import CompanyStats from './CompanyHeader/CompanyStats';
import CompanyProfileSection from './CompanySections/CompanyProfileSection';
import ContactSection from './CompanySections/ContactSection';
import TechStackSection from './CompanySections/TechStackSection';
// import OfficeLocationSection from './CompanySections/OfficeLocationSection';
import CompanyImagesSection from './CompanySections/CompanyImages';

interface Props {
  company: Company & { jobCount?: number };
}

function CompanyPage({ company }: Props) {
  return (
    <div className="bg-white w-full flex flex-col">
      <div
        className="w-full"
        style={{
          background :"#F8F8FD" ,
          paddingTop: "40px",
          paddingBottom: "80px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <CompanyPath companyName={company.name} />
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <img
              src={company.logoUrl}
              alt={company.name}
              className="w-32 h-32 md:w-44 md:h-44 rounded-lg object-cover"
            />

            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 overflow-hidden">
                  {company.name}
                </h1>

                {/* <span className="text-xs border text-[#4640de] bg-[#F8F8FD] px-3 py-1 rounded">
                  {company.jobCount} Jobs
                </span> */}
              </div>

              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm block break-all"
              >
                {company.website}
              </a>

              <div className="flex justify-center md:justify-start">
                <CompanyStats
                  founded={company.foundedDate?.split("T")[0]}
                  employees={company.employeesRange}
                  location={company?.hqCountry}
                  industry={company.industry}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <CompanyProfileSection company={company} />

            {company.images && company.images.length > 0 && (
              <CompanyImagesSection images={company.images} />
            )}


            {/* <ContactSection company={company} /> */}
          </div>

          <div className="flex flex-col gap-10">
            <div className="border-b border-gray-300">
              {company.techStack && company.techStack.length > 0 && (
                <TechStackSection tech={company.techStack} />
              )}
            </div>

            {/* {company.countries?.length > 0 && (
              <OfficeLocationSection countries={company.countries} />
            )} */}
             <ContactSection company={company} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyPage;
