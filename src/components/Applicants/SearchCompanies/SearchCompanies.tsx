import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import instance from '../../AxiosConfig/instance.ts'

type Company = {
  _id: string
  name: string
  about: string
  logoUrl: string
  industry: string
  employeesRange: string
  jobCount: number
  [key: string]: any
}

type Pagination = {
  totalCount: number
  totalPages: number
  currentPage: number
  limit: number
}

function SearchCompany() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 4,
  })
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name') || ''
  const location = searchParams.get('location') || ''

  const [industry, setIndustry] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function getCompanies() {
      try {
        let url = '/api/companies'
        const params: string[] = [`page=${currentPage}`, `limit=4`]

        if (name) params.push(`name=${name}`)
        if (location) params.push(`location=${location}`)
        if (industry) params.push(`industry=${industry}`)
        if (companySize) params.push(`companySize=${companySize}`)

        // Use filter endpoint if any filter is active
        if (name || location || industry || companySize) {
          url = `/api/companies/filter?${params.join('&')}`
        } else {
          url = `/api/companies?${params.join('&')}`
        }

        const res = await instance.get(url)
        setCompanies(res.data.data)
        if (res.data.pagination) {
          setPagination(res.data.pagination)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getCompanies()
  }, [name, location, industry, companySize, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [name, location, industry, companySize])

  const handleIndustryFilter = (ind: string) => {
    setIndustry(ind === industry ? '' : ind)
  }

  const handleCompanySizeFilter = (size: string) => {
    setCompanySize(size === companySize ? '' : size)
  }

  const clearFilters = () => {
    setIndustry('')
    setCompanySize('')
    setSearchParams({})
    setCurrentPage(1)
  }

  const handleSearch = () => {
    const params: any = {}
    if (searchName) params.name = searchName
    if (searchLocation) params.location = searchLocation
    setSearchParams(params)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className="bg-[#F8F8FD] w-full">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Find your <span className="text-[#4640DE]">dream companies</span>
            </h1>

            <p className="text-gray-600 text-lg mb-10">
              Find the dream companies you dream work for
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-4xl mx-auto">
              <div className="flex-1 flex items-center gap-3 bg-white border border-gray-300 rounded-md px-4 py-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Company name or keyword"
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>

              <div className="flex-1 flex items-center gap-3 bg-white border border-gray-300 rounded-md px-4 py-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>

              <button
                onClick={handleSearch}
                className="bg-[#4640DE] text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-gray-600">Popular:</span>
              <span
                className="text-gray-700 cursor-pointer hover:text-blue-600"
                onClick={() => setSearchName('Facebook')}
              >
                Facebook,
              </span>
              <span
                className="text-gray-700 cursor-pointer hover:text-blue-600"
                onClick={() => setSearchName('Twitter')}
              >
                Twitter,
              </span>
              <span
                className="text-gray-700 cursor-pointer hover:text-blue-600"
                onClick={() => setSearchName('Apple')}
              >
                Apple,
              </span>
              <span
                className="text-gray-700 cursor-pointer hover:text-blue-600"
                onClick={() => setSearchName('Microsoft')}
              >
                Microsoft
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg border mb-4">
              <h3 className="font-bold mb-3">Industry</h3>
              {[
                'Technology',
                'E-commerce',
                'Entertainment',
                'Travel',
                'Transportation',
                'Finance',
                'Healthcare',
              ].map((ind) => (
                <label
                  key={ind}
                  className="flex items-center mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={industry === ind}
                    onChange={() => handleIndustryFilter(ind)}
                    className="mr-2"
                  />
                  <span
                    className={
                      industry === ind ? 'text-blue-600 font-semibold' : ''
                    }
                  >
                    {ind}
                  </span>
                </label>
              ))}
            </div>

            <div className="bg-white p-4 rounded-lg border mb-4">
              <h3 className="font-bold mb-3">Company Size</h3>
              {[
                { label: '1-50', value: '1-50' },
                { label: '51-150', value: '51-150' },
                { label: '151-250', value: '151-250' },
                { label: '251-500', value: '251-500' },
                { label: '501-1000', value: '501-1000' },
                { label: '1000+ above', value: '1000+' },
              ].map((size) => (
                <label
                  key={size.value}
                  className="flex items-center mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={companySize === size.value}
                    onChange={() => handleCompanySizeFilter(size.value)}
                    className="mr-2"
                  />
                  <span
                    className={
                      companySize === size.value
                        ? 'text-blue-600 font-semibold'
                        : ''
                    }
                  >
                    {size.label}
                  </span>
                </label>
              ))}
            </div>

            {(industry || companySize || name || location) && (
              <button
                onClick={clearFilters}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">All Companies</h2>
                  <p className="text-gray-500">
                    Showing {companies.length} of {pagination.totalCount}{' '}
                    results
                  </p>
                </div>
              </div>

              {(industry || companySize || location) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {industry && (
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {industry}
                    </span>
                  )}
                  {companySize && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      {companySize} employees
                    </span>
                  )}
                  {location && (
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                      📍 {location}
                    </span>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companies.length === 0 ? (
                  <p className="text-gray-500 py-8 text-center col-span-2">
                    No companies found
                  </p>
                ) : (
                  companies.map((company) => (
                    <Link
                      key={company._id}
                      to={`/companies/${company._id}`}
                      className="border border-gray-200 rounded-lg p-6 block hover:border-[#4640DE] hover:shadow-lg transition duration-200 ease-in-out"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={company.logoUrl || '/default-company.png'}
                          alt={company.name}
                          className="w-12 h-12 rounded-lg object-contain"
                        />
                        <div>
                          <h3 className="font-bold text-lg">{company.name}</h3>
                          <p className="text-blue-600 text-sm">
                            {company.jobCount} Jobs
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {company.about || 'No description available'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {company.industry && (
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                            {company.industry}
                          </span>
                        )}
                        {company.employeesRange && (
                          <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                            {company.employeesRange} employees
                          </span>
                        )}
                      </div>
                    </Link>
                  ))
                )}
              </div>

              {/* Pagination */}
              {pagination.totalCount > 0 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  )
                    .filter((page) => {
                      // Show first, last, and pages around current
                      return (
                        page === 1 ||
                        page === pagination.totalPages ||
                        Math.abs(page - currentPage) <= 2
                      )
                    })
                    .map((page, index, arr) => (
                      <span key={page}>
                        {index > 0 && arr[index - 1] !== page - 1 && (
                          <span className="px-2">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 border rounded-lg ${
                            currentPage === page
                              ? 'bg-indigo-600 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      </span>
                    ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchCompany
