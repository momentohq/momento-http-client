// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock, {enableFetchMocks} from 'jest-fetch-mock';
// eslint-disable-next-line import/no-extraneous-dependencies
import {describe, expect} from '@jest/globals';
import {HttpClient} from '../src';

enableFetchMocks();

const momentoClient = new HttpClient('a-momento-token', 'some-endpoint.com');

describe('Momento HttpClient', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return appropriate values after calling get', async () => {
    fetchMock.mockResponseOnce('world', {status: 200});
    const response1 = await momentoClient.get('myCache', 'hello');
    expect(response1).toEqual('world');

    fetchMock.mockResponseOnce('Key Not Found', {status: 404});
    const response2 = await momentoClient.get('myCache', 'foo');
    expect(response2).toEqual('');

    fetchMock.mockResponseOnce('Internal Server Error', {status: 500});
    void expect(async () => {
      await momentoClient.get('myCache', 'myKey');
    }).rejects.toThrow('failed to retrieve item from cache');
  });

  it('should return appropriate values after calling set', async () => {
    fetchMock.mockResponseOnce('null', {status: 204});
    const response1 = await momentoClient.set('myCache', 'myKey', 'myValue');
    expect(response1).toEqual(204);

    fetchMock.mockResponseOnce('Cache not found', {status: 404});
    void expect(async () => {
      await momentoClient.set('myCache', 'myKey', 'myValue');
    }).rejects.toThrow('failed to set item into cache');

    fetchMock.mockResponseOnce('Internal Server Error', {status: 500});
    void expect(async () => {
      await momentoClient.set('myCache', 'myKey', 'myValue');
    }).rejects.toThrow('failed to set item into cache');
  });

  it('should return appropriate values after calling delete', async () => {
    fetchMock.mockResponseOnce('null', {status: 204});
    const response1 = await momentoClient.delete('myCache', 'myKey');
    expect(response1).toEqual(204);

    fetchMock.mockResponseOnce('Cache not found', {status: 404});
    void expect(async () => {
      await momentoClient.delete('myCache', 'myKey');
    }).rejects.toThrow('failed to delete myKey from cache');

    fetchMock.mockResponseOnce('Internal Server Error', {status: 500});
    void expect(async () => {
      await momentoClient.delete('myCache', 'myKey');
    }).rejects.toThrow('failed to delete myKey from cache');
  });
});
