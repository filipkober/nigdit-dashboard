import Report from "../../../models/Report";
import Button from "../../atoms/Button";
import CommentsModeration from "../../molecules/CommentsModeration";
import PostsModeration from "../../molecules/PostsModeration";
import RepliesModeration from "../../molecules/RepliesModeration";
import SubnigditsModeration from "../../molecules/RepliesModeration";

type ModerationPanelProps = {
    tab: number,
    className?: string,
    reports: Report[],
    onBanUser: (report: Report) => void,
    onDeleteContent: (report: Report) => void,
    onDismissReport: (report: Report) => void,
}
export default function ModerationPanel({tab, className, reports, onBanUser, onDeleteContent, onDismissReport}: ModerationPanelProps){
    // display the contents depending on the tab
    // tab 0 - posts
    // tab 1 - comments
    // tab 2 - subnigdits
    if(tab < 0 || tab > 2){
        return null;
    }

    if(tab === 0){ return(
        <PostsModeration className="h-screen" report={reports[0]} onBanUser={onBanUser} onDeleteContent={onDeleteContent} onDismissReport={onDismissReport}/>
    )}
    if(tab === 1){
        return(
            <CommentsModeration className="h-screen" report={reports[0]} onBanUser={onBanUser} onDeleteContent={onDeleteContent} onDismissReport={onDismissReport}/>
        )
    }
    if(tab === 2){
        return(
            <RepliesModeration className="h-screen" report={reports[0]} onBanUser={onBanUser} onDeleteContent={onDeleteContent} onDismissReport={onDismissReport}/>
        )
    }

    return null;
    }