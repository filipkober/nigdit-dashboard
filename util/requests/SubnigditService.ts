import StrapiResponse from "../../models/StrapiResponse";
import Subnigdit, { StrapiSubnigdit } from "../../models/Subnigdit";
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
        return await this.requestService.get('search?search='+key); 
    }

}