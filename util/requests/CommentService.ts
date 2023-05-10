import Comment, { StrapiComment, StrapiCommentExtended } from '../../models/Comment';
import StrapiResponse from '../../models/StrapiResponse';
import RequestService from './RequestService';
import qs from 'qs';

export default class CommentService {
  private endpoint = 'comments';
  private requestService = new RequestService();

  async getAll() {
    const comments: StrapiResponse<StrapiComment[]> =
      await this.requestService.get(this.endpoint + '?populate=*');
    return comments.data;
  }

  async getOne(id: number) {
    const query = qs.stringify(
      {
        populate: {
          replies: {
            populate: {
              owner: {
                populate: {
                  profilePicture: {
                    populate: '*'
                  }
                }
              }
            }
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const comment: StrapiResponse<StrapiCommentExtended> = await this.requestService.get(
      this.endpoint + '/' + id + '?' + query
    );
    return comment.data

  }
}
