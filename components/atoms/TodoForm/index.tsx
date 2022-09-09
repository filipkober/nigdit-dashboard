import { useState } from "react";

interface props {
    setVal: (a0: string) => void
}

const TodoForm = ({setVal}: props) => {
    
    const [inVal, setInVal] = useState<string>("");

    return (
        <div className="w-[12vw] m-0 rounded">
            <input type="text" value={inVal} onChange={() => {setInVal(inVal)}} className="w-[70%] border-solid border-gray-400 border-2 rounded"/>
            <button onClick={() => {setVal(inVal)}} className="text-center w-[30%] hover:bg-gray-300 bg-gray-500 border-gray-400 transition ease-in-out">Add item</button>
        </div>
    )
}
export default TodoForm;