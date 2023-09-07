export class HttpClient {
  private readonly apiToken: string;
  private readonly baseurl: string;

  constructor(token: string, endpoint: string) {
    this.apiToken = token;
    this.baseurl = endpoint.includes('https://')
      ? `${endpoint}/cache`
      : `https://${endpoint}/cache`;
  }

  async get(cacheName: string, key: string) {
    const resp = await fetch(
      `${this.baseurl}/${cacheName}?key=${key}&token=${this.apiToken}`
    );

    if (resp.status >= 200 && resp.status < 300) {
      const value = await resp.text();
      console.log(
        `successfully retrieved ${key} from cache ${cacheName}: ${value}`
      );
      return value;
    } else if (resp.status === 404) {
      const value = await resp.text();
      console.log(`${key} not found or cache ${cacheName} not found: ${value}`);
      return '';
    } else {
      throw new Error(
        `failed to retrieve item from cache ${cacheName}. Message: ${resp.statusText} | Status: ${resp.status}`
      );
    }
  }

  async set(cacheName: string, key: string, value: string, ttl_seconds = 30) {
    const resp = await fetch(
      `${this.baseurl}/${cacheName}?key=${key}&token=${this.apiToken}&ttl_seconds=${ttl_seconds}`,
      {
        method: 'PUT',
        body: value,
      }
    );

    if (resp.status >= 200 && resp.status < 300) {
      console.log(`successfully set ${key} into cache`);
    } else {
      throw new Error(
        `failed to set item into cache ${cacheName}. Message: ${resp.statusText} | Status: ${resp.status}`
      );
    }

    return resp.status;
  }

  async delete(cacheName: string, key: string) {
    const resp = await fetch(
      `${this.baseurl}/${cacheName}?key=${key}&token=${this.apiToken}`,
      {
        method: 'DELETE',
      }
    );
    if (resp.status >= 200 && resp.status < 300) {
      console.log(`successfully deleted ${key} from cache ${cacheName}`);
    } else {
      throw new Error(
        `failed to delete ${key} from cache ${cacheName}. Message: ${resp.statusText} | Status: ${resp.status}`
      );
    }

    return resp.text();
  }
}
