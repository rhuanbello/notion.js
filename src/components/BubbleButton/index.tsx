import { ComponentProps, ReactNode } from "react"

export interface BubbleButtonProps extends ComponentProps<'button'> {
  children: ReactNode

}

export const BubbleButton = (props: BubbleButtonProps) => {
  return (
    <button
      {...props}
      className='p-2 text-zinc-600 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-500 hover:bg-zinc-100 data-[active=true]:text-cyan-700'
    />
  )
}