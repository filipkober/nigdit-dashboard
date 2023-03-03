import Reply, { StrapiReply } from "../../models/Reply";
import StrapiResponse from "../../models/StrapiResponse";
import RequestService from "./RequestService";

export default class ReplyService {
    
    private endpoint = 'replies';
    private requestService = new RequestService();

    async getAll() {
        const replies: StrapiResponse<StrapiReply[]> =  await this.requestService.get(this.endpoint);
        return replies.data;
    }

    async getOne(id: number) {
        const reply: StrapiResponse<StrapiReply> = await this.requestService.get(this.endpoint + '/' + id);
        return reply.data;
    }

    async createNew(reply: Reply) {
        const createdReply: StrapiResponse<StrapiReply> = await this.requestService.post(this.endpoint, {data: {data: reply}});
        return createdReply.data;
    }

    async update(id: number, reply: Reply) {
        const updatedReply: StrapiResponse<StrapiReply> = await this.requestService.put(this.endpoint + '/' + id, {data: {data: reply}});
        return updatedReply.data;
    }

    async delete(id: number) {
        const deletedReply: StrapiResponse<StrapiReply> = await this.requestService.delete(this.endpoint + '/' + id);
        return deletedReply.data;
    }

}