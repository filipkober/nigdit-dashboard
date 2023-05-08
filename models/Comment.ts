import { count } from 'console';
import { StrapiPost } from './Post';
import Reply, { StrapiReply } from './Reply';
import { StrapiUser } from './User';
import { emptyMedia } from './Media';

type Comment = {
  id?: number;
  votes?: number;
  content?: string;
  reports?: number;
  createdAt?: string;
  owner?: StrapiUser;
  post?: StrapiPost;
  replies?: number;
};

type StrapiComment = {
  id: number;
  attributes: {
    votes: number;
    content: string;
    reports: number;
    createdAt: string;
    owner: {
      data: StrapiUser;
    };
    post: {
      data: StrapiPost;
    };
    replies?: {
      data: { attributes: { count: number } };
    };
  };
};

type StrapiCommentExtended = {
  id: number;
  attributes: {
    votes: number;
    content: string;
    reports: number;
    createdAt: string;
    post: {
      data: StrapiPost;
    };
    replies: {
      data: StrapiReply[];
    };
  };
};

type CommentN = {
  id: number;
  votes: number;
  content: string;
  reports: number;
  createdAt: string;
  owner: {
    data: StrapiUser;
  };
  post: {
    data: StrapiPost;
  };
  replies: {
    data: {
      count: number;
    };
  };
};

type CommentExtended = {
  id: number;
  votes: number;
  content: string;
  reports: number;
  createdAt: string;
  post: {
    data: StrapiPost;
  };
  replies: StrapiReply[];
};

const commentAdapter = (c: StrapiComment): CommentN => {
  return {
    id: c.id,
    votes: c.attributes.votes,
    content: c.attributes.content,
    reports: c.attributes.reports,
    createdAt: c.attributes.createdAt,
    owner: c.attributes.owner,
    post: c.attributes.post,
    replies: {
      data: { count: c.attributes.replies?.data.attributes.count || 0 },
    },
  };
};

const extendedCommentAdapter = (c: StrapiCommentExtended): CommentExtended => {
  return {
    id: c.id,
    votes: c.attributes.votes,
    content: c.attributes.content,
    reports: c.attributes.reports,
    createdAt: c.attributes.createdAt,
    post: c.attributes.post,
    replies: c.attributes.replies.data,
  };
};

const exampleComment: StrapiComment = {
  id: 0,
  attributes: {
    votes: 0,
    content: '',
    reports: 0,
    createdAt: '',
    owner: {
      data: {
        id: 0,
        attributes: {
          username: '',
          email: '',
        },
      },
    },
    post: {
      data: {
        id: 0,
        attributes: {
          Title: '',
          Description: '',
          Votes: 0,
          Reports: 0,
          createdAt: new Date(),
          Type: 'Text',
          nsfw: false,
          owner: {
            data: {
              id: 0,
              attributes: {
                username: '',
                email: '',
              },
            },
          },
          subnigdit: {
            data: {
              id: 0,
              attributes: {
                name: '',
                description: '',
                createdAt: new Date(),
                reports: 0,
                icon: emptyMedia,
                subscribers: { data: [] }
              },
            },
          },
        },
      },
    },
  },
};

export default Comment;
export type { StrapiComment, CommentN, StrapiCommentExtended, CommentExtended };
export { commentAdapter, exampleComment, extendedCommentAdapter };
