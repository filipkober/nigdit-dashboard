import { UseFormRegister } from "react-hook-form";

type Parameters = {
    className?: string,
    fieldClassName?: string,
    id?: string,
    placeholder: string,
    type: "text" | "textArea" | "password" | "email" | "number" | "date" | "file" | "checkbox" | "radio" | "range" | "color" | "search" | "tel" | "time" | "url" | "week" | "month" | "hidden" | "datetime-local" | "datetime" | "image" | "month" | "week" | "time" | "url" | "tel" | "search" | "color" | "range" | "radio" | "checkbox" | "file" | "date" | "number" | "email" | "password" | "text" | "textArea",
    defaultValue?: string,
    register: UseFormRegister<any>,
    name: string,
}

export default function InputField({fieldClassName, className, id, placeholder, type, defaultValue, register, name} : Parameters)
{

    let input;
    switch(type){
        case "textArea":
            input = <textarea className={'focus:border-[#FF5C00] focus:ring-2 focus:ring-[#FF5C00] peer drop-shadow-lucifer w-[100%] px-[0.5rem] min-h-[2rem] h-[100%] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px] '+fieldClassName} id={id} placeholder={placeholder} defaultValue={defaultValue} {...register(name)}/>
            break;
        default:
            input = <input className={'focus:border-[#FF5C00] focus:ring-2 focus:ring-[#FF5C00] peer drop-shadow-lucifer w-[100%] px-[0.5rem] min-h-[2rem] h-[100%] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px] '+fieldClassName} id={id} placeholder={placeholder} type={type} defaultValue={defaultValue} {...register(name)}/>
    }

    return(
    <div className={className}>
        {/* <Field className='peer focus:border-[#FF5C00] focus:ring-2 focus:ring-[#FF5C00] invalid:ring-1 invalid:ring-pink-500 focus:invalid:ring-2 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 drop-shadow-lucifer w-[100%] mx-[0.5rem] px-[0.5rem] min-h-[2rem] h-[100%] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px]' id={id} name={name} placeholder={placeholder} type={type} value={value}/> */}
        {/* {peer ? (<p className="mt-[0.2rem]] invisible peer-invalid:visible text-pink-600 text-sm pl-2 w-[100%]">{peerValue}</p>) : ("")} */}
        {input}
    </div>
    );
}