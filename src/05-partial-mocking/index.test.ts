import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    _esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockedConsoleLog = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(mockedConsoleLog).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const mockedConsoleLog = jest.spyOn(console, 'log');

    unmockedFunction();
    expect(mockedConsoleLog).toHaveBeenCalledTimes(1);
  });
});
