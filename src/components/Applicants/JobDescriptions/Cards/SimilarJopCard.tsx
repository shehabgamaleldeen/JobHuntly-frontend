import { Link } from 'react-router-dom'

type SimilarJobCardProps = {
  [key: string]: any
}

const SimilarJopCard = ({ job }: SimilarJobCardProps) => {
  return (
    <>
      <article className="group bg-[#FFFFFF] p-6 border-2 border-transparent hover:border-[#4640DE] hover:shadow-lg transition duration-200 ease-in-out">
        <Link
          className="flex max-xl:flex-col max-lg:flex-col max-sm:flex-col gap-5"
          to={`/find-jobs/${job._id}`}
        >
          <img className="w-12 h-14" src={job.companyId.logoUrl} alt="jobIcon" />
          <div>
            <h3 className="text-xl text-[#25324B] group-hover:text-[#4640DE] font-semibold mb-2">
              {job?.title}
            </h3>
            <span className=" text-[#515B6F] my-2">{job?.companyId?.name}</span>
            <div>
              <span className="text-lime-600 bg-lime-50 w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2">
                {job?.employmentType}
              </span>
              {job?.categories?.map((category: any, index:any) => (
                <span
                  key={index}
                  className="text-[#FFB836] bg-[#EB85331A] w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2 "
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </article>
    </>
  )
}

export default SimilarJopCard
