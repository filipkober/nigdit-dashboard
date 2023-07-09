import qs from "qs";
import StrapiResponse from "../../models/StrapiResponse";
import Subnigdit, { StrapiSubnigdit, SubnigditSearchResult } from "../../models/Subnigdit";
import { StrapiUser } from "../../models/User";
import RequestService from "./RequestService";
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