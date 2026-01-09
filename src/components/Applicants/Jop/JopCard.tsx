import ApplyButton from '../JobDescriptions/ApplyButton'
import { Link } from 'react-router-dom'

type JopCardProps = {
  jop: any // Using 'jop' to match the props passed from parent
}
const role = localStorage.getItem("role") || sessionStorage.getItem("role")
const JopCard = ({ jop }: JopCardProps) => {
  return (
    <article className="bg-white flex max-lg:flex-col justify-between items-center p-6 my-6 gap-4 border border-gray-200 rounded-lg hover:border-indigo-600 hover:shadow-md transition duration-200 ease-in-out">
      <Link to={jop._id} className="w-full">
        <div className="flex gap-4 max-sm:flex-col items-start">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <img
              className="w-12 h-12 object-contain rounded"
              src={jop?.companyId?.logoUrl || '/default-company-logo.png'}
              alt="company logo"
            />
          </div>

          <div className="flex-grow">
            <h3 className="text-xl text-gray-900 font-bold mb-1 hover:text-indigo-600 transition-colors">
              {jop?.title}
            </h3>
            <span className="text-gray-500 text-sm block mb-3">
              {jop?.companyId?.name}
              {jop.companyId.hqCountry !== undefined &&
                ' ' + jop.companyId.hqCountry}
              {jop.companyId.hqCity !== undefined &&
                ', ' + jop.companyId.hqCity}
            </span>

            <div className="flex flex-wrap gap-2">
              {/* Employment Type */}
              <span className="text-lime-600 bg-lime-50 px-3 py-1 text-sm font-semibold rounded-full">
                {jop?.employmentType}
              </span>

              {/* Workplace Model */}
              <span className="text-green-600 bg-green-50 px-3 py-1 text-sm font-semibold rounded-full">
                {jop?.workplaceModel}
              </span>

              {/* Categories - Map safely through the array */}
              {jop?.categories?.map((cat: string, index: number) => (
                <span
                  key={index}
                  className="text-blue-600 bg-blue-50 px-3 py-1 text-sm font-semibold rounded-full"
                >
                  {cat}
                </span>
              ))}

              {/* Salary Range */}
              <span className="text-rose-600 bg-rose-50 px-3 py-1 text-sm font-semibold rounded-full">
                {jop?.salaryMin} - {jop?.salaryMax} EGP
              </span>
            </div>
          </div>
        </div>
      </Link>

      {role !== 'COMPANY' &&
        <div className="flex-shrink-0 max-lg:w-full max-lg:mt-4">
          <ApplyButton jobId={jop?._id} questions={jop?.questions} />
        </div>
      }

    </article>
  )
}

export default JopCard
