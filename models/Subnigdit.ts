import { count } from 'console';
import Media from './Media';
import { number } from 'yup';
import { StrapiUser } from './User';
import SubnigditRule from './SubnigditRule';

type Subnigdit = {
  id?: number;
  name: string;
  description: string;
  createdAt: Date;
  reports: number;
};

type StrapiSubnigdit = {
  id: number;
  attributes: {
    name: string;
    description: string;
    createdAt: Date;
    reports: number;
    icon: Media;
    subscribers: {
      data: {
        attributes:{
          count: number
        }
      }
    },
    rules?: SubnigditRule[];
  };
};

type SubnigditN = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  reports: number;
  icon: Media;
  iconUrl: string;
  subscribers: number;
  rules: SubnigditRule[];
};

const subnigditAdapter = (s: StrapiSubnigdit): SubnigditN => {
  return {
    id: s.id,
    name: s.attributes.name,
    description: s.attributes.description,
    createdAt: s.attributes.createdAt,
    reports: s.attributes.reports,
    icon: s.attributes.icon,
    iconUrl: s.attributes.icon.data.attributes.url,
    subscribers: s.attributes.subscribers.data.attributes.count || 0,
    rules: s.attributes.rules || []
  };
};

export default Subnigdit;
export type { StrapiSubnigdit, SubnigditN };
export { subnigditAdapter };