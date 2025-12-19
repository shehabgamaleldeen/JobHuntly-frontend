import React from 'react'
import { useState, useEffect } from 'react'
import Filter from './Filter'
import FindJobContent from './FindJobContent'
import instance from '../../AxiosConfig/instance.ts'
import JopCard from '../Jop/JopCard.tsx'

function FindJobs() {
  type Jops = Array<{ [key: string]: any }>

  const [jops, setjops] = useState<Jops | null>(null)
  async function getJops() {
    try {
      const res = await instance.get('/jobs')
      setjops(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getJops()
  }, [])

  useEffect(() => {
    console.log(jops)
  }, [jops])

  return (
    <>
      <FindJobContent
        title={'Find Your'}
        highlightText={'dream job'}
        description={
          'Find your next career at companies like HubSpot, Nike, and Dropbox'
        }
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filter
              title="Type of Employment"
              fullTime="Full Time"
              fullTimeCount="3"
              partTime="Part Time"
              partTimeCount="5"
              remote="Remote"
              remoteCount="2"
              internship="Internship"
              internshipCount="24"
              contract="Contract"
              contractCount="3"
            />
            <Filter
              title="Categories"
              fullTime="Design"
              fullTimeCount="24"
              partTime="Sales"
              partTimeCount="3"
              remote="Marketing"
              remoteCount="7"
              internship="Business"
              internshipCount="12"
              contract="Finance"
              contractCount="8"
            />
            <Filter
              title="Job Level"
              fullTime="Entery Level"
              fullTimeCount="57"
              partTime="Mid Level"
              partTimeCount="3"
              remote="Senior Level"
              remoteCount="5"
              internship="Director"
              internshipCount="12"
              contract="VP or Above"
              contractCount="8"
            />
            <Filter
              title="Salary Range"
              fullTime="$700-$1000"
              fullTimeCount="4"
              partTime="$100-$1500"
              partTimeCount="6"
              remote="$1500-$2000"
              remoteCount="10"
              internship="$2500-3000$"
              internshipCount="5"
              contract="$3000 or above"
              contractCount="4"
            />
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold">All Jobs</h2>
              <div>
                {jops?.map((jop) => (
                  <JopCard key={jop._id} jop={jop} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FindJobs
