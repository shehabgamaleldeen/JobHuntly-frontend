import { useNavigate } from 'react-router-dom'

interface PathProps {
  jobName: string
  className?: string
}

function JobPath({ jobName, className = '' }: PathProps) {
  const navigate = useNavigate()

  return (
    <div
      className={`text-gray-500 text-sm flex items-center gap-1 ${className}`}
    >
      <span
        onClick={() => navigate('/')}
        className="cursor-pointer hover:underline"
      >
        Home
      </span>

      <span>/</span>

      <span
        onClick={() => navigate('/find-jobs')}
        className="cursor-pointer hover:underline"
      >
        Jobs
      </span>

      <span>/</span>

      <span className="text-gray-800 font-medium">{jobName}</span>
    </div>
  )
}

export default JobPath
