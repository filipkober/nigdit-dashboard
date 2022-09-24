import Image from 'next/image'
import TriangleDark from '../../../assets/TriangleDark.svg'
import TriangleDarkClicked from '../../../assets/TriangleDarkClicked.svg'

type ArrowProps = {
  className?: string,
  clicked?: boolean,
  variant: "upvote" | "downvote",
  setVote: (vote: "upvote" | "downvote") => void,
}
export default function Arrow({className, variant, clicked, setVote}: ArrowProps) {
  return (
    <div className={className}>
      <a onClick={() => {setVote(variant)}} className="hover:cursor-pointer"><Image src={clicked ? TriangleDarkClicked : TriangleDark} width={25} className={variant === "downvote" ? "rotate-180" : ""}/></a>
    </div>
  )
}
