import { useEffect, useState } from 'react';
import type { Company } from './Types';
import instance from '@/components/AxiosConfig/instance';
import Loader from '@/components/Basic/Loader';
import CompanyRecruiterPage from './CompanyRecruiterPage';

function CompanyPageRecruiterWrapper() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await instance.get('/settings/getProfileRecruiter');

      if (response.data.success) {
        const { user, profile } = response.data.data;

        // Transform API data to match Company interface
        const transformedCompany: Company = {
          _id: user._id,
          name: profile.name || user.fullName,
          logoUrl: profile.logoUrl || '',
          website: profile.website || '',
          industry: profile.industry || '',
          about: profile.about || '',
          foundedDate: profile.foundedDate || '',
          employeesRange: profile.employeesRange || '',
          hqCountry: profile.hqCountry || '',
          countries: profile.countries || [],
          socialLinks: profile.socialLinks || {},
          techStack: profile.techStack || [],
          images: profile.images || [],
        };

        setCompany(transformedCompany);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch company profile';
      setError(errorMessage);
      console.error('Error fetching company:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-red-500 mb-4">Error: {error}</div>
          <button
            onClick={fetchCompany}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Company profile not found</div>
      </div>
    );
  }

  return <CompanyRecruiterPage company={company} />;
}

export default CompanyPageRecruiterWrapper;