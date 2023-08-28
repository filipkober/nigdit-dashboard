import { useState } from "react"
import { UseFormRegister } from "react-hook-form"

type InputProps = {
  className?: string,
  type: "text" | "password" | "email" | "number",
  name: string,
  placeholder?: string,
  initialValue?: string,
  maxLength?: number,
  minLength?: number,
  register: UseFormRegister<any>,
}
export default function Input({className, type, name, placeholder, initialValue, register, maxLength = 200, minLength = 0}: InputProps) {
    const [value, setValue] = useState<string>(initialValue || "")
  return (
    <div className={className}>
        <input minLength={minLength} type={type} className="outline-none bg-backgroundL dark:bg-backgroundD border-black border-2 hover:bg-foregroundL dark:hover:bg-highlightD rounded-md p-1 w-full h-full" placeholder={placeholder} {...register(name)} maxLength={maxLength}/>
    </div>
  )
}
