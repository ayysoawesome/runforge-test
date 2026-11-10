import { ofetch } from 'ofetch';
import { normalizeUrl } from '../lib';

const createApiClientInstance = (baseURL: string) => {
  return ofetch.create({
    baseURL: normalizeUrl(baseURL),
    timeout: 15_000,
    retryStatusCodes: [408, 429, 500, 502, 503, 504],
  });
};

export const apiClient = createApiClientInstance('temp');
