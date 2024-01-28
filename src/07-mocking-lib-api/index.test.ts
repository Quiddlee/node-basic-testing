import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const RELATIVE_PATH = 'users';
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const FAKE_RESPONSE_DATA = { data: 'test' };

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockedCreate = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(RELATIVE_PATH);

    expect(mockedCreate).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient = axios.create({
      baseURL: BASE_URL,
    });
    const mockedAxiosClientGet = jest.spyOn(axiosClient, 'get');
    const mockedCreate = jest.spyOn(axios, 'create');
    mockedCreate.mockReturnValue(axiosClient);

    await throttledGetDataFromApi(RELATIVE_PATH);

    expect(mockedAxiosClientGet).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockedAxiosClientGet).toHaveBeenCalledWith(RELATIVE_PATH);
  });

  test('should return response data', async () => {
    const axiosClient = axios.create({
      baseURL: BASE_URL,
    });
    const mockedAxiosClientGet = jest.spyOn(axiosClient, 'get');
    const mockedCreate = jest.spyOn(axios, 'create');
    mockedCreate.mockReturnValue(axiosClient);
    mockedAxiosClientGet.mockReturnValue(Promise.resolve(FAKE_RESPONSE_DATA));

    expect(await throttledGetDataFromApi(RELATIVE_PATH)).toBe(
      FAKE_RESPONSE_DATA.data,
    );
    expect(mockedAxiosClientGet).toHaveBeenCalled();
  });
});
