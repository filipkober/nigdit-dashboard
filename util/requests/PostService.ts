import Post, { StrapiPost } from '../../models/Post';
import StrapiResponse from '../../models/StrapiResponse';
import RequestService, { NetworkError } from './RequestService';
import qs from 'qs';

export default class PostService {
  private endpoint = 'posts';
  private requestService = new RequestService();

  async getAll() {
    const query = qs.stringify(
      {
        populate: {
          owner: {
            populate: '*',
          },
          media: {
            populate: '*',
          },
          subnigdit: {
            populate: {
              subscribers: { count: true },
              icon: {
                populate: '*',
              },
              rules: {
                populate: '*',
              },
            },
          },
          comments: {
            populate: {
              populate: '*',
              replies: {
                count: true,
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
    const posts: StrapiResponse<StrapiPost[]> = await this.requestService.get(
      this.endpoint + '?' + query
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
          media: {
            populate: '*',
          },
          subnigdit: {
            populate: {
              subscribers: { count: true },
              icon: {
                populate: '*',
              },
              rules: {
                populate: '*',
              },
            },
          },
          comments: {
            populate: {
              populate: '*',
              replies: {
                count: true,
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

    try {
      const post: StrapiResponse<StrapiPost> = await this.requestService.get(
        this.endpoint + '/' + id + '?' + query
      );
      return post.data;
    } catch (e) {
      if (e instanceof NetworkError) {
        if (e.status === 404) {
          window.location.href =
            '/error=' + e.status + '?type=' + window.location.pathname;
        }
      }
    }
  }

  //post feed display
  private feedQuery = qs.stringify(
    {
      populate: {
        owner: {
          populate: '*',
        },
        media: {
          populate: '*',
        },
        subnigdit: {
          populate: {
            subscribers: { count: true },
            icon: {
              populate: '*',
            },
            rules: {
              fields: [],
            },
          },
        },
        comments: {
          fields: [],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  async hot() {
    const posts: StrapiResponse<Post[]> = await this.requestService.get(
      'posts/hot' + '?' + this.feedQuery
    );
    return posts.data;
  }
  async pop() {
    const posts: StrapiResponse<Post[]> = await this.requestService.get(
      'posts/pop' + '?' + this.feedQuery
    );
    return posts.data;
  }
  async top() {
    const posts: StrapiResponse<Post[]> = await this.requestService.get(
      'posts/top' + '?' + this.feedQuery
    );
    return posts.data;
  }
  async new() {
    const posts: StrapiResponse<Post[]> = await this.requestService.get(
      'posts/new' + '?' + this.feedQuery
    );
    return posts.data;
  }
  async hotSub() {
    const posts: StrapiResponse<Post[]> = await this.requestService.get(
      'posts/hotSub' + '?' + this.feedQuery,
      { auth: true }
    );
    return posts.data;
  }
  async popSub() {
    const posts: StrapiResponse<Post[]> = await this.requestService.get(
      'posts/popSub' + '?' + this.feedQuery,
      { auth: true }
    );
    return posts.data;
  }
  async topSub() {
    const posts: StrapiResponse<Post[]> = await this.requestService.get(
      'posts/topSub' + '?' + this.feedQuery,
      { auth: true }
    );
    return posts.data;
  }
  async newSub() {
    const posts: StrapiResponse<Post[]> = await this.requestService.get(
      'posts/newSub' + '?' + this.feedQuery,
      { auth: true }
    );
    return posts.data;
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
