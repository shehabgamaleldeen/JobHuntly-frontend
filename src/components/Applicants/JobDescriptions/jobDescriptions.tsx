import ApplyButton from './ApplyButton.tsx'
import PerksBenefits from './PerksBenefits.tsx'
import SimilarJobs from './SimilarJops.tsx'
import { useEffect, useState } from 'react'
import instance from '../../AxiosConfig/instance.ts'
import './style.css'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Button } from '@/components/ui/button'
import JobPath from './JobPath.tsx'
import { toast } from 'sonner'

const shareJob = async () => {
  const url = window.location.href

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Job Opportunity',
        text: 'Check out this job',
        url,
      })
    } catch {
      console.log('User cancelled share')
    }
  } else {
    await navigator.clipboard.writeText(url)
    // show toast instead of alert
    toast.success('Job link copied to clipboard')
  }
}

const JobDescriptions = () => {
  dayjs.extend(relativeTime)
  const { id } = useParams()
  type Job = {
    [key: string]: any
  }
  const [job, setJob] = useState<Job | null>(null)
  const [hasApplied, setHasApplied] = useState<boolean>(false)

  async function getJob() {
    try {
      const res = await instance.get(`/jobs/${id}`, {
        headers: {
          access_token:
            localStorage.getItem('accessToken') ||
            sessionStorage.getItem('accessToken') ||
            '',
        },
      })
      setJob(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getJob()
  }, [id])

  useEffect(() => {
    setHasApplied(Boolean(job?.hasApplied))
  }, [job])

  // for debbuging
  useEffect(() => {
    console.log(job)
  }, [job])

  return (
    <>
      <section className="jobDescriptionsCard bg-[#F8F8FD] py-14 w-screen flex justify-center flex-col">
        <div className="w-4/5 m-auto mb-10">
          <JobPath jobName={job?.title} />
        </div>
        <div className="bg-[#FFFFFF] w-4/5 m-auto p-6 flex max-sm:flex-col justify-between border border-[#D6DDEB]">
          <div className="flex max-sm:flex-col items-center  max-sm:place-items-start">
            <img
              className="w-24 max-sm:w-16"
              src={job?.logoUrl}
              alt="Company Logo"
            />
            <div className="m-6 max-sm:my-4 max-sm:mx-0">
              <h1 className="text-[#25324B] text-3xl font-semibold mb-2">
                {job?.title}
              </h1>
              <p className="text-[#515B6F] font-normal">
                {job?.companyId?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-16">
            <img
              src="/ShareIcon.png"
              alt="Share Icon"
              onClick={shareJob}
              className="
                w-9 h-9
                p-1.5
                cursor-pointer
                rounded-full
                transition
                duration-200
                ease-in-out
                hover:bg-gray-100
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
            {hasApplied ? (
              <Button
                disabled
                className="w-44 h-14 text-[#08ac80] bg-[#26b18c1a] font-semibold text-lg"
              >
                Applied
              </Button>
            ) : (
              <ApplyButton
                jobId={id!}
                questions={job?.questions}
                onApplied={() => setHasApplied(true)}
              />
            )}
          </div>
        </div>
      </section>

      <section className="jobDescriptionsInfo bg-[#FFFFFF] w-screen h-1/4 flex justify-center">
        <div className="py-16 max-sm:py-10 w-4/5 grid grid-cols-[2fr_1fr] gap-16 max-sm:gap-8 max-md:grid-cols-1">
          <div className="description ">
            <div>
              <h2 className="text-[#25324B] text-3xl font-semibold">
                Description
              </h2>
              <p className="text-[#515B6F] mt-4">{job?.description}</p>
            </div>

            <div className="job-needs">
              <div className="mb-5">
                <h2 className="text-[#25324B] text-3xl font-semibold capitalize mt-10">
                  Responsibilities
                </h2>
                <div className="mt-2">
                  {job?.responsibilities?.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="flex items-center max-sm:items-start text-[#515B6F] my-2"
                    >
                      <img
                        className="mr-1 w-5 h-5"
                        src="/checkIcon.png"
                        alt="check Icon"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <h2 className="text-[#25324B] text-3xl font-semibold capitalize mt-10">
                  Who You Are
                </h2>
                <div className="mt-2">
                  {job?.whoYouAre?.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="flex items-center max-sm:items-start text-[#515B6F] my-2"
                    >
                      <img
                        className="mr-1 w-5 h-5"
                        src="/checkIcon.png"
                        alt="check Icon"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <h2 className="text-[#25324B] text-3xl font-semibold capitalize mt-10">
                  Nice-To-Haves
                </h2>
                <div className="mt-2">
                  {job?.niceToHaves?.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="flex items-center max-sm:items-start text-[#515B6F] my-2"
                    >
                      <img
                        className="mr-1 w-5 h-5"
                        src="/checkIcon.png"
                        alt="check Icon"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="aboutThisRole">
            <h2 className="text-[#25324B] text-3xl font-semibold">
              About this role
            </h2>
            <div>
              <div className="mt-4 flex justify-between">
                <span className="text-[#515B6F] text-base font-normal">
                  Apply Before
                </span>
                <span className="text-[#25324B] text-base font-semibold">
                  {dayjs(job?.dueDate).format('MMMM D, YYYY')}
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <span className="text-[#515B6F] text-base font-normal">
                  Job Posted On
                </span>
                <span className="text-[#25324B] text-base font-semibold">
                  {dayjs(job?.createdAt).format('MMMM D, YYYY')}
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <span className="text-[#515B6F] text-base font-normal">
                  Job Type
                </span>
                <span className="text-[#25324B] text-base font-semibold">
                  {job?.employmentTypes}
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <span className="text-[#515B6F] text-base font-normal">
                  Salary
                </span>
                <span className="text-[#25324B] text-base font-semibold">
                  {job?.salaryMin} - {job?.salaryMax} {job?.salaryCurrency}
                </span>
              </div>
            </div>
            <div className="Categories mt-8">
              <h2 className="text-[#25324B] text-3xl font-semibold">
                Categories
              </h2>
              <div>
                <span className="text-[#FFB836] bg-[#EB85331A] w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2">
                  {job?.categories?.[0]}
                </span>
                <span className="text-[#56CDAD] bg-[#56CDAD1A] w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2 ">
                  {job?.categories?.[1]}
                </span>
              </div>
            </div>
            <div className="RequiredSkills mt-4">
              <h2 className="text-[#25324B] text-3xl font-semibold mb-2">
                Required Skills
              </h2>
              {job?.skillsIds.map((skill: any) => (
                <span
                  key={skill?._id}
                  className="text-[#4640DE] p-3 bg-[#F8F8FD] w-fit inline-block text-base font-semibold rounded-2xl text-center my-1 mr-4"
                >
                  {skill?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PerksBenefits Benefits={job?.benefits} />
      <div className="bg-[#F8F8FD]">
        <SimilarJobs job={job} />
      </div>
    </>
  )
}

export default JobDescriptions
