import { GenericComponentProps } from '../../../models/GenericComponentProps'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { UserState, setUserVotes } from '../../../store/userSlice'
import { ContentType } from '../../../models/ContentType'
import VoteService from '../../../util/requests/VoteService'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

type VoteProps = {
  contentId: number,
  contentType: ContentType,
  variant: "vertical" | "horizontal",
  votes: number,
  arrowSize?: number
} & GenericComponentProps
export default function Vote({className, variant, contentId, votes, contentType, arrowSize = 20}: VoteProps) {

  const dispatch = useDispatch();

  const user = useSelector((state: UserState) => state.user)

  const router = useRouter();

  const [mutableVotes, setMutableVotes] = useState<number>(Number(votes));

  useEffect(() => {
    setMutableVotes(Number(votes));
  }, [votes])

  let userVote = 0;
  if(user.votes){
    if(contentType === "post"){
      if(user.votes.upvotes.posts.includes(contentId.toString())) userVote = 1;
      else if(user.votes.downvotes.posts.includes(contentId.toString())) userVote = -1;
    }else if(contentType === "comment"){
      if(user.votes.upvotes.comments.includes(contentId.toString())) userVote = 1;
      else if(user.votes.downvotes.comments.includes(contentId.toString())) userVote = -1;
    }else if(contentType === "reply"){
      if(user.votes.upvotes.replies.includes(contentId.toString())) userVote = 1;
      else if(user.votes.downvotes.replies.includes(contentId.toString())) userVote = -1;
    }
  }

  const voteService = new VoteService();

  const upvote = async () => {
    if(!user.confirmed) return router.push("/login");
    const newVotes = await voteService.upvote(contentType, contentId);
    if(newVotes){
      if(userVote === 1) setMutableVotes(mutableVotes - 1);
      else if(userVote === -1) setMutableVotes(mutableVotes + 2);
      else setMutableVotes(mutableVotes + 1);
      dispatch(setUserVotes(newVotes))
    }
  }
  const downvote = async () => {
    if(!user.confirmed) return router.push("/login");
    const newVotes = await voteService.downvote(contentType, contentId);
    if(newVotes){
      if(userVote === 1) setMutableVotes(mutableVotes - 2);
      else if(userVote === -1) setMutableVotes(mutableVotes + 1);
      else setMutableVotes(mutableVotes - 1);
      dispatch(setUserVotes(newVotes))
    }
  }

  const [charNum] = useState<number>(mutableVotes.toString().length);
  const voteDivRef = useRef<HTMLDivElement>(null);

  // voteDivRef.current?.style.setProperty("width", (charNum + 1).toString() + "ch");

  return (
    <div className={className}>
      <div className={`flex ` + (variant === "vertical" ? "flex-col items-center w-[4ch] " : "flex-row items-start gap-2 flex-shrink-0")}>
          <ImArrowUp className={`cursor-pointer ` + (userVote === 1 ? "text-orange-500" : "text-gray-400")} size={arrowSize} onClick={upvote}/>
          <div ref={voteDivRef}>
          <p className={`font-['Roboto'] text-center`}>{Intl.NumberFormat('en', {notation: 'compact'}).format(mutableVotes)}</p>
          </div>
          <ImArrowDown className={`cursor-pointer ` + (userVote === -1 ? "text-blue-500" : "text-gray-400")} size={arrowSize} onClick={downvote}/>
      </div>
    </div>
  )
}
