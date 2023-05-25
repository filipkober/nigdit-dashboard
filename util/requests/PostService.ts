import Post, { StrapiPost } from '../../models/Post';
import StrapiResponse from '../../models/StrapiResponse';
import RequestService from './RequestService';
import qs from 'qs';

export default class PostService {
  private endpoint = 'posts';
  private requestService = new RequestService();

  async getAll() {
    const posts: StrapiResponse<StrapiPost[]> = await this.requestService.get(
      this.endpoint + '?populate=*'
    );
    return posts.data;
  }

  async getOne(id: number) {
    const query = qs.stringify(
      {
        populate: {
          owner: {
            populate: '*',
          },
          Media: {
            populate: '*',
          },
          subnigdit: {
            populate: {
              subscribers: { count: true },
              icon: {
                populate: "*"
              },
              rules: {
                populate: "*"
              }
            }
          },
          comments: {
            populate: {
              populate: '*',
              replies: { 
                count: true
              },
              owner: {
                populate: '*',
              },
            },
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const post: StrapiResponse<StrapiPost> = await this.requestService.get(
      this.endpoint + '/' + id + '?' + query
    );
    return post.data;
  }

  async createNew(post: Post) {
    const createdPost: StrapiResponse<StrapiPost> =
      await this.requestService.post(this.endpoint, { data: { data: post } });
    return createdPost.data;
  }

  async update(id: number, post: Post) {
    const updatedPost: StrapiResponse<StrapiPost> =
      await this.requestService.put(this.endpoint + '/' + id, {
        data: { data: post },
      });
    return updatedPost.data;
  }

  async delete(id: number) {
    const deletedPost: StrapiResponse<StrapiPost> =
      await this.requestService.delete(this.endpoint + '/' + id);
    return deletedPost.data;
  }
}
