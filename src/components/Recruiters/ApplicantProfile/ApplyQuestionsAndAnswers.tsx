import { useOutletContext } from 'react-router-dom'

type Application = {
  [key: string]: any
}
const ApplyQuestionsAndAnswers = () => {
  const application = useOutletContext<Application | null>()
  return (
    <>
      {application?.responses.map((item: any, index: any) => (
        <div key={index}>
          <h3 className="text-[#25324B] text-base font-semibold my-2">
            {item?.questionText}
          </h3>
          <p className="text-[#7C8493] text-base font-normal">
            {item?.answerValue}
          </p>
        </div>
      ))}
    </>
  )
}

export default ApplyQuestionsAndAnswers
