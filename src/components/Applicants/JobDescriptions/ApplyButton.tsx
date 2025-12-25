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
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

type Question = {
  _id: string
  questionText: string
}

type ApplyButtonProps = {
  questions?: Question[]
  jobId: string
}

type FormValues = {
  answers: Record<string, string> // key is questionId, value is answer
  resume: FileList
}

export function ApplyButton(props: ApplyButtonProps) {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>()

  const resumeFile = watch('resume')

  // Helper to get resume name safely
  const resumeName =
    resumeFile && resumeFile.length > 0 ? resumeFile[0].name : null

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      let resumeUrl = ''

      // 1. Upload Resume
      if (data.resume && data.resume[0]) {
        const formData = new FormData()
        formData.append('file', data.resume[0])
        const uploadRes = await instance.post('/upload/resume', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        resumeUrl = uploadRes.data.url
      }

      // 2. Format Responses
      const formattedResponses = Object.entries(data.answers || {}).map(
        ([questionId, answerValue]) => ({
          questionId,
          answerValue,
        })
      )

      // 3. Submit Application
      await instance.post(
        `/jobs/${props.jobId}/apply`,
        {
          responses: formattedResponses,
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
      toast.success('Application submitted successfully!')
      reset()
    } catch (error: any) {
      console.error(error)
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error('You must be logged in to apply.')
      } else {
        toast.error(
          error?.response?.data?.message ||
            'Something went wrong. Please try again.'
        )
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-44 h-14 shrink font-semibold text-lg text-white bg-[#4640DE] hover:bg-[#3b36b5]"
          variant="outline"
        >
          Apply
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="h-6">Submit your application</DialogTitle>
            <DialogDescription>
              Please fill out the form below to apply for this position.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {props?.questions?.map((question) => {
              return (
                <div key={question?._id}>
                  <Label className="py-2 inline-block" htmlFor={question._id}>
                    {question?.questionText}
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id={question._id}
                    placeholder="Write your answer here.."
                    maxLength={500}
                    {...register(`answers.${question._id}`, {
                      required: 'This field is required',
                    })}
                    className={
                      errors.answers?.[question._id] ? 'border-red-500' : ''
                    }
                  />
                  {errors.answers?.[question._id] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.answers?.[question._id]?.message}
                    </p>
                  )}
                </div>
              )
            })}

            <div className="flex flex-col gap-2 pt-2">
              <div className="flex justify-between items-center">
                <Label className="font-medium text-gray-900">
                  Attach your resume <span className="text-red-500">*</span>
                </Label>
              </div>

              <div className="relative w-full">
                <Button
                  variant="outline"
                  className={`w-full h-12 border-dashed border-2 ${
                    errors.resume
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-[#4640DE] text-[#4640DE] hover:bg-[#4640DE]/5'
                  } text-sm font-semibold relative overflow-hidden flex items-center justify-center gap-2`}
                  type="button"
                >
                  {resumeName ? resumeName : 'Attach Resume/CV (PDF, DOC)'}
                </Button>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx"
                  {...register('resume', {
                    required: 'Resume is required',
                  })}
                />
              </div>
              {errors.resume && (
                <p className="text-red-500 text-sm">
                  {errors.resume.message as string}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              className="text-white bg-[#4640DE] hover:bg-[#3b36b5] w-full"
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
