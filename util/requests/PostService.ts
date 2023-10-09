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
    const query = qs.stringify( //olo, nie wiem do czego ci to, ale ty to usuniesz, bo nie chce mi się bawić z potencjalnymi błędami w twoim 6-miesięcznym kodzie
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
  //suffix - ""/"Sub"/"My"
  //alg - hot/top/new
  //subnigdit - null/id of subnigdit
  async getPosts(start: number, limit: number, alg: string, suffix: string, subnigdit: number | null)
  {
    let sid = ""
    if(isNumber(subnigdit))
    {
      sid = '&'+"subnigdit="+subnigdit
    }
    if(!suffix)
    {
      const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/"+alg+ '?' + this.feedQuery+'&'+"start="+start+'&'+"limit="+limit+sid);
      return posts.data;
    }
    else
    {
      const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/"+alg+suffix+ '?' + this.feedQuery+'&'+"start="+start+'&'+"limit="+limit+sid, {auth: true});
      return posts.data;
    }
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
