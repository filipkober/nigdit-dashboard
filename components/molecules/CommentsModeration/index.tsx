import { GenericModerationPanelProps } from "../../../models/GenericModerationPanelProps";
import Report from "../../../models/Report";
import Button from "../../atoms/Button";

export default function CommentsModeration({className, report, onBanUser, onDeleteContent, onDismissReport}: GenericModerationPanelProps) {
    if(report === undefined){
        return <div className={className}>no reports</div>;
    }
    return (
        <div className={"grid gap-4 grid-cols-4 tl:grid-cols-6 grid-rows-6 p-4 " + className}>
            <p className="col-start-1 row-start-1 ts:text-3xl">Author:</p>
            <p className="col-start-2 row-start-1 col-span-full ts:text-3xl">u/{report.contentOwner?.username}</p>
            <p className="col-start-1 row-start-2 ts:text-3xl">Reason:</p>
            <p className="col-start-2 row-start-2 col-span-full ts:text-3xl">{report.reportMessage}</p>
            <p className="col-start-1 row-start-3 row-span-3 ts:text-3xl">Content:</p>
            <p className="col-start-2 row-start-3 col-span-full row-span-3 ts:text-3xl border-2 border-black dark:border-white overflow-scroll p-1">{report.contents}</p>
            <p className="col-start-1 row-start-6 ts:text-3xl">Actions:</p>
            <Button className="col-start-2 row-start-6 ts:text-3xl" variant="button" content="Ban user" onClick={() => {onBanUser(report)}} />
            <Button className="col-start-3 row-start-6 ts:text-3xl" variant="button" content="Delete comment" onClick={() => {onDeleteContent(report)}} />
            <Button className="col-start-4 row-start-6 ts:text-3xl ml-4" variant="button" content="Skip" onClick={() => {onDismissReport(report)}} />
        </div>
    )
}
