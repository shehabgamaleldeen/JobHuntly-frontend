import { Toaster as Sonner } from 'sonner'
import { type ComponentProps } from 'react'

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-zinc-950 group-[.toaster]:border-zinc-200 group-[.toaster]:shadow-lg group-[.toaster]:p-6 group-[.toaster]:text-lg group-[.toaster]:font-medium w-full md:min-w-[400px] md:max-w-[500px]',
          description: 'group-[.toast]:text-zinc-500',
          actionButton:
            'group-[.toast]:bg-zinc-900 group-[.toast]:text-zinc-50',
          cancelButton:
            'group-[.toast]:bg-zinc-100 group-[.toast]:text-zinc-500',
          error:
            'group-[.toaster]:!bg-red-50 group-[.toaster]:!border-red-200 group-[.toaster]:!text-red-700',
          success:
            'group-[.toaster]:!bg-emerald-50 group-[.toaster]:!border-emerald-200 group-[.toaster]:!text-emerald-700',
        },
        style: { zIndex: 99999 },
      }}
      position="bottom-left"
      {...props}
    />
  )
}

export { Toaster }
