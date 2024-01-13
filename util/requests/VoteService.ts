import { ContentType, contentTypeToPlural } from "../../models/ContentType";
import { UserVotes } from "../../models/User";
import RequestService from "./RequestService";
export default class VoteService {
    
    private requestService = new RequestService();

    async upvote(contentType: ContentType, contentId: number | string) {
        const votes: UserVotes =  await this.requestService.post(`${contentTypeToPlural(contentType)}/upvote/${contentId}`, {auth: true}) as UserVotes;
        return votes;
    }
    async downvote(contentType: ContentType, contentId: number | string) {
        const votes: UserVotes =  await this.requestService.post(`${contentTypeToPlural(contentType)}/downvote/${contentId}`, {auth: true}) as UserVotes;
        return votes;
    }
}