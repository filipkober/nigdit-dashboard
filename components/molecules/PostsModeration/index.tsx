import Button from "../../atoms/Button";
import Image from 'next/image';
import { useState } from "react";
import Report from "../../../models/Report";
import { GenericModerationPanelProps } from "../../../models/GenericModerationPanelProps";


export default function PostsModeration({className, report, onBanUser, onDeleteContent, onDismissReport}: GenericModerationPanelProps){
    type postTypeType = "text" | "image" | "video";
    const [random, setRandom] = useState<number>(2);
    if(report === undefined){
        return <div className={className}>no reports</div>;
    }
    let postType: postTypeType;
    if(!!report?.contents){
        postType = "text";
    } else if(!!report?.media){
        if(report.media.ext === "mp4"){
            postType = "video";
        } else {
            postType = "image";
        }
    } else {
        postType = "text";
    }


    const imgSrc = "https://source.unsplash.com/random/800x800";

    let postContent: JSX.Element = <></>;
    if(postType === "text"){
        postContent = <p className="col-start-2 row-start-3 col-span-full row-span-3 ts:text-3xl overflow-scroll border-black border-2 p-1 dark:border-white">{report?.contents}</p>
    } else if(postType === "image"){
        postContent = <Image src={process.env.NEXT_PUBLIC_STRAPI_URL! + report?.media?.url} alt="makpaj" width={800} height={200} className="col-start-2 row-start-3 col-span-full row-span-3 max-h-[40vh] object-cover w-auto" loader={() => process.env.NEXT_PUBLIC_STRAPI_URL! + report?.media?.url} unoptimized/>
    } else if(postType === "video"){
        postContent = <video className="col-start-2 row-start-3 col-span-full row-span-3 max-h-[40vh] object-cover h-[40vh]" controls src={process.env.NEXT_PUBLIC_STRAPI_URL! + report?.media?.url}/>
    }
    return (
        <div className={"grid gap-4 grid-cols-4 tl:grid-cols-6 grid-rows-6 p-4 " + className}>
            <p className="col-start-1 row-start-1 ts:text-3xl">Author:</p>
            <p className="col-start-2 row-start-1 col-span-full ts:text-3xl">{"u/"+report?.contentOwner?.username}</p>
            <p className="col-start-1 row-start-2 ts:text-3xl">Reason:</p>
            <p className="col-start-2 row-start-2 col-span-full ts:text-3xl">{report?.reportMessage}</p>
            <p className="col-start-1 row-start-3 row-span-3 ts:text-3xl">Content:</p>
            {postContent}
            <p className="col-start-1 row-start-6 ts:text-3xl">Actions:</p>
            <Button className="col-start-2 row-start-6 ts:text-3xl" variant="button" content="Ban user" onClick={() => {onBanUser(report)}} />
            <Button className="col-start-3 row-start-6 ts:text-3xl" variant="button" content="Delete post" onClick={() => {onDeleteContent(report)}} />
            <Button className="col-start-4 row-start-6 ts:text-3xl" variant="button" content="Skip" onClick={() => {onDismissReport(report)}} />
        </div>
    )
}