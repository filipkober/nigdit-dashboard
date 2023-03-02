import Cookies from 'js-cookie';

type RequestOptions = {
    data?: any;
    auth?: boolean;
    contentType?: 'application/json' | 'multipart/form-data';
  }

export default class RequestService {

  private url = process.env.NEXT_PUBLIC_STRAPI_URL + '/api/';

  async get(
    endpoint: string,
    {
      auth = false,
      contentType = 'application/json',
    }: RequestOptions = {}
  ) {
    const response = await fetch(this.url + endpoint, {
        method: 'GET',
        headers: auth ? {
            'Authorization': 'Bearer ' + Cookies.get('jwt')
        } : undefined
    });
    return await response.json();
  }

  async post(
    endpoint: string,
    {
      data,
      auth = false,
      contentType = 'application/json',
    }: RequestOptions = {}
  ) {
    const response = await fetch(this.url + endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers: auth
        ? {
            'Content-Type': contentType,
            Authorization: 'Bearer ' + Cookies.get('jwt'),
          }
        : {
            'Content-Type': 'application/json',
          },
    });
    return await response.json();
  }
  async put(
    endpoint: string,
    {
        data,
        auth = false,
        contentType = 'application/json',
    }: RequestOptions = {}
    ) {
        const response = await fetch(this.url + endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
            headers: auth
            ? {
                'Content-Type': contentType,
                Authorization: 'Bearer ' + Cookies.get('jwt'),
            }
            : {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }

    async delete(
        endpoint: string,
        {
            auth = false,
            contentType = 'application/json',
        }: RequestOptions = {}
    ) {
        const response = await fetch(this.url + endpoint, {
            method: 'DELETE',
            headers: auth
            ? {
                'Content-Type': contentType,
                Authorization: 'Bearer ' + Cookies.get('jwt'),
            }
            : {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }
}
