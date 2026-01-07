import ApplicantProfileNavbar from './ApplicantProfileNavbar'
import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import instance from '../../AxiosConfig/instance.ts'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const ApplicantProfile = () => {
  dayjs.extend(relativeTime)

  const { applicationId, jobId } = useParams()
  type Application = {
    [key: string]: any
  }
  const [application, setApplication] = useState<Application | null>(null)

  async function getApplication() {
    try {
      const res = await instance.get(
        `/company/jobs/${jobId}/applications/${applicationId}`
      )
      setApplication(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getApplication()
  }, [])
  // useEffect(() => {
  //   console.log(application)
  // }, [application])
  return (
    <>
      <section className="flex">
        <section className="applicant-profile grid grid-cols-[1fr_2fr] max-lg:grid-cols-1 gap-8 m-8">
          <div className="applicant-info border border-[#D6DDEB] p-8">
            <div className="applicant-profile-card flex items-center gap-7">
              <img src={application?.seekerId?.avatarUrl} alt="seeker image" />
              <div>
                <h3 className="font-semibold text-2xl text-[#25324B]">
                  {application?.fullName}
                </h3>
                <span className="text-base text-[#7C8493] font-normal">
                  {application?.currentJobTitle}
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
                  {application?.jobId?.employmentTypes}
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
              <div className="contact-info-card flex gap-4 my-4">
                <img className="object-contain" src="/mobile.png" alt="" />
                <div className="flex flex-col">
                  <span className="text-[#7C8493] font-normal text-base">
                    Phone
                  </span>
                  <span>{application?.phone}</span>
                </div>
              </div>
              <div className="contact-info-card flex gap-4 my-4">
                <img className="object-contain" src="/GlobeIcon.png" alt="" />
                <div className="flex flex-col">
                  <span className="text-[#7C8493] font-normal text-base">
                    Portfolio
                  </span>
                  <span>{application?.portfolioUrl}</span>
                </div>
              </div>
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
                  <span>{application?.linkedinUrl}</span>
                </div>
              </div>
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
