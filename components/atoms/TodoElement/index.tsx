interface props {
    title: string,
    id: number,
    deleteE: (arg0: number) => void,
}

const TodoElement = ({title, deleteE, id}: props) => {
    
    return (
        <div>
        <span className="float-left w-[1vw]">{id || 0}.</span>
        <div className="bg-gray-500 border-solid border-b-2 w-[11vw] rounded float-right max-h-[2rem] flex-none flex">
            <span className="ml-2 text-gray-200 w-[85%] text-ellipsis whitespace-nowrap overflow-hidden">{title}</span><button onClick={() => {deleteE(id)}} className="bg-red-500 rounded hover:bg-red-300 transition ease-in-out text-white w-[15%] font-bold float-right">X</button>
        </div>
        </div>
    )
}
export default TodoElement;