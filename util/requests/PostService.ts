import { isNumber } from 'lodash';
import qs from 'qs';
import Post, { StrapiPost } from '../../models/Post';
import StrapiResponse from '../../models/StrapiResponse';
import RequestService, { NetworkError } from './RequestService';

type createTextPostParams = {title: string, description: string, subnigdit: number, nsfw?: boolean}
type createMediaPostParams = {title: string, subnigdit: number, nsfw?: boolean, media: File, type: "Image" | "Video" | "Gif"}

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
              moderators: {
                fields: ['id']
              }
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
    return null;
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
  //mode 0-all 1-subscribed 2-my posts
  //alg - hot | top | new
  //subnigdit - null | id of subnigdit
  async getPosts(isLogged: boolean,start: number, limit: number, alg: string, mode: number, subnigdit: number | null)
  {
    let sid = ""
    if(isNumber(subnigdit))
    {
      sid = '&'+"subnigdit="+subnigdit
    }
    let auth = {}
    if(isLogged)
    {
      auth = {auth: true}
    }
    const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/"+alg+ '?' + this.feedQuery+'&start='+start+'&'+"limit="+limit+'&mode='+mode+sid, auth);
    return posts.data;
  }

  async createText({ title, description, subnigdit, nsfw}: createTextPostParams) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('subnigdit', subnigdit.toString());
    formData.append('type', 'Text')
    nsfw && formData.append('nsfw', nsfw.toString());
    const createdPost: {data: Post} =
      await this.requestService.post(this.endpoint, { data: formData, auth: true, contentType: 'multipart/form-data' });
    return createdPost.data;
  }

  async createMedia({ title, subnigdit, nsfw, media, type}: createMediaPostParams) {
    const formData = new FormData();
    formData.append('files.media', media);
    formData.append('title', title);
    formData.append('subnigdit', subnigdit.toString());
    formData.append('type', type)
    nsfw && formData.append('nsfw', nsfw.toString());
    const createdPost: {data: Post} =
      await this.requestService.post(this.endpoint, { data: formData, auth: true, contentType: 'multipart/form-data' });
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
      await this.requestService.delete(this.endpoint + '/' + id, {auth: true});
    return deletedPost.data;
  }

  async banAuthor(id: number) {
    const bannedAuthor: StrapiResponse<StrapiPost> =
      await this.requestService.put(this.endpoint + '/' + id + '/ban-author', {auth: true});
    return bannedAuthor.data;
  }
}
