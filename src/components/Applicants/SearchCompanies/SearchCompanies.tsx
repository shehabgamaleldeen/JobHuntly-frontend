import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import instance from '../../AxiosConfig/instance.ts'
import MobileFilterDrawer from '@/components/ui/MobileFilterDrawer.tsx'

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

  // Mobile filter drawer state
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    async function getCompanies() {
      try {
        let url = '/api/companies'
        const params: string[] = [`page=${currentPage}`, `limit=4`]

        if (name) params.push(`name=${name}`)
        if (location) params.push(`location=${location}`)
        if (industry) params.push(`industry=${industry}`)
        if (companySize) params.push(`companySize=${companySize}`)

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

  useEffect(() => {
    setCurrentPage(1)
  }, [name, location, industry, companySize])

  const handleIndustryFilter = (ind: string) => {
    setIndustry(ind === industry ? '' : ind)
    setIsFilterOpen(false)
  }

  const handleCompanySizeFilter = (size: string) => {
    setCompanySize(size === companySize ? '' : size)
    setIsFilterOpen(false)
  }

  const clearFilters = () => {
    setIndustry('')
    setCompanySize('')
    setSearchParams({})
    setCurrentPage(1)
    setIsFilterOpen(false)
  }

  const handleSearch = () => {
    const params: any = {}
    if (searchName) params.name = searchName
    if (searchLocation) params.location = searchLocation
    setSearchParams(params)
  }

  const resultsRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 0);
  }

  const isFiltering = industry || companySize || name || location

  // Filter content component
  const FilterContent = () => (
    <>
      <div className="bg-white p-3 sm:p-4 rounded-lg border mb-3 sm:mb-4">
        <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">Industry</h3>
        {[
          'Technology',
          'Finance',
          'Healthcare',
          'Education',
          'Marketing',
          'Social & Non-Profit',
          'Other',
        ].map((ind) => (
          <label
            key={ind}
            className="flex items-center mb-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={industry === ind}
              onChange={() => handleIndustryFilter(ind)}
              className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span
              className={`text-sm sm:text-base transition-colors ${industry === ind ? 'text-indigo-600 font-semibold' : 'text-gray-600 group-hover:text-indigo-500'
                }`}
            >
              {ind}
            </span>
          </label>
        ))}
      </div>

      <div className="bg-white p-3 sm:p-4 rounded-lg border mb-3 sm:mb-4">
        <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">Company Size</h3>
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
            className="flex items-center mb-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={companySize === size.value}
              onChange={() => handleCompanySizeFilter(size.value)}
              className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span
              className={`text-sm sm:text-base transition-colors ${companySize === size.value
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-600 group-hover:text-indigo-500'
                }`}
            >
              {size.label}
            </span>
          </label>
        ))}
      </div>

      {isFiltering && (
        <button
          onClick={clearFilters}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm sm:text-base font-semibold"
        >
          Clear All Filters
        </button>
      )}
    </>
  )

  return (
    <>
      <section className="bg-[#F8F8FD] w-full">
        <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
              Find your <span className="text-[#4640DE]">dream companies</span>
            </h1>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10">
              Find the dream companies you dream work for
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 max-w-4xl mx-auto">
              <div className="flex-1 flex items-center gap-2 sm:gap-3 bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0"
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
                  className="flex-1 outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>

              <div className="flex-1 flex items-center gap-2 sm:gap-3 bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0"
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
                  className="flex-1 outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400 bg-transparent"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>

              <button
                onClick={handleSearch}
                className="bg-[#4640DE] text-white font-semibold px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap text-sm sm:text-base"
              >
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <span className="text-gray-600">Popular:</span>
              {[
                { name: 'Facebook', display: 'Facebook,' },
                { name: 'Twitter', display: 'Twitter,' },
                { name: 'Apple', display: 'Apple,' },
                { name: 'Microsoft', display: 'Microsoft' }
              ].map((company) => (
                <span
                  key={company.name}
                  className="text-gray-700 cursor-pointer hover:text-blue-600 transition"
                  onClick={() => setSearchName(company.name)}
                >
                  {company.display}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {isFiltering ? `Filters (${(industry ? 1 : 0) + (companySize ? 1 : 0)})` : 'Filters'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterContent />
          </div>

          {/* Mobile Filter Drawer */}
          <MobileFilterDrawer
            open={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            title="Company Filters"
          >
            <FilterContent />
          </MobileFilterDrawer>


          <div className="lg:col-span-3" ref={resultsRef}>
            <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">All Companies</h2>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                    Showing {companies.length} of {pagination.totalCount}{' '}
                    results
                  </p>
                </div>
              </div>

              {(industry || companySize || location) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {industry && (
                    <span className="bg-blue-100 text-blue-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      {industry}
                    </span>
                  )}
                  {companySize && (
                    <span className="bg-green-100 text-green-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      {companySize} employees
                    </span>
                  )}
                  {location && (
                    <span className="bg-purple-100 text-purple-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      📍 {location}
                    </span>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {companies.length === 0 ? (
                  <p className="text-gray-500 py-8 text-center col-span-2 text-sm sm:text-base">
                    No companies found
                  </p>
                ) : (
                  companies.map((company) => (
                    <Link
                      key={company._id}
                      to={`/companies/${company._id}`}
                      className="border border-gray-200 rounded-lg p-4 sm:p-6 block hover:border-[#4640DE] hover:shadow-lg transition duration-200 ease-in-out"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <img
                          src={company.logoUrl || '/default-company.png'}
                          alt={company.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg truncate">{company.name}</h3>
                          <p className="text-blue-600 text-xs sm:text-sm">
                            {company.jobCount} Jobs
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                        {company.about || 'No description available'}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {company.industry && (
                          <span className="bg-blue-100 text-blue-600 px-2 sm:px-3 py-1 rounded-full text-xs">
                            {company.industry}
                          </span>
                        )}
                        {company.employeesRange && (
                          <span className="bg-yellow-100 text-yellow-600 px-2 sm:px-3 py-1 rounded-full text-xs">
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
                <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 sm:mt-8 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 text-xs sm:text-sm"
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  )
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === pagination.totalPages ||
                        Math.abs(page - currentPage) <= 2
                      )
                    })
                    .map((page, index, arr) => (
                      <span key={page}>
                        {index > 0 && arr[index - 1] !== page - 1 && (
                          <span className="px-1 sm:px-2 text-xs sm:text-sm">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm ${currentPage === page
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
                    className="px-3 sm:px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 text-xs sm:text-sm"
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