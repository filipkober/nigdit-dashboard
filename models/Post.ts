import { string } from 'yup';
import Media from './Media';
import { StrapiSubnigdit } from './Subnigdit';
import { StrapiUser } from './User';

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
  comments?: Comment[];
  owner?: StrapiUser;
  subnigdit?: StrapiSubnigdit
};

type StrapiPost = {
  id: number;
  attributes: {
    Title: string;
    Description?: string;
    Votes: number;
    Reports: number;
    createdAt: Date;
    Type: 'Text' | 'Image' | 'Video' | 'Gif';
    nsfw: boolean;
    Media?: Media;
    comments?: {
      data: Comment[];
    };
    owner: {
      data: StrapiUser;
    };
    subnigdit: {
      data: StrapiSubnigdit
    }
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
    data: Comment[];
  };
  owner: {
    data: StrapiUser;
  };
  subnigdit: {
    data: StrapiSubnigdit
  }
}

const postAdapter = (p: StrapiPost):PostN => {
  return{
    title: p.attributes.Title,
    description: p.attributes.Description,
    votes: p.attributes.Votes,
    reports: p.attributes.Reports,
    createdAt: p.attributes.createdAt,
    type: p.attributes.Type,
    nsfw: p.attributes.nsfw,
    media: p.attributes.Media,
    comments: p.attributes.comments || {data: []},
    owner: p.attributes.owner,
    subnigdit: p.attributes.subnigdit
  }
}

export default Post;
export type { StrapiPost, PostN};
export {postAdapter}