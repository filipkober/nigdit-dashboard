interface props {
    children?: JSX.Element | JSX.Element[] | string,
}

const TodoList = ({children}: props) => {
    return (
        <div className="bg-gray-400 border-rounded w-[12vw] flex flex-col pb-2 m-0">
        <p className="font-mono">Lista:</p>
            {children}
        </div>
    )
}
export default TodoList;