import { emptyStrapiMedia } from './Media';
import { StrapiPost } from './Post';
import { StrapiReply } from './Reply';
import { StrapiUser } from './User';

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

type StrapiCommentShallow = {
  id: number;
  attributes: {
    votes: number;
    content: string;
    reports: number;
    createdAt: string;
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
          provider: '',
          votes: {
            upvotes: {
              posts: [],
              comments: [],
              replies: [],
            },
            downvotes: {
              posts: [],
              comments: [],
              replies: [],
            },
          },
          confirmed: false
        },
      },
    },
    post: {
      data: {
        id: 0,
        attributes: {
          title: '',
          description: '',
          votes: 0,
          reports: 0,
          createdAt: new Date(),
          type: 'Text',
          nsfw: false,
          owner: {
            data: {
              id: 0,
              attributes: {
                username: '',
                email: '',
                provider: '',
                votes: {
                  upvotes: {
                    posts: [],
                    comments: [],
                    replies: [],
                  },
                  downvotes: {
                    posts: [],
                    comments: [],
                    replies: [],
                  },
                },
                confirmed: false
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
                icon: emptyStrapiMedia,
                subscribers: {
                  data: {
                    attributes: {
                      count: 0
                    }
                  }
                },
                name_uid: '',
                banner: {
                  data: {
                    id: 0,
                    attributes: {
                      name: '',
                      alternativeText: '',
                      width: 0,
                      height: 0,
                      ext: '',
                      url: '',
                      formats: {
                        large: {
                          url: ''
                        }
                      }
                    }
                  }
                },
                moderators: {
                  data: []
                },
                owner: {
                  data: {
                    id: 0,
                    attributes: {
                      username: '',
                      email: '',
                      posts: undefined,
                      comments: undefined,
                      replies: undefined,
                      profilePicture: undefined,
                      votes: {
                        upvotes: {
                          posts: [],
                          comments: [],
                          replies: []
                        },
                        downvotes: {
                          posts: [],
                          comments: [],
                          replies: []
                        }
                      },
                      aboutMe: undefined,
                      provider: '',
                      confirmed: false
                    }
                  }
                }
              },
            },
          },
          moderators: {
            data: []
          }
        },
      },
    },
  },
};

export default Comment;
export { commentAdapter, exampleComment, extendedCommentAdapter };
export type { CommentExtended, CommentN, StrapiComment, StrapiCommentExtended, StrapiCommentShallow };

