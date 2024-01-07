import Media, { StrapiMedia, mediaAdapter } from './Media';
import SubnigditRule from './SubnigditRule';
import { StrapiUser } from './User';


type Subnigdit = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  reports: number;
  icon: Media;
  banner: Media;
  subscribers: {
    data: StrapiUser[]
  },
  rules?: SubnigditRule[];
  moderators: StrapiUser[];
  owner: StrapiUser;
  name_uid: string;
};


type StrapiSubnigdit = {
  id: number;
  attributes: {
    name: string;
    description: string;
    createdAt: Date;
    reports: number;
    icon: StrapiMedia;
    banner: StrapiMedia;
    subscribers: {
      data: StrapiUser[]
      //   attributes:{
      //     count: number
      //   }
    },
    name_uid: string;
    rules?: SubnigditRule[];
    moderators: {
      data: StrapiUser[];
    }
    owner: {
      data: StrapiUser;
    }
  };
};

const strapiSubnigditToSubnigdit = (s: StrapiSubnigdit): Subnigdit => {
  return({
  id: s.id,
  name: s.attributes.name,
  description: s.attributes.description,
  createdAt: s.attributes.createdAt,
  reports: s.attributes.reports,
  icon: mediaAdapter(s.attributes.icon),
  banner: mediaAdapter(s.attributes.banner),
  subscribers: s.attributes.subscribers,
  rules: s.attributes.rules || [],
  moderators: s.attributes.moderators.data,
  owner: s.attributes.owner.data,
  name_uid: s.attributes.name_uid,
})};

type SubnigditSearchResult = {
  id: number;
  name: string;
  icon: Media;
  subscribers: number;
  name_uid: string;
}

export default Subnigdit;
export { strapiSubnigditToSubnigdit };
export type { StrapiSubnigdit, SubnigditSearchResult };

