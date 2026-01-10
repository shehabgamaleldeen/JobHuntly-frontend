import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import FindJobContent from './FindJobContent'
import instance from '../../AxiosConfig/instance'
import JopCard from '../Jop/JopCard'
import MobileFilterDrawer from './MobileFilterDrawer'

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

  const [tempMin, setTempMin] = useState('')
  const [tempMax, setTempMax] = useState('')
  const [salaryError, setSalaryError] = useState('')
  const [appliedMin, setAppliedMin] = useState('')
  const [appliedMax, setAppliedMax] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTitle, setSearchTitle] = useState(titleParam)
  const [searchLocation, setSearchLocation] = useState(locationParam)

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Sync URL params with local state
  useEffect(() => {
    setSearchTitle(titleParam)
    setSearchLocation(locationParam)
  }, [titleParam, locationParam])

  // Fetch jobs
  useEffect(() => {
    async function getJobs() {
      const params: string[] = [`page=${currentPage}`, `limit=5`]

      if (titleParam) params.push(`title=${titleParam}`)
      if (locationParam) params.push(`location=${locationParam}`)
      if (employmentTypes.length) params.push(`employmentType=${employmentTypes.join(',')}`)
      if (workplaceModels.length) params.push(`workplaceModel=${workplaceModels.join(',')}`)
      if (category.length) params.push(`category=${category.join(',')}`)
      if (appliedMin) params.push(`salaryMin=${appliedMin}`)
      if (appliedMax) params.push(`salaryMax=${appliedMax}`)

      const hasFilters =
        titleParam ||
        locationParam ||
        employmentTypes.length ||
        workplaceModels.length ||
        category.length ||
        appliedMin ||
        appliedMax

      const endpoint = hasFilters ? '/api/filter' : '/api/jobs'
      const res = await instance.get(`${endpoint}?${params.join('&')}`)

      setjops(res.data.data)
      if (res.data.pagination) setPagination(res.data.pagination)
    }

    getJobs()
  }, [
    titleParam,
    locationParam,
    employmentTypes,
    workplaceModels,
    category,
    appliedMin,
    appliedMax,
    currentPage
  ])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return
    setCurrentPage(page)
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  // --- Handlers ---
  const handleSearch = () => {
    const params: any = {}
    if (searchTitle) params.title = searchTitle
    if (searchLocation) params.location = searchLocation
    setSearchParams(params)
    setCurrentPage(1)
  }

  const handleApplySalary = () => {
    const min = parseFloat(tempMin)
    const max = parseFloat(tempMax)

    setSalaryError('')

    if (min < 0 || max < 0) return setSalaryError('Salary cannot be negative')
    if (tempMin && tempMax && min > max) return setSalaryError('Min must be less than Max')

    setAppliedMin(tempMin)
    setAppliedMax(tempMax)
    setCurrentPage(1)
    setIsFilterOpen(false)
  }

  const toggleEmploymentType = (type: string) => {
    setEmploymentTypes(prev =>
      prev.includes(type) ? prev.filter(x => x !== type) : [...prev, type]
    )
    setCurrentPage(1)
  }

  const toggleWorkplaceModel = (type: string) => {
    setWorkplaceModels(prev =>
      prev.includes(type) ? prev.filter(x => x !== type) : [...prev, type]
    )
    setCurrentPage(1)
  }

  const toggleCategory = (cat: string) => {
    setCategory(prev =>
      prev.includes(cat) ? prev.filter(x => x !== cat) : [...prev, cat]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setEmploymentTypes([])
    setWorkplaceModels([])
    setCategory([])
    setTempMin('')
    setTempMax('')
    setAppliedMin('')
    setAppliedMax('')
    setSearchParams({})
    setSearchTitle('')
    setSearchLocation('')
    setCurrentPage(1)
    setIsFilterOpen(false)
  }

  const isFiltering =
    titleParam ||
    locationParam ||
    employmentTypes.length ||
    workplaceModels.length ||
    category.length ||
    appliedMin ||
    appliedMax

  // 🔁 Filters content (shared desktop & mobile)
  const FiltersContent = (
    <>
      {/* Employment Type */}
      <div className="bg-white p-4 rounded-lg border mb-4">
        <h3 className="font-bold mb-3">Employment Type</h3>
        {['Full-Time', 'Part-Time', 'Internship', 'Contract'].map(type => (
          <label key={type} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={employmentTypes.includes(type)}
              onChange={() => toggleEmploymentType(type)}
              className="mr-2"
            />
            {type}
          </label>
        ))}
      </div>

      {/* Workplace */}
      <div className="bg-white p-4 rounded-lg border mb-4">
        <h3 className="font-bold mb-3">Workplace Model</h3>
        {['On-Site', 'Remote', 'Hybrid'].map(type => (
          <label key={type} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={workplaceModels.includes(type)}
              onChange={() => toggleWorkplaceModel(type)}
              className="mr-2"
            />
            {type}
          </label>
        ))}
      </div>

      {/* Categories */}
      <div className="bg-white p-4 rounded-lg border mb-4">
        <h3 className="font-bold mb-3">Categories</h3>
        {['Design', 'Sales', 'Marketing', 'Business', 'Human Resource', 'Engineering', 'Technology'].map(cat => (
          <label key={cat} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={category.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Salary */}
      <div className="bg-white p-4 rounded-lg border mb-4">
        <h3 className="font-bold mb-3">Monthly Salary (EGP)</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={tempMin}
            onChange={e => setTempMin(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
          <input
            type="number"
            placeholder="Max"
            value={tempMax}
            onChange={e => setTempMax(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        {salaryError && <p className="text-red-500 text-xs">{salaryError}</p>}
        <button
          onClick={handleApplySalary}
          className="w-full mt-2 bg-indigo-600 text-white py-2 rounded"
        >
          Apply
        </button>
      </div>

      {isFiltering && (
        <button
          onClick={clearFilters}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Clear All Filters
        </button>
      )}
    </>
  )

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

      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-center pt-8 px-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center justify-center gap-2 w-full max-w-xl py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 active:scale-[0.98] transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {isFiltering ? `Filters (${employmentTypes.length + workplaceModels.length + category.length + (appliedMin ? 1 : 0) + (appliedMax ? 1 : 0)})` : 'Filters'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block">{FiltersContent}</div>

          {/* Results */}
          <div className="lg:col-span-3" ref={resultsRef}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isFiltering ? `Results (${pagination.totalCount})` : `All Jobs (${pagination.totalCount})`}
            </h2>

            {jops.length === 0 ? (
              <p className="text-center text-gray-400 py-20">No jobs found matching your criteria.</p>
            ) : (
              jops.map(job => <JopCard key={job._id} jop={job} />)
            )}

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

      {/* Mobile Drawer */}
      <MobileFilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        {FiltersContent}
      </MobileFilterDrawer>
    </>
  )
}

export default FindJobs
