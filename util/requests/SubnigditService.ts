import qs from 'qs';
import StrapiResponse from '../../models/StrapiResponse';
import { StrapiSubnigdit, SubnigditSearchResult } from '../../models/Subnigdit';
import RequestService from './RequestService';

type SubEditionParams = {
  description: string;
  rules: string[];
  moderators: number[];
  icon?: Blob | File;
  banner?: Blob | File;
};

type SubCreationParams = {
  description: string;
  rules: string[];
  moderators: number[];
  icon: Blob | File;
  banner: Blob | File;
  name: string;
} & SubEditionParams;

const getBySlugFullPopulateObject = {
  rules: true,
  icon: true,
  banner: true,
  moderators: true,
  owner: true,
  subscribers: {
    count: true,
  },
};
export default class SubnigditService {
  private endpoint = 'subnigdits';
  private requestService = new RequestService();

  async getBySlug(slug: string, populate?: boolean) {
    const query = qs.stringify(
      {
        populate: populate ? getBySlugFullPopulateObject : undefined,
        filters: {
          name_uid: {
            $eq: slug,
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const subnigdit: StrapiResponse<StrapiSubnigdit[]> =
      await this.requestService.get(this.endpoint + '?' + query);
    return subnigdit.data;
  }

  async joinSubnigdit(id: string) {
    const joined: boolean = await this.requestService.post(
      this.endpoint + '/join/' + id,
      { auth: true }
    );
    return joined;
  }
  async checkSubnigdit(
    id: string //check if user joined - returns bool
  ) {
    const joined: boolean = await this.requestService.get(
      this.endpoint + '/check/' + id,
      { auth: true }
    );
    return joined;
  }

  async searchSubnigdits(key: string) {
    const searchResults: SubnigditSearchResult[] =
      await this.requestService.get('search?search=' + key);
    return searchResults;
  }

  async checkName(name: string) {
    const results: StrapiResponse<StrapiSubnigdit[]> =
      await this.requestService.get(
        this.endpoint + '?filters[name][$eq]=' + name
      );
    return results.data.length > 0;
  }

  async createSubnigdit({
    banner,
    description,
    icon,
    moderators,
    name,
    rules,
  }: SubCreationParams) {
    const formData = new FormData();
    formData.append('files.banner', banner);
    formData.append('description', description);
    formData.append('files.icon', icon);
    formData.append('name', name);
    formData.append('rules', JSON.stringify(rules.map((r) => ({ rule: r }))));
    formData.append('moderators', JSON.stringify(moderators));
    const subnigdit: {
      id: number;
      name: string;
      description: string;
      name_uid: string;
    } = await this.requestService.post(this.endpoint, {
      data: formData,
      auth: true,
      contentType: 'multipart/form-data',
    });
    return subnigdit;
  }

  async editSubnigdit(
    { banner, description, icon, moderators, rules }: SubEditionParams,
    id: string | number
  ) {
    const formData = new FormData();
    if (banner) formData.append('files.banner', banner);
    formData.append('description', description);
    if (icon) formData.append('files.icon', icon);
    formData.append('rules', JSON.stringify(rules.map((r) => ({ rule: r }))));
    formData.append('moderators', JSON.stringify(moderators));
    const subnigdit: {
      id: number;
      name: string;
      description: string;
      name_uid: string;
    } = await this.requestService.put(this.endpoint + '/' + id, {
      data: formData,
      auth: true,
      contentType: 'multipart/form-data',
    });
    return subnigdit;
  }

  async deleteSubnigdit(id: string | number) {
    const deleted: boolean = await this.requestService.delete(
      this.endpoint + '/' + id,
      { auth: true }
    );
    return deleted;
  }

  /**
   * DOES NOT RETURN FULL TYPE
   * @returns {Promise<StrapiSubnigdit>}
   */
  async getOne(id: string | number) {
    const query = qs.stringify({
      populate: ['rules', 'icon'],
      fields: ['id', 'name', 'description', 'createdAt', 'name_uid'],
    });

    const subnigdit: StrapiResponse<StrapiSubnigdit> =
      await this.requestService.get(this.endpoint + '/' + id + '?' + query);
    return subnigdit.data;
  }
}
