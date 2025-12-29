import ApplyButton from '../JobDescriptions/ApplyButton'
import { Link } from 'react-router-dom'

type JopCardProps = {
  [key: string]: any
}
const JopCard = ({ jop }: JopCardProps) => {
  return (
    <>
      <article className="bg-[#FFFFFF] flex max-lg:flex-col max-md:flex-col max-sm:flex-col justify-between items-center p-6 my-6 gap-3 border-2 border-[#D6DDEB]">
        <Link to={jop._id}>
          <div className="flex gap-3 max-xl:flex-col max-lg:flex-col max-sm:flex-col">
            <img className="w-12 h-14" src={jop?.logoUrl} alt="companyIcon" />
            <div>
              <h3 className="text-xl text-[#25324B] font-semibold mb-2">
                {jop?.title}
              </h3>
              <span className=" text-[#515B6F] my-2">
                {jop?.companyId?.name}
              </span>
              <div>
                <span className="text-[#56CDAD] bg-[#56CDAD1A] w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2 ">
                  {jop?.employmentTypes}
                </span>
                <span className="text-[#FFB836] bg-[#EB85331A] w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2">
                  {jop?.categories?.[0]}
                </span>
                <span className="text-[#4640DE] bg-[#F8F8FD] w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2">
                  {jop?.categories?.[1]}
                </span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={jop._id}>
          <ApplyButton jobId={jop?._id} questions={jop?.questions} />
        </Link>
      </article>
    </>
  )
}

export default JopCard
