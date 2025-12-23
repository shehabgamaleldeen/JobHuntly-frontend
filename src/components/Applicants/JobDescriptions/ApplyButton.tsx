import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import instance from '@/components/AxiosConfig/instance'

type ApplyButtonProps = {
  questions?: any[]
  jobId: string
}

export function ApplyButton(props: ApplyButtonProps) {
  const [open, setOpen] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [responses, setResponses] = useState<
    { questionId: string; answerValue: string }[]
  >([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswerChange = (questionId: string, value: string) => {
    setResponses((prev) => {
      const existing = prev.find((r) => r.questionId === questionId)
      if (existing) {
        return prev.map((r) =>
          r.questionId === questionId ? { ...r, answerValue: value } : r
        )
      }
      return [...prev, { questionId, answerValue: value }]
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    try {
      let resumeUrl = ''

      // Fetch fresh job data to get current question IDs
      const freshJobRes = await instance.get(`/jobs/${props.jobId}`)
      const freshQuestions = freshJobRes.data.data.questions

      // Match responses to fresh question IDs by question text
      const updatedResponses = responses.map((response) => {
        const matchingQuestion = freshQuestions.find(
          (q: any) => props.questions?.find((pq: any) => 
            pq._id === response.questionId && pq.questionText === q.questionText
          )
        )
        if (matchingQuestion) {
          return {
            questionId: String(matchingQuestion._id),
            answerValue: response.answerValue
          }
        }
        return response
      })

      // 1. Upload Resume if selected
      if (resumeFile) {
        const formData = new FormData()
        formData.append('file', resumeFile)
        const uploadRes = await instance.post('/upload/resume', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        resumeUrl = uploadRes.data.url
      }

      // 2. Submit Application
      await instance.post(
        `/jobs/${props.jobId}/apply`,
        {
          responses: updatedResponses,
          resumeUrl,
        },
        {
          headers: {
            access_token: localStorage.getItem('token') || '',
          },
          withCredentials: true,
        }
      )

      setOpen(false)
      alert('Application submitted successfully!')
    } catch (error: any) {
      console.error('Error submitting application:', error)
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Something went wrong'
      alert(`Error: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-44 h-14 shrink font-semibold text-lg text-white bg-[#4640DE]"
          variant="outline"
        >
          Apply
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="h-6">Submit your application</DialogTitle>
            <DialogDescription>
              The following is required and will only be shared with Nomad
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {props?.questions?.map((question: any) => {
              return (
                <div key={question?._id}>
                  <Label className="py-3" htmlFor={String(question?._id)}>
                    {question?.questionText}
                  </Label>
                  <Textarea
                    id={String(question?._id)}
                    required
                    onChange={(e) =>
                      handleAnswerChange(String(question._id), e.target.value)
                    }
                    placeholder="Write your answer here.."
                    maxLength={500}
                  />
                </div>
              )
            })}

            <div className="flex justify-between items-center pt-2">
              <p className="font-medium text-gray-900">Attach your resume</p>
              <div className="relative">
                <Button
                  variant="outline"
                  className="border-dashed border-2 border-[#4640DE] text-[#4640DE] hover:bg-[#4640DE]/5 text-sm font-semibold relative overflow-hidden"
                  type="button"
                >
                  {resumeFile ? resumeFile.name : 'Attach Resume/CV'}
                </Button>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setResumeFile(e.target.files[0])
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="text-white bg-[#4640DE]"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ApplyButton
