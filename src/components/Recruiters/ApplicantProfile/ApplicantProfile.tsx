import ApplicantProfileNavbar from './ApplicantProfileNavbar'

const ApplicantProfile = () => {
  return (
    <>
      <section className="flex">
        <div className="sideBar w-[272px] bg-amber-200 max-sm:hidden">
          side bar
        </div>
        <section className="applicant-profile grid grid-cols-[1fr_2fr] max-sm:grid-cols-1 gap-8 m-8">
          <div className="applicant-info border border-[#D6DDEB] p-8">
            <div className="applicant-profile-card flex items-center gap-7">
              <img src="/Avatar.png" alt="" />
              <div>
                <h3 className="font-semibold text-2xl text-[#25324B]">
                  Jerome Bell
                </h3>
                <span className="text-base text-[#7C8493] font-normal">
                  Product Designer
                </span>
              </div>
            </div>
            <div className="bg-[#F8F8FD] my-6 p-4">
              <div className="font-normal text-sm flex justify-between">
                <span className="text-[#25324B]">Applied Jobs</span>
                <span className="text-[#7C8493]">2 days ago</span>
              </div>
              <hr className="border-t border-[#D6DDEB] my-2" />
              <div>
                <h4 className="text-[#25324B] text-base font-semibold">
                  Product Development
                </h4>
                <span className="text-[#515B6F] font-normal text-sm">
                  Marketing . Full-Time
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
                  <span>jeromeBell45@email.com</span>
                </div>
              </div>
              <div className="contact-info-card flex gap-4 my-4">
                <img className="object-contain" src="/email.png" alt="" />
                <div className="flex flex-col">
                  <span className="text-[#7C8493] font-normal text-base">
                    Email
                  </span>
                  <span>jeromeBell45@email.com</span>
                </div>
              </div>
              <div className="contact-info-card flex gap-4 my-4">
                <img className="object-contain" src="/email.png" alt="" />
                <div className="flex flex-col">
                  <span className="text-[#7C8493] font-normal text-base">
                    Email
                  </span>
                  <span>jeromeBell45@email.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="Nav-bar border border-[#D6DDEB] p-8">
            <ApplicantProfileNavbar />
          </div>
        </section>
      </section>
    </>
  )
}

export default ApplicantProfile
