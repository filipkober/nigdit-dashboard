import StrapiResponse from "../../models/StrapiResponse";
import { StrapiSubnigdit } from "../../models/Subnigdit";
import RequestService from "./RequestService";
export default class SubnigditService {
    
    private endpoint = 'subnigdits';
    private requestService = new RequestService();

    async getBySlug(slug: string, populate?: boolean) {
        const subnigdit: StrapiResponse<StrapiSubnigdit[]> = await this.requestService.get(this.endpoint + '?filters[name_uid][$eq]=' + slug + (populate ? '&populate=*' : ''));
        return subnigdit.data;
    }

}