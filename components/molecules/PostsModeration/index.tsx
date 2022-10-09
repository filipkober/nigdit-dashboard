import Button from "../../atoms/Button";
import Image from 'next/future/image';
import { useState } from "react";

type PostsModerationProps = {
    className?: string,
}

export default function PostsModeration({className}: PostsModerationProps){
    type postTypeType = "text" | "image" | "video";
    const [random, setRandom] = useState<number>(Math.floor(Math.random() * 3));

    let postType: postTypeType;
    if(random === 0){
        postType = "text";
    } else if(random === 1){
        postType = "image";
    } else {
        postType = "video";
    }


    const imgSrc = "https://source.unsplash.com/random/800x800";

    let postContent: JSX.Element = <></>;
    if(postType === "text"){
        postContent = <p className="col-start-2 row-start-3 col-span-full ts:text-3xl">{"This is a post content"}</p>
    } else if(postType === "image"){
        postContent = <Image src={"https://source.unsplash.com/random/800x1500"} alt="makpaj" width={800} height={200} className="col-start-2 row-start-3 col-span-full row-span-3 max-h-[40vh] object-cover w-auto" loader={() => imgSrc} unoptimized/>
    } else if(postType === "video"){
        postContent = <video className="col-start-2 row-start-3 col-span-full row-span-3 max-h-[40vh] object-cover h-[40vh]" controls src="https://www.w3schools.com/html/mov_bbb.mp4"/>
    }
    return (
        <div className={"grid gap-4 grid-cols-4 tl:grid-cols-6 grid-rows-6 p-4 " + className}>
            <p className="col-start-1 row-start-1 ts:text-3xl">Author:</p>
            <p className="col-start-2 row-start-1 col-span-full ts:text-3xl">{"u/JakubSr"}</p>
            <p className="col-start-1 row-start-2 ts:text-3xl">Title:</p>
            <p className="col-start-2 row-start-2 col-span-full ts:text-3xl">{"This is a post title"}</p>
            <p className="col-start-1 row-start-3 row-span-3 ts:text-3xl">Content:</p>
            {postContent}
            <p className="col-start-1 row-start-6 ts:text-3xl">Actions:</p>
            <Button className="col-start-2 row-start-6 ts:text-3xl" variant="button" content="Ban user" />
            <Button className="col-start-3 row-start-6 ts:text-3xl" variant="button" content="Delete post" />
            <Button className="col-start-4 row-start-6 ts:text-3xl" variant="button" content="Skip" />
        </div>
    )
}