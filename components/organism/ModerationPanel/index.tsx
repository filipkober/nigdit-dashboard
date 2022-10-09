import Button from "../../atoms/Button";
import CommentsModeration from "../../molecules/CommentsModeration";
import PostsModeration from "../../molecules/PostsModeration";
import SubnigditsModeration from "../../molecules/SubnigditsModeration";

type ModerationPanelProps = {
    tab: number,
    className?: string,
}
export default function ModerationPanel({tab, className}: ModerationPanelProps){
    // display the contents depending on the tab
    // tab 0 - posts
    // tab 1 - comments
    // tab 2 - subnigdits
    if(tab < 0 || tab > 2){
        return null;
    }

    if(tab === 0){ return(
        <PostsModeration className="h-screen"/>
    )}
    if(tab === 1){
        return(
            <CommentsModeration className="h-screen" />
        )
    }
    if(tab === 2){
        return(
            <SubnigditsModeration className="h-screen" />
        )
    }

    return null;
    }