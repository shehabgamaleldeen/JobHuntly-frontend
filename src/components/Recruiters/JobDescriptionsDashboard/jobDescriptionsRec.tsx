import PerksBenefits from './PerksBenefits.tsx'
import { useEffect, useState } from 'react'
import instance from '../../AxiosConfig/instance.ts'
import './style.css'
import { useParams , useNavigate } from "react-router-dom";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'

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
    toast.success('Job link copied to clipboard')
  }
}

const JobDescriptionsRec = () => {
  const navigate = useNavigate();
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

  return (
    <>
      {/* ================= HEADER ================= */}
          <button
             onClick={() => navigate(-1)}
             className="flex items-center gap-2 text-[#4640DE] hover:underline pb-8"
           >
             <ArrowLeft size={18} />
             <span className="text-sm font-medium ">Back to Applications</span>
           </button>
      <section className="jobDescriptionsCard bg-[#F8F8FD] py-14 max-sm:py-8 flex justify-center flex-col">

        <div className="bg-[#FFFFFF] w-4/5 max-sm:w-[92%] m-auto p-6 max-sm:p-4 flex max-sm:flex-col justify-between border border-[#D6DDEB]">
          <div className="flex max-sm:flex-col items-center max-sm:items-start">
            <img
              className="w-24 max-sm:w-14"
              src={job?.logoUrl}
              alt="Company Logo"
            />

            <div className="m-6 max-sm:my-4 max-sm:mx-0">
              <h1 className="text-[#25324B] text-xl max-sm:text-lg font-semibold mb-2">
                {job?.title}
              </h1>
              <p className="text-[#515B6F] font-normal">
                {job?.companyId?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-16 max-sm:gap-4 max-sm:w-full max-sm:justify-between max-sm:mt-4">
            <img
              src="/ShareIcon.png"
              alt="Share Icon"
              onClick={shareJob}
              className="w-9 h-9 max-sm:w-8 max-sm:h-8 p-1.5 cursor-pointer rounded-full transition hover:bg-gray-100"
            />

          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="jobDescriptionsInfo bg-[#FFFFFF] flex justify-center">
        <div className="py-16 max-sm:py-10 w-4/5 max-sm:w-[92%] grid grid-cols-[2fr_1fr] gap-16 max-sm:gap-8 max-md:grid-cols-1">
          {/* DESCRIPTION */}
          <div>
            <h2 className="text-[#25324B] text-xl font-semibold">
              Description
            </h2>
            <p className="text-[#515B6F] mt-4 text-base max-sm:text-sm leading-relaxed">
              {job?.description}
            </p>

            {/* RESPONSIBILITIES */}
            <div className="mt-10">
              <h2 className="text-[#25324B] text-xl font-semibold">
                Responsibilities
              </h2>
              {job?.responsibilities?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start text-[#515B6F] my-2"
                >
                  <img src="/checkIcon.png" className="w-5 h-5 mr-2 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* WHO YOU ARE */}
            <div className="mt-10">
              <h2 className="text-[#25324B] text-xl font-semibold">
                Who You Are
              </h2>
              {job?.whoYouAre?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start text-[#515B6F] my-2"
                >
                  <img src="/checkIcon.png" className="w-5 h-5 mr-2 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* NICE TO HAVES */}
            <div className="mt-10">
              <h2 className="text-[#25324B] text-xl font-semibold">
                Nice-To-Haves
              </h2>
              {job?.niceToHaves?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start text-[#515B6F] my-2"
                >
                  <img src="/checkIcon.png" className="w-5 h-5 mr-2 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div>
            <h2 className="text-[#25324B] text-xl font-semibold">
              About this role
            </h2>

            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-[#515B6F]">Apply Before</span>
                <span className="font-semibold">
                  {dayjs(job?.dueDate).format('MMMM D, YYYY')}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#515B6F]">Job Posted On</span>
                <span className="font-semibold">
                  {dayjs(job?.createdAt).format('MMMM D, YYYY')}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#515B6F]">Job Type</span>
                <span className="font-semibold">
                  {job?.employmentTypes}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#515B6F]">Salary</span>
                <span className="font-semibold">
                  {job?.salaryMin} - {job?.salaryMax} {job?.salaryCurrency}
                </span>
              </div>
            </div>

              <div className="Categories mt-8">
              <h2 className="text-[#25324B] text-xl font-semibold">
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

            {/* SKILLS */}
            <div className="mt-8">
              <h2 className="text-[#25324B] text-xl font-semibold mb-2">
                Required Skills
              </h2>
              {job?.skillsIds?.map((skill: any) => (
                <span
                  key={skill?._id}
                  className="text-[#4640DE] p-3 max-sm:p-2 bg-[#F8F8FD] text-sm max-sm:text-xs font-semibold rounded-2xl inline-block my-1 mr-2"
                >
                  {skill?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PerksBenefits Benefits={job?.benefits} />
    </>
  )
}

export default JobDescriptionsRec
