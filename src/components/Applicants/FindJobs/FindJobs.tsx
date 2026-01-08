import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import FindJobContent from './FindJobContent'
import instance from '../../AxiosConfig/instance'
import JopCard from '../Jop/JopCard'

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

  // Applied state that triggers the useEffect
  const [appliedMin, setAppliedMin] = useState<string>('');
  const [appliedMax, setAppliedMax] = useState<string>('');

  const [currentPage, setCurrentPage] = useState(1)

  const [searchTitle, setSearchTitle] = useState(titleParam)
  const [searchLocation, setSearchLocation] = useState(locationParam)

  useEffect(() => {
    setSearchTitle(titleParam)
    setSearchLocation(locationParam)
  }, [titleParam, locationParam])

  // --- Fetch Data ---
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

    // Validation Logic
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
    handlePageChange(1)
  };

  // Prevent typing '-' character
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    setCurrentPage(1)
  }, [titleParam, locationParam, employmentTypes, workplaceModels, category, appliedMin, appliedMax])

  // --- Handlers ---
  const handleSearch = (overrides?: { title?: string, location?: string }) => {
    const params: any = {}
    const finalTitle = overrides?.title !== undefined ? overrides.title : searchTitle
    const finalLocation = overrides?.location !== undefined ? overrides.location : searchLocation

    if (finalTitle) params.title = finalTitle
    if (finalLocation) params.location = finalLocation

    setSearchParams(params)
    setCurrentPage(1)
    handlePageChange(1)
  }

  const handleEmploymentTypesFilter = (type: string) => {
    setEmploymentTypes(prev => prev.includes(type) ? prev.filter(c => c !== type) : [...prev, type])
    handlePageChange(1)
  }

  const handleWorkplaceModelsFilter = (type: string) => {
    setWorkplaceModels(prev => prev.includes(type) ? prev.filter(c => c !== type) : [...prev, type])
    handlePageChange(1)
  }

  const handleCategoryFilter = (cat: string) => {
    setCategory(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
    handlePageChange(1)
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
    handlePageChange(1)
  }

  // For Scrolling to the Top of the results element
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

  const isFiltering =
    titleParam
    || locationParam
    || employmentTypes.length > 0
    || workplaceModels.length > 0
    || category.length > 0
    || appliedMin
    || appliedMax
    
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">

            {/* Employment Type */}
            <div className="bg-white p-4 rounded-lg border mb-4">
              <h3 className="font-bold mb-3 text-gray-800">Employment Type</h3>
              {['Full-Time', 'Part-Time', 'Internship', 'Contract'].map((type) => (
                <label key={type} className="flex items-center mb-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={employmentTypes.includes(type)}
                    onChange={() => handleEmploymentTypesFilter(type)}
                    className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className={`transition-colors ${employmentTypes.includes(type) ? 'text-indigo-600 font-bold' : 'text-gray-600 group-hover:text-indigo-500'}`}>
                    {type}
                  </span>
                </label>
              ))}
            </div>

            {/* Workplace Model */}
            <div className="bg-white p-4 rounded-lg border mb-4">
              <h3 className="font-bold mb-3 text-gray-800">Workplace Model</h3>
              {['On-Site', 'Remote', 'Hybrid'].map((type) => (
                <label key={type} className="flex items-center mb-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={workplaceModels.includes(type)}
                    onChange={() => handleWorkplaceModelsFilter(type)}
                    className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className={`transition-colors ${workplaceModels.includes(type) ? 'text-indigo-600 font-bold' : 'text-gray-600 group-hover:text-indigo-500'}`}>
                    {type}
                  </span>
                </label>
              ))}
            </div>

            {/* Categories */}
            <div className="bg-white p-4 rounded-lg border mb-4">
              <h3 className="font-bold mb-3 text-gray-800">Categories</h3>
              {['Design', 'Sales', 'Marketing', 'Business', 'Human Resource', 'Engineering', 'Technology'].map((cat) => (
                <label key={cat} className="flex items-center mb-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={category.includes(cat)}
                    onChange={() => handleCategoryFilter(cat)}
                    className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className={`transition-colors ${category.includes(cat) ? 'text-indigo-600 font-bold' : 'text-gray-600 group-hover:text-indigo-500'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>

            {/* Salary Range Inputs */}
            <div className="bg-white p-4 rounded-lg border mb-4 shadow-sm">
              <h3 className="font-bold mb-3 text-gray-800">Monthly Salary (EGP)</h3>

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

                {/* Error Text */}
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
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 font-semibold shadow-sm"
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="lg:col-span-3 scroll-mt-10" ref={resultsRef}>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isFiltering ? `Results (${pagination.totalCount})` : `All Jobs (${pagination.totalCount})`}
              </h2>

              {/* Badges for active filters */}
              {isFiltering && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {employmentTypes.map(c => <span key={c} className="bg-lime-50 text-lime-600 px-3 py-1 rounded-full text-xs font-medium border border-lime-100">{c}</span>)}
                  {workplaceModels.map(c => <span key={c} className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium border border-green-100">{c}</span>)}
                  {category.map(c => <span key={c} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">{c}</span>)}
                </div>
              )}

              <div>
                {jops.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-gray-400 text-lg">No jobs found matching your criteria.</p>
                  </div>
                ) : (
                  jops.map((job) => <JopCard key={job._id} jop={job} />)
                )}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border rounded-md disabled:opacity-30 hover:bg-gray-50 transition"
                  >
                    Prev
                  </button>
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded-md text-sm transition ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50 border'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="px-4 py-2 text-sm border rounded-md disabled:opacity-30 hover:bg-gray-50 transition"
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