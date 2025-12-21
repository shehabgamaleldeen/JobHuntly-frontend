import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import FindJobContent from './FindJobContent'
import instance from '../../AxiosConfig/instance.ts'
import JopCard from '../Jop/JopCard.tsx'

type Job = {
  _id: string
  [key: string]: any
}

function FindJobs() {
  const [jops, setjops] = useState<Job[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  
  const title = searchParams.get('title') || ''
  const location = searchParams.get('location') || ''
  
  const [employmentType, setEmploymentType] = useState('')
  const [category, setCategory] = useState('')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')

  useEffect(() => {
    async function getJops() {
      try {
        let url = '/jobs'
        const params: string[] = []
        
        if (title) params.push(`title=${title}`)
        if (location) params.push(`location=${location}`)
        if (employmentType) params.push(`employmentType=${employmentType}`)
        if (category) params.push(`category=${category}`)
        if (salaryMin) params.push(`salaryMin=${salaryMin}`)
        if (salaryMax) params.push(`salaryMax=${salaryMax}`)
        
        if (params.length > 0) {
          url = `/filter?${params.join('&')}`
        }
        
        const res = await instance.get(url)
        setjops(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    
    getJops()
  }, [title, location, employmentType, category, salaryMin, salaryMax])

  const handleEmploymentFilter = (type: string) => {
    setEmploymentType(type === employmentType ? '' : type)
  }

  const handleCategoryFilter = (cat: string) => {
    setCategory(cat === category ? '' : cat)
  }

  const handleSalaryFilter = (min: string, max: string) => {
    if (salaryMin === min && salaryMax === max) {
      setSalaryMin('')
      setSalaryMax('')
    } else {
      setSalaryMin(min)
      setSalaryMax(max)
    }
  }

  const clearFilters = () => {
    setEmploymentType('')
    setCategory('')
    setSalaryMin('')
    setSalaryMax('')
    setSearchParams({})
  }

  return (
    <>
      <FindJobContent
        title="Find Your"
        highlightText="dream job"
        description="Find your next career at companies like HubSpot, Nike, and Dropbox"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            
            <div className="bg-white p-4 rounded-lg border mb-4">
              <h3 className="font-bold mb-3">Type of Employment</h3>
              {['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contract'].map((type) => (
                <label key={type} className="flex items-center mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={employmentType === type}
                    onChange={() => handleEmploymentFilter(type)}
                    className="mr-2"
                  />
                  <span className={employmentType === type ? 'text-blue-600 font-semibold' : ''}>
                    {type}
                  </span>
                </label>
              ))}
            </div>

            <div className="bg-white p-4 rounded-lg border mb-4">
              <h3 className="font-bold mb-3">Categories</h3>
              {['Design', 'Sales', 'Marketing', 'Business', 'Human Resource', 'Engineering', 'Technology'].map((cat) => (
                <label key={cat} className="flex items-center mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category === cat}
                    onChange={() => handleCategoryFilter(cat)}
                    className="mr-2"
                  />
                  <span className={category === cat ? 'text-blue-600 font-semibold' : ''}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>

            <div className="bg-white p-4 rounded-lg border mb-4">
              <h3 className="font-bold mb-3">Salary Range</h3>
              {[
                { label: '$0 - $5000', min: '0', max: '5000' },
                { label: '$5000 - $10000', min: '5000', max: '10000' },
                { label: '$10000 - $15000', min: '10000', max: '15000' },
                { label: '$15000+', min: '15000', max: '' },
              ].map((range) => (
                <label key={range.label} className="flex items-center mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={salaryMin === range.min && salaryMax === range.max}
                    onChange={() => handleSalaryFilter(range.min, range.max)}
                    className="mr-2"
                  />
                  <span className={salaryMin === range.min ? 'text-blue-600 font-semibold' : ''}>
                    {range.label}
                  </span>
                </label>
              ))}
            </div>

            {(employmentType || category || salaryMin || title || location) && (
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
              <h2 className="text-2xl font-bold">
                {(title || location || employmentType || category || salaryMin) 
                  ? `Results (${jops.length})` 
                  : 'All Jobs'}
              </h2>
              
              {(employmentType || category || salaryMin) && (
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  {employmentType && (
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {employmentType}
                    </span>
                  )}
                  {category && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      {category}
                    </span>
                  )}
                  {salaryMin && (
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                      ${salaryMin} - ${salaryMax || '∞'}
                    </span>
                  )}
                </div>
              )}
              
              <div>
                {jops.length === 0 ? (
                  <p className="text-gray-500 py-8 text-center">No jobs found</p>
                ) : (
                  jops.map((jop) => (
                    <JopCard key={jop._id} jop={jop} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FindJobs
