import qs from 'qs';
import {
  StrapiComment,
  StrapiCommentExtended,
  StrapiCommentShallow,
} from '../../models/Comment';
import StrapiResponse from '../../models/StrapiResponse';
import RequestService from './RequestService';

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
                    populate: '*',
                  },
                },
              },
            },
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const comment: StrapiResponse<StrapiCommentExtended> =
      await this.requestService.get(this.endpoint + '/' + id + '?' + query);
    return comment.data;
  }

  async getOneShallow(id: number) {
    const comment: StrapiResponse<StrapiCommentShallow> =
      await this.requestService.get(this.endpoint + '/' + id);
    return comment.data;
  }

  async create({ content, post }: { content: string; post: number }) {
    const query = qs.stringify(
      {
      populate: {
        populate: '*',
        replies: {
          count: true,
        },
        owner: {
          populate: '*',
        },
      }
    }
    )
    const comment: StrapiResponse<StrapiComment> =
      await this.requestService.post(this.endpoint + '?' + query, {
        data: {
          data: {
            content,
            post,
          },
        },
        auth: true,
      });
    return comment.data;
  }
}
