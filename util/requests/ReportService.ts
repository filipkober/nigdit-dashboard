import { ContentType } from "../../models/ContentType";
import Report from "../../models/Report";
import RequestService, { NetworkError } from "./RequestService";

type getAllArgs = {
    subnigditId?: number | string,
    type: string,
    page?: number,
    toNigdit?: boolean
}

export default class ReportService {
    
    private endpoint = 'reports';
    private requestService = new RequestService();

    
    async getAll({subnigditId = 1, type = "post", page = 0, toNigdit = false}: getAllArgs) {
        const reports: Report[] =  await this.requestService.get(this.endpoint + (toNigdit ? "/tonigdit" : "") + `?subnigditId=${subnigditId}&type=${type}&page=${page}`, {auth: true, handleError(e) {
            if(e instanceof NetworkError) {
                if(e.status === 401) {
                    window.location.href = "/login?redirect=" + window.location.pathname + window.location.search + window.location.hash;
                } else if (e.status === 403) {
                    window.location.href = "/";
                }
                return [];
            }
        },}) as Report[];
        return reports;
    }

    async banUser(reportId: number | string, fromNigdit: boolean) {
        const response: string = await this.requestService.post(this.endpoint + `/${reportId}/ban/${fromNigdit ? "user" : "subnigdit"}`, {auth: true});
        return null
    }

    async deleteContent(reportId: number | string) {
        const response = await this.requestService.delete(this.endpoint + `/${reportId}/withcontent`, {auth: true});
        return null
    }

    async delete(reportId: number | string) {
        const response = await this.requestService.delete(this.endpoint + `/${reportId}`, {auth: true});
        return null
    }

    async create(type: ContentType, reason: string, contentId: string | number, toSubnigdit : boolean, subnigditId?: number) {
        const response = await this.requestService.post(this.endpoint, {auth: true, data: {
            type,
            reason,
            contentId,
            toSubnigdit,
            subnigditId,
        }});
        return null
    }

}