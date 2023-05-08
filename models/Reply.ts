import { StrapiUser } from "./User";

type Reply = {
  id?: number;
  votes?: number;
  content?: string;
  reports?: number;
  createdAt?: string;
  count: number;
};

type StrapiReply = {
  id: number;
  attributes: {
    votes: number;
    content: string;
    reports: number;
    createdAt: string;
    count: number;
    owner: {
      data: StrapiUser;
    };
  };
};

type ReplyN = {
  id: number;
  votes: number;
  content: string;
  reports: number;
  createdAt: Date;
  count: number;
  owner: StrapiUser;
};

const replyAdapter = (r: StrapiReply):ReplyN => {
  return {
    id: r.id,
    votes: r.attributes.votes,
    content: r.attributes.content,
    reports: r.attributes.reports,
    createdAt: new Date(r.attributes.createdAt),
    count: r.attributes.count,
    owner: r.attributes.owner.data
  }
};

export default Reply;
export type {StrapiReply, ReplyN};
export { replyAdapter }