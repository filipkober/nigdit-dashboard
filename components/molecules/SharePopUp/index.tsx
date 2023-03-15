import Button from "../../atoms/Button";

const SharePopUp = () => {

return (
    <div className={(isOpen ? "block" : "hidden") + " fixed z-10 top-1/3 ls:top-[50vh] left-0 ls:left-[30vw] w-[calc(100vw-2rem)] mx-4 ls:w-[30vw] h-[150px] bg-backgroundL dark:bg-backgroundD rounded-lg border-2 border-foregroundL dark:border-black"}>
        <div className="w-screen h-screen z-[-2] bg-[rgba(20,20,20,0.2)] fixed inset-0" />
        <div className="z-[501]">
        <div className="flex mx-2 mt-2 text-xl">
        <p>Report</p>
        <p className="ml-auto cursor-pointer"><a onClick={onClose}>X</a></p>
        </div>
        <div className="mt-4 flex flex-col ls:flex-row justify-around ls:justify-self-auto h-[70%] w-full">
        <Button variant={"button"} content={"OK"} className={""}  />
        </div>
        </div>
    </div>
);
}
export default SharePopUp