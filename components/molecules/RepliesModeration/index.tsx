import Link from "next/link";
import Button from "../../atoms/Button";
import Report from "../../../models/Report";
import { GenericModerationPanelProps } from "../../../models/GenericModerationPanelProps";
import CommentService from "../../../util/requests/CommentService";
import { StrapiCommentShallow } from "../../../models/Comment";
import { useEffect, useState } from "react";
import ReplyService from "../../../util/requests/ReplyService";
import { StrapiReply, StrapiReplyExtended } from "../../../models/Reply";

export default function RepliesModeration({ className, report, onBanUser, onDeleteContent, onDismissReport }: GenericModerationPanelProps) {
  const [comment, setComment] = useState<StrapiCommentShallow>();

  useEffect(() => {
    if(report === undefined) return;
    replyService.getOne(report.contentId, true).then((res: any) => {
      setComment(res.attributes.comment.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report])

  if (report === undefined) {
    return <div className={className}>no reports</div>;
  }

  const replyService = new ReplyService();
  

  return (
    <div className={"grid gap-4 grid-cols-4 tl:grid-cols-6 grid-rows-8 p-4 " + className}>
    <p className="col-start-1 row-start-1 ts:text-3xl">Author:</p>
    <p className="col-start-2 row-start-1 col-span-full ts:text-3xl">u/{report.contentOwner?.username}</p>
    <p className="col-start-1 row-start-2 row-span-3 ts:text-3xl">Comment:</p>
    <p className="col-start-2 row-start-2 col-span-full row-span-3 ts:text-3xl border-2 border-black dark:border-white overflow-scroll p-1">{comment?.attributes.content}</p>
    <p className="col-start-1 row-start-5 row-span-3 ts:text-3xl">Reply:</p>
    <p className="col-start-2 row-start-5 col-span-full row-span-3 ts:text-3xl border-2 border-black dark:border-white overflow-scroll p-1">{report.contents}</p>
    <p className="col-start-1 row-start-6 row-span-2 ts:text-3xl">Report Message:</p>
    <p className="col-start-2 row-start-6 col-span-full row-span-2 ts:text-3xl border-2 border-black dark:border-white overflow-scroll p-1">{report.reportMessage}</p>
    <p className="col-start-1 row-start-8 ts:text-3xl">Actions:</p>
    <Button className="col-start-2 row-start-8 ts:text-3xl" variant="button" content="Ban user" onClick={() => { onBanUser(report) }} />
    <Button className="col-start-3 row-start-8 ts:text-3xl" variant="button" content="Delete comment" onClick={() => { onDeleteContent(report) }} />
    <Button className="col-start-4 row-start-8 ts:text-3xl ml-4" variant="button" content="Skip" onClick={() => { onDismissReport(report) }} />
  </div>
  );
}