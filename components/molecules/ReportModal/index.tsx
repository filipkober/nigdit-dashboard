import Button from "../../atoms/Button";

type ReportModalProps = {
    isOpen: boolean;
    contentType: 'post' | 'comment' | 'subnigdit';
    id?: number;
    onClose: () => void;
};

const ReportModal = ({ isOpen, onClose, contentType, id }: ReportModalProps) => {

    const reportToSubnigdit = () => {
        if(id)
        console.log(`Reported ${contentType} with id ${id} to subnigdit`);
        onClose();
    };
    const reportToNigdit = () => {
        if(id)
        console.log(`Reported ${contentType} with id ${id} to nigdit`);
        onClose();
    };


    return (
        <div className={(isOpen ? "block" : "hidden") + " fixed z-10 top-1/3 ls:top-[50vh] left-0 ls:left-[30vw] w-[calc(100vw-2rem)] mx-4 ls:w-[30vw] h-[150px] bg-backgroundL dark:bg-backgroundD rounded-lg border-2 border-foregroundL dark:border-black"}>
            <div className="w-screen h-screen z-[-2] bg-[rgba(20,20,20,0.2)] fixed inset-0" />
            <div className="z-[501]">
            <div className="flex mx-2 mt-2 text-xl">
            <p>Report</p>
            <p className="ml-auto cursor-pointer"><a onClick={onClose}>X</a></p>
            </div>
            <div className="mt-4 flex flex-col ls:flex-row justify-around ls:justify-self-auto h-[70%] w-full">
            <Button variant={"button"} content={"To subnigdit"} className={"mx-2 ls:w-[15rem]"} onClick={reportToSubnigdit} />
            <Button variant={"button"} content={"To nigdit"} className={"mx-2 ls:w-[15rem]"} onClick={reportToNigdit} />
            </div>
            </div>
        </div>
    );
};

export default ReportModal;