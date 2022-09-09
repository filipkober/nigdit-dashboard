import { useState } from "react";
import TodoElement from "../components/atoms/TodoElement";
import TodoForm from "../components/atoms/TodoForm";
import TodoList from "../components/atoms/TodoList";

const todo = () => {
    // przydatne funkcje: array.find(), array.map()
    // map https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    // find https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    // dodatkowe info: jeśli tworzycie komponenty w pętli potrzebują mieć unikatowy atrybut 'key', 
    // w tym wypadku można zrobić key={id}
    const [val, setVal] = useState<string>("")
    const elements = []
    const counter = 0; // nie jest wymagany
    const deleteE = () => {}
    return(
        <div className="w-[100%] h-screen flex flex-col items-center mt-2">
        <div className="bg-black w-[12vw]">
        <TodoForm setVal={setVal}/>
        <TodoList>
            <TodoElement title="cosaaaaaaaaa" id={0} deleteE={deleteE}/>
            
        </TodoList>
        </div>
        </div>
    )
}
export default todo;