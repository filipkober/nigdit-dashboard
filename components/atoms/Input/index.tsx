import { useState } from "react"

type InputProps = {
  className?: string,
  type: "text" | "password" | "email" | "number",
  name: string,
  placeholder?: string,
  initialValue?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
export default function Input({className, type, name, placeholder, initialValue, onChange}: InputProps) {
    const [value, setValue] = useState<string>(initialValue || "")
  return (
    <div className={className}>
        <input type={type} className="bg-backgroundL dark:bg-backgroundD border-black border-2 hover:bg-foregroundL dark:hover:bg-foregroundD rounded-md p-1" name={name} placeholder={placeholder} value={onChange ? initialValue : value} onChange={onChange ? onChange : (e) => {setValue(e.target.value)}}/>
    </div>
  )
}
