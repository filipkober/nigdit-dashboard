import Link from "next/link";
import Button from "../../atoms/Button";
type SubnigditsModerationProps = {
    className?: string,
}
const subnigditName = "jakubsr";
const href = "/n/" + subnigditName
export default function SubnigditsModeration({className}: SubnigditsModerationProps) {



    return (
        <div className={"grid gap-4 grid-cols-4 tl:grid-cols-6 grid-rows-6 p-4 " + className}>
            <p className="col-start-1 row-start-2 row-span-3 ts:text-3xl">Offending subnigdit:</p>
            <p className="col-start-2 row-start-2 col-span-full ts:text-3xl"><Link href={href} target="_blank">{"n/" + subnigditName}</Link></p>
            <p className="col-start-1 row-start-6 ts:text-3xl">Actions:</p>
            <Button className="col-start-2 row-start-6 ts:text-3xl" variant="button" content="Delete subnigdit" />
            <Button className="col-start-3 row-start-6 ts:text-3xl" variant="button" content="Skip" />
        </div>
    )
}