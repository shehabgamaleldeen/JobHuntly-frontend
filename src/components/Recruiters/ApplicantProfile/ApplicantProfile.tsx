import ApplicantProfileNavbar from './ApplicantProfileNavbar'
import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import instance from '../../AxiosConfig/instance.ts'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Loader from '@/components/Basic/Loader.tsx'

const ApplicantProfile = () => {
  dayjs.extend(relativeTime)

  const { applicationId, jobId } = useParams()
  type Application = {
    [key: string]: any
  }
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)

  async function getApplication() {
    try {
      setLoading(true)
      const res = await instance.get(
        `/company/jobs/${jobId}/applications/${applicationId}`
      )
      setApplication(res.data.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getApplication()
  }, [])
  useEffect(() => {
    console.log(application)
  }, [application])

  if (loading) {
    return <Loader />
  }
  return (
    <>
      <section className="flex">
        <section className="applicant-profile grid grid-cols-[1fr_2fr] max-lg:grid-cols-1 gap-8 m-8">
          <div className="applicant-info border border-[#D6DDEB] p-8">
            <div className="applicant-profile-card flex items-center gap-7">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={application?.seekerId?.logoUrl}
                  alt="seeker image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-[#25324B]">
                  {application?.fullName}
                </h3>
                <span className="text-base text-[#7C8493] font-normal">
                  {application?.seekerId?.headline}
                </span>
              </div>
            </div>
            <div className="bg-[#F8F8FD] my-6 p-4">
              <div className="font-normal text-sm flex justify-between">
                <span className="text-[#25324B]">Applied Job</span>
                <span className="text-[#7C8493]">
                  {dayjs(application?.appliedAt).fromNow()}
                </span>
              </div>
              <hr className="border-t border-[#D6DDEB] my-2" />
              <div>
                <h4 className="text-[#25324B] text-base font-semibold">
                  {application?.jobId?.title}
                </h4>
                <span className="text-[#515B6F] font-normal text-sm">
                  {application?.jobId?.categories[0]} .{' '}
                  {application?.jobId?.employmentType}
                </span>
              </div>
            </div>
            <hr className="border-t border-[#D6DDEB] my-2" />
            <div className="contact-info">
              <h4 className="text-xl font-semibold text-[#25324B]">Contact</h4>
              <div className="contact-info-card flex gap-4 my-4">
                <img className="object-contain" src="/email.png" alt="" />
                <div className="flex flex-col">
                  <span className="text-[#7C8493] font-normal text-base">
                    Email
                  </span>
                  <span>{application?.email}</span>
                </div>
              </div>
              {application?.phone && (
                <div className="contact-info-card flex gap-4 my-4">
                  <img className="object-contain" src="/mobile.png" alt="" />
                  <div className="flex flex-col">
                    <span className="text-[#7C8493] font-normal text-base">
                      Phone
                    </span>
                    <span>{application?.phone}</span>
                  </div>
                </div>
              )}
              {application?.seekerId?.portfolioUrl && (
                <div className="contact-info-card flex gap-4 my-4">
                  <img className="object-contain" src="/GlobeIcon.png" alt="" />
                  <div className="flex flex-col">
                    <span className="text-[#7C8493] font-normal text-base">
                      Portfolio
                    </span>
                    <span>{application?.seekerId?.portfolioUrl}</span>
                  </div>
                </div>
              )}
              {application?.seekerId?.socialLinks?.linkedin && (
                <div className="contact-info-card flex gap-4 my-4">
                  <img
                    className="object-contain w-7 h-7"
                    src="/linked in.jpg"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-[#7C8493] font-normal text-base">
                      Linked In
                    </span>
                    <span>{application?.seekerId?.socialLinks?.linkedin}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="Nav-bar border border-[#D6DDEB] p-8 max-w-[718px]">
            <ApplicantProfileNavbar application={application} />
          </div>
        </section>
      </section>
    </>
  )
}

export default ApplicantProfile
