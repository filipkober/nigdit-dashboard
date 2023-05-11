import { string } from 'yup';
import Media from './Media';
import { StrapiSubnigdit } from './Subnigdit';
import { StrapiUser } from './User';
import { StrapiComment } from './Comment';

type Post = {
  id?: number;
  Title?: string;
  Description?: string;
  Votes?: number;
  Reports?: number;
  createdAt?: Date;
  Type?: 'Text' | 'Image' | 'Video' | 'Gif';
  nsfw?: boolean;
  Media?: Media;
  comments?: StrapiComment[];
  owner?: StrapiUser;
  subnigdit?: StrapiSubnigdit;
};

type StrapiPost = {
  id: number;
  attributes: {
    title: string;
    description?: string;
    votes: number;
    reports: number;
    createdAt: Date;
    type: 'Text' | 'Image' | 'Video' | 'Gif';
    nsfw: boolean;
    media?: Media;
    comments?: {
      data: StrapiComment[];
    };
    owner: {
      data: StrapiUser;
    };
    subnigdit: {
      data: StrapiSubnigdit;
    };
  };
};

type PostN = {
  title: string;
  description?: string;
  votes: number;
  reports: number;
  createdAt: Date;
  type: 'Text' | 'Image' | 'Video' | 'Gif';
  nsfw: boolean;
  media?: Media;
  comments?: {
    data: StrapiComment[];
  };
  owner: {
    data: StrapiUser;
  };
  subnigdit: {
    data: StrapiSubnigdit;
  };
};

const postAdapter = (p: StrapiPost): PostN => {
  return {
    title: p.attributes.title,
    description: p.attributes.description,
    votes: p.attributes.votes,
    reports: p.attributes.reports,
    createdAt: p.attributes.createdAt,
    type: p.attributes.type,
    nsfw: p.attributes.nsfw,
    media: p.attributes.media,
    comments: p.attributes.comments || { data: [] },
    owner: p.attributes.owner,
    subnigdit: p.attributes.subnigdit,
  };
};

export default Post;
export type { StrapiPost, PostN };
export { postAdapter };
