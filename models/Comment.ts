import Reply from "./Reply";

type Comment = {
  id?: number;
    votes?: number;
    content?: string;
    reports?: number;
    createdAt?: string;
    replies?: Reply[];
};

type StrapiComment = {
  id: number;
  attributes: {
    votes: number;
    content: string;
    reports: number;
    createdAt: string;
    replies?: Reply[];
  };
};

export default Comment;
export type { StrapiComment }
