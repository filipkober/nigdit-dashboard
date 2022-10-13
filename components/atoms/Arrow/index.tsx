import Image from 'next/image'
import TriangleDark from '../../../assets/TriangleDark.svg'
import TriangleDarkClicked from '../../../assets/TriangleDarkClicked.svg'
import TriangleLight from '../../../assets/TriangleLight.svg'
import TriangleLightClicked from '../../../assets/TriangleLightClicked.svg'

type ArrowProps = {
  commentId?: number,
  className?: string,
  clicked?: boolean,
  variant: "upvote" | "downvote",
  setVote: (vote: "upvote" | "downvote") => void,
}
export default function Arrow({className, variant, clicked, setVote, commentId}: ArrowProps) {
  return (
    <div className={className}>
      <a onClick={() => {setVote(variant)}} className="hover:cursor-pointer"><Image src={true ? (clicked ? TriangleDarkClicked : TriangleDark) : (clicked ? TriangleLightClicked : TriangleLight)} width={25} className={variant === "downvote" ? "rotate-180" : ""}/></a>
    </div>
  )
}
