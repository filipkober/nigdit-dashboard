import { useState } from "react"

type TextAreaProps = {
  className?: string,
  name: string,
  placeholder?: string,
  initialValue?: string,
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  rows?: number,
  cols?: number,
}
export default function TextArea({className, name, placeholder, initialValue, onChange, rows, cols}: TextAreaProps) {
    const [value, setValue] = useState<string>(initialValue || "")
  return (
    <div className={className}>
        <textarea className="outline-none bg-scroll bg-cover scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll resize-none bg-backgroundL dark:bg-backgroundD border-black border-2 hover:bg-foregroundL dark:hover:bg-highlightD rounded-md p-1 h-full w-full" name={name} placeholder={placeholder} value={onChange ? initialValue : value} onChange={onChange ? onChange : (e) => {setValue(e.target.value)}}/>
    </div>
  )
}
