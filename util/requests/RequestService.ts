import Cookies from 'js-cookie';

export class NetworkError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
  }
}


type RequestOptions = {
  data?: any;
  auth?: boolean;
  contentType?: 'application/json' | 'multipart/form-data';
  handleError?: (e: NetworkError) => any;
};

const inProduction = process.env.NODE_ENV === 'production';

function genericErrorHandler(e: NetworkError) {
  if (inProduction) {
    switch (e.status) {
      case 400:
        console.error('Bad request');
        break;
      case 401:
        console.error('Unauthorized');
        break;
      case 403:
        console.error('Forbidden');
        break;
      case 404:
        console.error('Not found');
        break;
      case 500:
        console.error('Internal server error');
        break;
      default:
        console.error('Unknown error, status: ' + e.status);
    }
  } else {
    switch (e.status) {
      case 400:
        console.error('Podałeś złe dane w requeście lmao');
        break;
      case 401:
        console.error('Masz jakiś dziwny token, który nie działa');
        break;
      case 403:
        console.error(
          'Pewnie zapomniałeś włączyć endpoint w strapim, lub po prostu nie podałeś jwt'
        );
        break;
      case 404:
        console.error('Nie ma takiego adresu');
        break;
      case 500:
        console.error('Wywaliło w strapim coś, napisz lepszy backend');
        break;
      default:
        console.error('chuj wie co się stało, powodzenia. Status: ' + e.status);
    }
  }
  throw e;
}

export default class RequestService {
  private url = process.env.NEXT_PUBLIC_STRAPI_URL + '/api/';

  async get(
    endpoint: string,
    { auth = false, contentType = 'application/json', handleError = genericErrorHandler }: RequestOptions = {}
  ) {
    const response = await fetch(this.url + endpoint, {
      method: 'GET',
      headers: auth
        ? {
            Authorization: 'Bearer ' + Cookies.get('jwt'),
          }
        : undefined,
    });
    if(!response.ok) handleError(new NetworkError(response.status, response.statusText)); 
    return await response.json();
  }

  async post(
    endpoint: string,
    {
      data,
      auth = false,
      contentType = 'application/json',
      handleError = genericErrorHandler,
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
    if(!response.ok) handleError(new NetworkError(response.status, response.statusText)); 
    return await response.json();
  }
  async put(
    endpoint: string,
    {
      data,
      auth = false,
      contentType = 'application/json',
      handleError = genericErrorHandler,
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
    if(!response.ok) handleError(new NetworkError(response.status, response.statusText)); 
    return await response.json();
  }

  async delete(
    endpoint: string,
    { auth = false, contentType = 'application/json', handleError = genericErrorHandler }: RequestOptions = {}
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
    if(!response.ok) handleError(new NetworkError(response.status, response.statusText)); 
    return await response.json();
  }
}
