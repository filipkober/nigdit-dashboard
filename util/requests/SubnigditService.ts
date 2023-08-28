import qs from "qs";
import StrapiResponse from "../../models/StrapiResponse";
import Subnigdit, { StrapiSubnigdit, SubnigditSearchResult } from "../../models/Subnigdit";
import { StrapiUser } from "../../models/User";
import RequestService from "./RequestService";
import { toastDisplay } from "../../components/atoms/Toast";
import ToastType from "../../models/ToastType";

type SubCreationParams = {
    name: string,
    description: string,
    rules: string[],
    moderators: number[],
    icon: Blob | File,
    banner: Blob | File,
}
export default class SubnigditService {
    
    private endpoint = 'subnigdits';
    private requestService = new RequestService();

    async getBySlug(slug: string, populate?: boolean) {
        const subnigdit: StrapiResponse<StrapiSubnigdit[]> = await this.requestService.get(this.endpoint + '?filters[name_uid][$eq]=' + slug + (populate ? '&populate=*' : ''));
        return subnigdit.data;
    }

    async joinSubnigdit(id: string)
    {
        const joined: boolean = await this.requestService.post(this.endpoint + '/join/' + id, {auth: true});
        return joined;
    }

    async checkSubscription(id: string)
    {
        const joined: boolean = await this.requestService.get(this.endpoint + '/check/' + id, {auth: true});
        return joined;
    }

    async searchSubnigdits(key: string)
    {
        const searchResults: SubnigditSearchResult[] = await this.requestService.get('search?search='+key); 
        return searchResults;
    }

    async checkName(name: string)
    {
        const results: StrapiResponse<StrapiSubnigdit[]> = await this.requestService.get(this.endpoint + '?filters[name][$eq]=' + name);
        return results.data.length > 0;
    }

    async createSubnigdit({banner, description, icon, moderators, name, rules}: SubCreationParams){
        const formData = new FormData();
        formData.append('files.banner', banner);
        formData.append('description', description);
        formData.append('files.icon', icon);
        formData.append('name', name);
        formData.append('rules', JSON.stringify(rules.map(r => ({rule: r}))));
        formData.append('moderators', JSON.stringify(moderators));
        const subnigdit: {id: number, name: string, description: string, name_uid: string} = await this.requestService.post(this.endpoint, {data: formData, auth: true, contentType: 'multipart/form-data'});
        return subnigdit;
    }

    /** 
     * DOES NOT RETURN FULL TYPE
     * @returns {Promise<StrapiSubnigdit>}
     */
    async getOne(id: string | number){

        const query = qs.stringify({
            populate: ['rules', 'icon'],
            fields: ['id', 'name', 'description', 'createdAt', 'name_uid']
        });

        const subnigdit: StrapiResponse<StrapiSubnigdit> = await this.requestService.get(this.endpoint + '/' + id + '?' + query);
        return subnigdit.data;
    }

}