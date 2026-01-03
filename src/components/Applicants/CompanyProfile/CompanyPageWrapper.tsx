import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Company } from './Types';
import CompanyPage from './CompanyPage';
import instance from '@/components/AxiosConfig/instance'

function CompanyPageWrapper() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(null);

        const companyId = id || "1";

        const response = await instance.get(`/companies/${companyId}`);
        
        setCompany(response.data.data);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch company");
        }
        console.error("Error fetching company:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Company not found</div>
      </div>
    );
  }

  return <CompanyPage company={company} />;
}

export default CompanyPageWrapper;