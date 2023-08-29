import Post, { StrapiPost } from '../../models/Post';
import StrapiResponse from '../../models/StrapiResponse';
import RequestService, { NetworkError } from './RequestService';
import qs from 'qs';

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

  async hot(start: number, limit: number) {    
    const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/hot"+ '?' + this.feedQuery+'&'+"start="+start+'&'+"limit="+limit);
    return posts.data;
  }
  async pop(start: number, limit: number) {    
    const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/pop" + '?' + this.feedQuery+'&'+"start="+start+'&'+"limit="+limit);
    return posts.data;
  }
  async top(start: number, limit: number) {    
    const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/top"+ '?' + this.feedQuery+'&'+"start="+start+'&'+"limit="+limit);
    return posts.data;
  }
  async new(start: number, limit: number) {    
    const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/new"+ '?' + this.feedQuery+'&'+"start="+start+'&'+"limit="+limit);
    return posts.data;
  }
  async hotSub(start: number, limit: number) {    
    const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/hotSub"+ '?' + this.feedQuery+'&'+"start="+start+'&'+"limit="+limit, {auth: true});
    return posts.data;
  }
  async popSub(start: number, limit: number) {    
    const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/popSub" + '?' + this.feedQuery+'&'+"start="+start+'&'+"limit="+limit, {auth: true});
    return posts.data;
  }
  async topSub(start: number, limit: number) {    
    const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/topSub"+ '?' + this.feedQuery+'&'+"start="+start+'&'+"limit="+limit, {auth: true});
    return posts.data;
  }
  async newSub(start: number, limit: number) {    
    const posts: StrapiResponse<Post[]> = await this.requestService.get("posts/newSub"+ '?' + this.feedQuery+'&'+"start="+start+'&'+"limit="+limit, {auth: true});
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
      await this.requestService.delete(this.endpoint + '/' + id);
    return deletedPost.data;
  }
}
