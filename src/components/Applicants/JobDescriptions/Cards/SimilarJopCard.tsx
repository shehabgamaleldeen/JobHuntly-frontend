import { Link } from 'react-router-dom'

type SimilarJobCardProps = {
  [key: string]: any
}

const SimilarJopCard = ({ job }: SimilarJobCardProps) => {
  return (
    <>
      <article className="group bg-[#FFFFFF] flex max-xl:flex-col max-lg:flex-col max-sm:flex-col p-6 gap-3 border-2 border-transparent hover:border-[#4640DE] hover:shadow-lg transition duration-200 ease-in-out">
        <Link to={`/find-jobs/${job._id}`}>
          <img className="w-12 h-14" src="/SimilarJopIcon.png" alt="jobIcon" />
          <div>
            <h3 className="text-xl text-[#25324B] group-hover:text-[#4640DE] font-semibold mb-2">
              {job?.title}
            </h3>
            <span className=" text-[#515B6F] my-2">{job?.companyId?.name}</span>
            <div>
              <span className="text-[#FFB836] bg-[#EB85331A] w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2">
                {job?.employmentTypes}
              </span>
              <span className="text-[#56CDAD] bg-[#56CDAD1A] w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2 ">
                {job?.categories?.[0]}
              </span>
              <span className="text-[#4640DE] p-2 bg-[#F8F8FD] w-fit inline-block text-base font-semibold rounded-3xl text-center my-1 mr-4">
                {job?.categories?.[1]}
              </span>
            </div>
          </div>
        </Link>
      </article>
    </>
  )
}

export default SimilarJopCard
