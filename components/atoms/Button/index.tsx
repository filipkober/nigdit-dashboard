type ButtonProps = {
    variant: "submit" | "button" | "inputFile",
    onClick?: (a: any) => any,
    content: string,
    className?: string,
}


export default function Button({variant,onClick, content, className}: ButtonProps){
    let button;
    if (variant === "submit"){
        button = <input type={"submit"} onClick={onClick} value={content} className="bg-backgroundL dark:bg-backgroundD border-black border-2 font-bold hover:bg-foregroundL dark:hover:bg-highlightD rounded-md p-1 hover:cursor-pointer w-full h-full"/>
    } else if (variant === "button"){
        button = <button onClick={onClick} className="bg-backgroundL dark:bg-backgroundD border-black border-2 font-bold hover:bg-foregroundL dark:hover:bg-highlightD rounded-md p-1 w-full" type="button">{content}</button>
    } else if (variant === "inputFile"){
        button = <input type={"file"} onClick={onClick} value={content} className="bg-backgroundL dark:bg-backgroundD border-black border-2 font-bold hover:bg-foregroundL dark:hover:bg-highlightD rounded-md p-1 hover:cursor-pointer w-full"/>
    }
    return (
        <div className={className}>
        {button}
        </div>
    )
}