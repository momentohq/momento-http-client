import {HttpClient} from '../src';

describe('integration test using the Momento HTTP API', () => {
  it('HttpClient should set, get, and delete cache values', async () => {
    const cacheName = process.env['MOMENTO_CACHE_NAME'];
    if (!cacheName) {
      throw new Error('Missing environment variable MOMENTO_CACHE_NAME');
    }

    const authToken = process.env['MOMENTO_AUTH_TOKEN'];
    if (!authToken) {
      throw new Error('Missing environment variable MOMENTO_AUTH_TOKEN');
    }

    const endpoint = process.env['MOMENTO_HTTP_ENDPOINT'];
    if (!endpoint) {
      throw new Error('Missing environment variable MOMENTO_HTTP_ENDPOINT');
    }

    const momentoClient = new HttpClient(authToken, endpoint);
    const key = 'foo';
    const value = 'bar';

    const setResponse = await momentoClient.set(cacheName, key, value);
    expect(setResponse).toEqual(204);

    const getResponse = await momentoClient.get(cacheName, key);
    expect(getResponse).toBe('bar');

    const getNonexistent = await momentoClient.get(cacheName, 'baz');
    expect(getNonexistent).toBe('');

    const deleteResonse = await momentoClient.delete(cacheName, key);
    expect(deleteResonse).toEqual(204);
  });
});
