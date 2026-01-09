import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import FindJobContent from './FindJobContent'
import instance from '../../AxiosConfig/instance'
import JopCard from '../Jop/JopCard'
import MobileFilterDrawer from '@/components/ui/MobileFilterDrawer'

type Job = {
  _id: string
  [key: string]: any
}

type Pagination = {
  totalCount: number
  totalPages: number
  currentPage: number
  limit: number
}

function FindJobs() {
  const [jops, setjops] = useState<Job[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 5
  })

  const [searchParams, setSearchParams] = useSearchParams()

  const titleParam = searchParams.get('title') || ''
  const locationParam = searchParams.get('location') || ''

  const [employmentTypes, setEmploymentTypes] = useState<string[]>([])
  const [workplaceModels, setWorkplaceModels] = useState<string[]>([])
  const [category, setCategory] = useState<string[]>([])

  const [tempMin, setTempMin] = useState<string>('');
  const [tempMax, setTempMax] = useState<string>('');

  const [salaryError, setSalaryError] = useState<string>('');

  const [appliedMin, setAppliedMin] = useState<string>('');
  const [appliedMax, setAppliedMax] = useState<string>('');

  const [currentPage, setCurrentPage] = useState(1)

  const [searchTitle, setSearchTitle] = useState(titleParam)
  const [searchLocation, setSearchLocation] = useState(locationParam)

  // Mobile filter drawer state
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    setSearchTitle(titleParam)
    setSearchLocation(locationParam)
  }, [titleParam, locationParam])

  useEffect(() => {
    async function getJobs() {
      try {
        const params: string[] = [`page=${currentPage}`, `limit=5`]

        if (titleParam) params.push(`title=${titleParam}`)
        if (locationParam) params.push(`location=${locationParam}`)
        if (employmentTypes.length > 0) params.push(`employmentType=${employmentTypes.join(',')}`)
        if (workplaceModels.length > 0) params.push(`workplaceModel=${workplaceModels.join(',')}`)
        if (category.length > 0) params.push(`category=${category.join(',')}`)

        if (appliedMin) params.push(`salaryMin=${appliedMin}`);
        if (appliedMax) params.push(`salaryMax=${appliedMax}`);

        const hasFilters = titleParam || locationParam || employmentTypes.length > 0 ||
          workplaceModels.length > 0 || category.length > 0 ||
          appliedMin || appliedMax;

        const endpoint = hasFilters ? '/api/filter' : '/api/jobs'
        const url = `${endpoint}?${params.join('&')}`

        const res = await instance.get(url)
        setjops(res.data.data)
        if (res.data.pagination) {
          setPagination(res.data.pagination)
        }

      } catch (err) {
        console.log("Fetch error:", err)
      }
    }

    getJobs()
  }, [titleParam, locationParam, employmentTypes, workplaceModels, category, appliedMin, appliedMax, currentPage])

  const handleApplySalary = () => {
    const min = parseFloat(tempMin);
    const max = parseFloat(tempMax);

    setSalaryError('');

    if (min < 0 || max < 0) {
      setSalaryError("Salary cannot be negative");
      return;
    }

    if (tempMin && tempMax && min > max) {
      setSalaryError("Min must be less than Max");
      return;
    }

    setAppliedMin(tempMin);
    setAppliedMax(tempMax);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    setCurrentPage(1)
  }, [titleParam, locationParam, employmentTypes, workplaceModels, category, appliedMin, appliedMax])

  const handleSearch = (overrides?: { title?: string, location?: string }) => {
    const params: any = {}
    const finalTitle = overrides?.title !== undefined ? overrides.title : searchTitle
    const finalLocation = overrides?.location !== undefined ? overrides.location : searchLocation

    if (finalTitle) params.title = finalTitle
    if (finalLocation) params.location = finalLocation

    setSearchParams(params)
    setCurrentPage(1)
  }

  const handleEmploymentTypesFilter = (type: string) => {
    setEmploymentTypes(prev => prev.includes(type) ? prev.filter(c => c !== type) : [...prev, type])
  }

  const handleWorkplaceModelsFilter = (type: string) => {
    setWorkplaceModels(prev => prev.includes(type) ? prev.filter(c => c !== type) : [...prev, type])
  }

  const handleCategoryFilter = (cat: string) => {
    setCategory(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  const clearFilters = () => {
    setEmploymentTypes([])
    setWorkplaceModels([])
    setCategory([])
    setTempMin('');
    setTempMax('');
    setSalaryError('');
    setAppliedMin('');
    setAppliedMax('');
    setSearchParams({})
    setCurrentPage(1)
    setSearchTitle('')
    setSearchLocation('')
    setIsFilterOpen(false)
  }

  const resultsRef = useRef<HTMLDivElement>(null);

  const isFiltering =
    titleParam
    || locationParam
    || employmentTypes.length > 0
    || workplaceModels.length > 0
    || category.length > 0
    || appliedMin
    || appliedMax

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

  // Filter content component to avoid duplication
  const FilterContent = () => (
    <>
      {/* Employment Type */}
      <div className="bg-white p-3 sm:p-4 rounded-lg border mb-3 sm:mb-4">
        <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-sm sm:text-base">Employment Type</h3>
        {['Full-Time', 'Part-Time', 'Internship', 'Contract'].map((type) => (
          <label key={type} className="flex items-center mb-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={employmentTypes.includes(type)}
              onChange={() => handleEmploymentTypesFilter(type)}
              className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className={`transition-colors text-sm sm:text-base ${employmentTypes.includes(type) ? 'text-indigo-600 font-bold' : 'text-gray-600 group-hover:text-indigo-500'}`}>
              {type}
            </span>
          </label>
        ))}
      </div>

      {/* Workplace Model */}
      <div className="bg-white p-3 sm:p-4 rounded-lg border mb-3 sm:mb-4">
        <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-sm sm:text-base">Workplace Model</h3>
        {['On-Site', 'Remote', 'Hybrid'].map((type) => (
          <label key={type} className="flex items-center mb-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={workplaceModels.includes(type)}
              onChange={() => handleWorkplaceModelsFilter(type)}
              className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className={`transition-colors text-sm sm:text-base ${workplaceModels.includes(type) ? 'text-indigo-600 font-bold' : 'text-gray-600 group-hover:text-indigo-500'}`}>
              {type}
            </span>
          </label>
        ))}
      </div>

      {/* Categories */}
      <div className="bg-white p-3 sm:p-4 rounded-lg border mb-3 sm:mb-4">
        <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-sm sm:text-base">Categories</h3>
        {['Design', 'Sales', 'Marketing', 'Business', 'Human Resource', 'Engineering', 'Technology'].map((cat) => (
          <label key={cat} className="flex items-center mb-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={category.includes(cat)}
              onChange={() => handleCategoryFilter(cat)}
              className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className={`transition-colors text-sm sm:text-base ${category.includes(cat) ? 'text-indigo-600 font-bold' : 'text-gray-600 group-hover:text-indigo-500'}`}>
              {cat}
            </span>
          </label>
        ))}
      </div>

      {/* Salary Range */}
      <div className="bg-white p-3 sm:p-4 rounded-lg border mb-3 sm:mb-4 shadow-sm">
        <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-sm sm:text-base">Monthly Salary (EGP)</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={tempMin}
                onKeyDown={handleKeyDown}
                onChange={(e) => setTempMin(e.target.value)}
                className={`w-full border rounded-md px-2 py-2 text-sm outline-none transition ${salaryError ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  }`}
              />
            </div>
            <span className="text-gray-400">-</span>
            <div className="relative flex-1">
              <input
                type="number"
                min="0"
                placeholder="Max"
                value={tempMax}
                onKeyDown={handleKeyDown}
                onChange={(e) => setTempMax(e.target.value)}
                className={`w-full border rounded-md px-2 py-2 text-sm outline-none transition ${salaryError ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  }`}
              />
            </div>
          </div>

          {salaryError && (
            <p className="text-red-500 text-xs font-medium animate-pulse">
              {salaryError}
            </p>
          )}

          <button
            type="button"
            onClick={handleApplySalary}
            className="w-full py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Apply
          </button>
        </div>
      </div>

      {isFiltering && (
        <button
          type="button"
          onClick={clearFilters}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 font-semibold shadow-sm text-sm sm:text-base"
        >
          Clear All Filters
        </button>
      )}
    </>
  )

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isFilterOpen])


  return (
    <>
      <FindJobContent
        title="Find Your"
        highlightText="dream job"
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        handleSearch={handleSearch}
      />
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
            {isFiltering ? `Filters (${employmentTypes.length + workplaceModels.length + category.length + (appliedMin ? 1 : 0) + (appliedMax ? 1 : 0)})` : 'Filters'}
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
            title="Job Filters"
          >
            <FilterContent />
          </MobileFilterDrawer>

          <div className="lg:col-span-3 scroll-mt-10" ref={resultsRef}>
            <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {isFiltering ? `Results (${pagination.totalCount})` : `All Jobs (${pagination.totalCount})`}
              </h2>

              {/* Badges for active filters */}
              {isFiltering && (
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {employmentTypes.map(c => <span key={c} className="bg-lime-50 text-lime-600 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-lime-100">{c}</span>)}
                  {workplaceModels.map(c => <span key={c} className="bg-green-50 text-green-600 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-green-100">{c}</span>)}
                  {category.map(c => <span key={c} className="bg-blue-50 text-blue-600 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-blue-100">{c}</span>)}
                </div>
              )}

              <div>
                {jops.length === 0 ? (
                  <div className="text-center py-12 sm:py-20">
                    <p className="text-gray-400 text-base sm:text-lg">No jobs found matching your criteria.</p>
                  </div>
                ) : (
                  jops.map((job) => <JopCard key={job._id} jop={job} />)
                )}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 sm:mt-10 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm border rounded-md disabled:opacity-30 hover:bg-gray-50 transition"
                  >
                    Prev
                  </button>
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-xs sm:text-sm transition ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50 border'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm border rounded-md disabled:opacity-30 hover:bg-gray-50 transition"
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

export default FindJobs