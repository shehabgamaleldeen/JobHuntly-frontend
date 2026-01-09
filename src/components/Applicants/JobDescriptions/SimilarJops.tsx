import SimilarJopCard from './Cards/SimilarJopCard'
import { useState, useEffect } from 'react'
import instance from '../../AxiosConfig/instance.ts'

type similarJobProps = {
  [key: string]: any
}

const SimilarJobs = ({ job }: similarJobProps) => {
  type SimilarJobs = Array<{ [key: string]: any }>

  const [similarJobs, setsimilarJobs] = useState<SimilarJobs>([])
  async function getSimilarJobs() {
    try {
      const res = await instance.get('/jobs/similar', {
        params: {
          categories: job?.categories, // Pass entire array
          excludeJobId: job?._id,
          limit: 6,
        },
      })
      setsimilarJobs(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (job?.categories && job?._id) {
      getSimilarJobs()
    }
  }, [job?.categories, job?._id])
  useEffect(() => {
    console.log(similarJobs)
  }, [similarJobs])

  return (
    <>
      <section className="similarJopsSection bg-[#F8F8FD] w-4/5 m-auto py-3">
        <h2 className="text-[#25324B] text-3xl font-semibold mt-8 mb-12">
          Similar Jobs
        </h2>
        {similarJobs?.length > 0 ? (
          <div className="grid grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-8 mb-8">
            {similarJobs?.map((job) => (
              <SimilarJopCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-[#515B6F] mb-8">
            No similar jobs available right now
          </p>
        )}
      </section>
    </>
  )
}

export default SimilarJobs
