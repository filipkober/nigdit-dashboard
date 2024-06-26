import { StrapiComment } from './Comment';
import Media, { StrapiMedia } from './Media';
import Subnigdit, { StrapiSubnigdit } from './Subnigdit';
import User, { StrapiUser } from './User';

type Post = {
  id: number;
  title: string;
  description?: string;
  votes: number;
  reports: number;
  createdAt: Date;
  type: 'Text' | 'Image' | 'Video' | 'Gif';
  nsfw: boolean;
  media?: Media;
  comments?: Comment[],
  owner: User,
  subnigdit: Subnigdit
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
    media?: StrapiMedia;
    comments?: {
      data: StrapiComment[];
    };
    owner: {
      data: StrapiUser;
    };
    subnigdit: {
      data: StrapiSubnigdit;
    };
    moderators: {
      data: {
        id: number;
      }[];
    }
  };
};

type PostN = {
  id: number;
  title: string;
  description?: string;
  votes: number;
  reports: number;
  createdAt: Date;
  type: 'Text' | 'Image' | 'Video' | 'Gif';
  nsfw: boolean;
  media?: StrapiMedia;
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
    id: p.id,
  };
};

export default Post;
export { postAdapter };
export type { PostN, StrapiPost };

