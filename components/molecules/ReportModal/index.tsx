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
    };
    const reportToNigdit = () => {
        if(id)
        console.log(`Reported ${contentType} with id ${id} to nigdit`);
    };


    return (
        <div className={(isOpen ? "block" : "hidden") + " fixed z-10 top-1/3 ls:top-[50vh] left-0 ls:left-[25vw] w-[calc(100vw-2rem)] mx-4 ls:w-[50vw] h-[250px] bg-backgroundL dark:bg-backgroundD rounded-lg border-2 border-foregroundL dark:border-black"}>
            <div className="flex mx-2 mt-2 text-xl">
            <p>Report</p>
            <p className="ml-auto">X</p>
            </div>
            <Button variant={"button"} content={"To subnigdit"} />
            <Button variant={"button"} content={"To nigdit"} className="w-[10rem]" />
        </div>
    );
};

export default ReportModal;