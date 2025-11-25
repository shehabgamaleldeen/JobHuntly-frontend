import PerksBenefits from './PerksBenefits'
import SimilarJops from './SimilarJops'

const jobDescriptions = () => {
  return (
    <>
      <section className="jobDescriptionsCard bg-[#F8F8FD] my-14 w-screen flex justify-center">
        <div className="bg-[#FFFFFF] w-4/5 m-auto p-6 flex max-sm:flex-col justify-between border border-[#D6DDEB]">
          <div className="flex max-sm:flex-col items-center  max-sm:place-items-start">
            <img
              className="w-24 max-sm:w-16"
              src="/CompanyLogo.png"
              alt="Company Logo"
            />
            <div className="m-6 max-sm:my-4 max-sm:mx-0">
              <h1 className="text-[#25324B] text-3xl font-semibold">
                Social Media Assistant
              </h1>
              <p className="text-[#515B6F] font-normal">
                Stripe Paris, France Full-Time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-16">
            <img className="w-8" src="/ShareIcon.png" alt="Share Icon" />
            <button className="w-44 h-14 text-white bg-[#4640DE]">Apply</button>
          </div>
        </div>
      </section>

      <section className="jobDescriptionsInfo bg-[#FFFFFF] w-screen h-1/4 flex justify-center">
        <div className="py-16 max-sm:py-10 w-4/5 grid grid-cols-[2fr_1fr] gap-16 max-sm:gap-8 max-md:grid-cols-1">
          <div className="discription ">
            <div>
              <h2 className="text-[#25324B] text-3xl font-semibold">
                Description
              </h2>
              <p className="text-[#515B6F] mt-4 mb-10">
                Stripe is looking for Social Media Marketing expert to help
                manage our online networks. You will be responsible for
                monitoring our social media channels, creating content, finding
                effective ways to engage the community and incentivize others to
                engage on our channels.
              </p>
            </div>
            <div>
              <h2 className="text-[#25324B] text-3xl font-semibold">
                Responsibilities
              </h2>
              <div className="flex items-center max-sm:items-start text-[#515B6F] my-2">
                <img className="mr-1" src="/checkIcon.png" alt="check Icon" />
                Community engagement to ensure that is supported and actively
                represented online
              </div>
              <div className="flex items-center text-[#515B6F] my-2">
                <img className="mr-1" src="/checkIcon.png" alt="check Icon" />
                Community engagement to ensure that is supported and actively
                represented online
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
                  July 31, 2021
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <span className="text-[#515B6F] text-base font-normal">
                  Apply Before
                </span>
                <span className="text-[#25324B] text-base font-semibold">
                  July 31, 2021
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <span className="text-[#515B6F] text-base font-normal">
                  Apply Before
                </span>
                <span className="text-[#25324B] text-base font-semibold">
                  July 31, 2021
                </span>
              </div>
            </div>
            <div className="Categories mt-3">
              <h2 className="text-[#25324B] text-3xl font-semibold">
                Categories
              </h2>
              <div>
                <span className="text-[#FFB836] bg-[#EB85331A] w-24 inline-block text-base font-semibold rounded-3xl text-center my-4 mr-4">
                  Marketing
                </span>
                <span className="text-[#56CDAD] bg-[#56CDAD1A] w-24 inline-block text-base font-semibold rounded-3xl text-center my-4 mr-4">
                  Design
                </span>
              </div>
            </div>
            <div className="RequiredSkills">
              <h2 className="text-[#25324B] text-3xl font-semibold">
                Categories
              </h2>
              <div className="flex flex-wrap">
                <span className="text-[#4640DE] p-2 bg-[#F8F8FD] w-fit inline-block text-base font-semibold rounded-3xl text-center my-1 mr-4">
                  Project Management
                </span>
                <span className="text-[#4640DE] p-2 bg-[#F8F8FD] w-fit inline-block text-base font-semibold rounded-3xl text-center my-1 mr-4">
                  Project Management
                </span>
                <span className="text-[#4640DE] p-2 bg-[#F8F8FD] w-fit inline-block text-base font-semibold rounded-3xl text-center my-1 mr-4">
                  Project Management
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PerksBenefits />
      <SimilarJops />
    </>
  )
}

export default jobDescriptions
