import Button from "../../atoms/Button";
type CommentsModerationProps = {
    className?: string,
}

export default function CommentsModeration({className}: CommentsModerationProps) {

    const replyContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, itaque voluptatem fuga at nemo a minima odit excepturi modi asperiores vel earum quam consequatur aliquid consequuntur distinctio obcaecati nam sint iusto! Officiis nisi, facilis ab alias facere odio iure necessitatibus expedita inventore optio animi magni fuga corporis! Saepe, sit doloremque.";
    return (
        <div className={"grid gap-4 grid-cols-4 tl:grid-cols-6 grid-rows-6 p-4 " + className}>
            <p className="col-start-1 row-start-1 ts:text-3xl">Author:</p>
            <p className="col-start-2 row-start-1 col-span-full ts:text-3xl">{"u/JakubSr"}</p>
            <p className="col-start-1 row-start-2 row-span-3 ts:text-3xl">Content:</p>
            <p className="col-start-2 row-start-2 col-span-full row-span-3 ts:text-3xl">{replyContent}</p>
            <p className="col-start-1 row-start-6 ts:text-3xl">Actions:</p>
            <Button className="col-start-2 row-start-6 ts:text-3xl" variant="button" content="Ban user" />
            <Button className="col-start-3 row-start-6 ts:text-3xl" variant="button" content="Delete comment" />
            <Button className="col-start-4 row-start-6 ts:text-3xl" variant="button" content="Skip" />
        </div>
    )
}