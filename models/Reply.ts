type Reply = {
  id?: number;
  votes?: number;
  content?: string;
  reports?: number;
  createdAt?: string;
};

type StrapiReply = {
  id: number;
  attributes: {
    votes: number;
    content: string;
    reports: number;
    createdAt: string;
  };
};

type ReplyN = {
  id: number;
  votes: number;
  content: string;
  reports: number;
  createdAt: Date;
};

const replyAdapter = (r: StrapiReply):ReplyN => {
  return {
    id: r.id,
    votes: r.attributes.votes,
    content: r.attributes.content,
    reports: r.attributes.reports,
    createdAt: new Date(r.attributes.createdAt),
  }
};

export default Reply;
export type {StrapiReply, ReplyN};
export { replyAdapter }