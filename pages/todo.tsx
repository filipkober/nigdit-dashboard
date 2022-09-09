import { useState } from "react";
import TodoElement from "../components/atoms/TodoElement";
import TodoForm from "../components/atoms/TodoForm";
import TodoList from "../components/atoms/TodoList";

export interface listElement {
    id: number,
    title: string
}

const todo = () => {
    // przydatne funkcje: array.find(), array.map()
    // map https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    // filter https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    // dodatkowe info: jeśli tworzycie komponenty w pętli potrzebują mieć unikatowy atrybut 'key', 
    // w tym wypadku można zrobić key={id}

    const [val, setValData] = useState<listElement[]>([])
    const [counter, setCounter] = useState<number>(1)
    const setVal = (e: string) => {
        const newE: listElement = {
            id: counter,
            title: e
        }
        setValData([...val, newE])
        setCounter(counter + 1);
    }
    const deleteE = (id: number) => {
        setValData(val.filter(val => val.id !== id))
    }
    return(
        <div className="w-[100%] h-screen flex flex-col items-center mt-2">
        <div className="bg-black w-[12vw]">
        <TodoForm setVal={setVal}/>
        <TodoList>
            {val.map(v => {
                return(
                    <TodoElement key={v.id} id={v.id} title={v.title} deleteE={deleteE} />
                )
            })}
        </TodoList>
        </div>
        </div>
    )
}
export default todo;