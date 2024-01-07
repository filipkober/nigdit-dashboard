import { useState } from "react"
import { UseFormRegister } from "react-hook-form"

type TextAreaProps = {
  className?: string,
  name: string,
  placeholder?: string,
  initialValue?: string,
  rows?: number,
  cols?: number,
  maxLength?: number,
  register: UseFormRegister<any>
}
export default function TextArea({className, name, placeholder, initialValue, register, rows, cols, maxLength = 300}: TextAreaProps) {
    const [value, setValue] = useState<string>(initialValue || "")
  return (
    <div className={className}>
        <textarea className="outline-none bg-scroll bg-cover scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll resize-none bg-backgroundL dark:bg-backgroundD border-black border-2 hover:bg-foregroundL dark:hover:bg-highlightD rounded-md p-1 h-full w-full" placeholder={placeholder} {...register(name)} maxLength={maxLength}/>
    </div>
  )
}
