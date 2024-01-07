import { toastDisplay } from "../../components/atoms/Toast";
import Reply, { StrapiReply, StrapiReplyExtended } from "../../models/Reply";
import StrapiResponse from "../../models/StrapiResponse";
import ToastType from "../../models/ToastType";
import RequestService from "./RequestService";
export default class ReplyService {
    
    private endpoint = 'replies';
    private requestService = new RequestService();

    async getAll() {
        const replies: StrapiResponse<StrapiReply[]> =  await this.requestService.get(this.endpoint);
        return replies.data;
    }

    
    async getOne(id: number, populate?: boolean) {
        const reply: StrapiResponse<StrapiReplyExtended | StrapiReply> = await this.requestService.get(this.endpoint + '/' + id + (populate ? '?populate=*' : ''));
        return reply.data;
    }

    async create({content, comment}: {content: string, comment: number}) {
        const createdReply: StrapiResponse<StrapiReply> = await this.requestService.post(this.endpoint, {data: {data: {content, comment}}, auth: true, handleError: () => {
            toastDisplay(ToastType.Error, 'Error creating comment');
        }});
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