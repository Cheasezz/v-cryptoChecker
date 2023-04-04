import { describe, expect, it, vi } from 'vitest';
import { getCoinListResponse } from './fixtures';
import { getCoinList } from '@/api.js';

const mockFetch=vi.spyOn(window,'fetch')
function createFetchResponse(data) {
  return {
    ok: true,
    json: () => new Promise((resolve) => resolve(data)),
  };
}
const API_KEY = 'aa0c3c2bf21328b5ff7aba60b2614a5a65d75593d1713223a84d11f8fe4e9117';

beforeEach(() => {
	mockFetch.mockResolvedValue(createFetchResponse(getCoinListResponse));
});
it('makes a GET request to fetch coinList', async () => {
	const coinList = await getCoinList()
	console.log(fetch);

	expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
		`https://min-api.cryptocompare.com/data/blockchain/list?&api_key=${API_KEY}`
	);
  expect(coinList).toEqual(getCoinListResponse);
});
