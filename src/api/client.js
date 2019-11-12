import { FetchError } from './errors';
import { stringify } from 'qs';

function queryString(obj) {
  return stringify(obj, {
    addQueryPrefix: true,
  });
}

function createClient(
  config = {
    baseUrl: 'https://angat-demo.herokuapp.com/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
  }
) {
  return {
    fetch(endpoint, options) {
      const { baseUrl = '', ...newOptions } = { ...config, ...options };

      return fetch(`${baseUrl}${endpoint}`, newOptions).then(async response => {
        if (!response.ok) {
          throw new FetchError(response.statusText, {
            status: response.status,
            ...(await response.json().catch(() => undefined)),
          });
        }

        return await response.json().catch(() => undefined);
      });
    },

    get(endpoint, { query = {}, ...options } = {}) {
      return this.fetch(`${endpoint}${queryString(query)}`, {
        method: 'GET',
        ...options,
      });
    },
    post(endpoint, { query = {}, params = {}, ...options } = {}) {
      console.log(JSON.stringify(params));
      return this.fetch(`${endpoint}${queryString(query)}`, {
        method: 'POST',
        body: JSON.stringify(params),
        ...options,
      });
    },
    put(endpoint, { query = {}, params = {}, ...options } = {}) {
      return this.fetch(`${endpoint}${queryString(query)}`, {
        method: 'PUT',
        body: JSON.stringify(params),
        ...options,
      });
    },
    patch(endpoint, { query = {}, params = {}, ...options } = {}) {
      return this.fetch(`${endpoint}${queryString(query)}`, {
        method: 'PATCH',
        body: JSON.stringify(params),
        ...options,
      });
    },
    delete(endpoint, { params = {}, options = {} } = {}) {
      return this.fetch(endpoint, {
        method: 'DELETE',
        body: JSON.stringify(params),
        ...options,
      });
    },
  };
}

export const Request = createClient();