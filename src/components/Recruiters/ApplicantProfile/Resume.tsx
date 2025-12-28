import { buttonVariants } from '@/components/ui/button'
import { useOutletContext } from 'react-router-dom'

type Application = {
  [key: string]: any
}

const Resume = () => {
  const application = useOutletContext<Application | null>()
  return (
    <>
      <a
        className="flex justify-center items-center rounded-2xl w-44 h-14 shrink font-semibold text-lg text-[#25324B] hover:bg-[#eee] border-[#4640DE] border-2"
        href={application?.resumeUrl}
        download
      >
        Download CV
      </a>
    </>
  )
}

export default Resume
