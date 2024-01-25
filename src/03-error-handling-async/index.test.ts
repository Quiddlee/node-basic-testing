// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  // MyAwesomeError,
  rejectCustomError,
} from './index';

const RESOLVE_VAL = 'test';
const ERR_MESSAGE = 'Error test message';
const DEFAULT_ERROR_MESSAGE = 'Oops!';
const CUSTOM_ERROR_MESSAGE = 'This is my awesome custom error!';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(RESOLVE_VAL)).toBe(RESOLVE_VAL);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(ERR_MESSAGE)).toThrow(ERR_MESSAGE);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(DEFAULT_ERROR_MESSAGE);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(CUSTOM_ERROR_MESSAGE);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(async () => await rejectCustomError()).rejects.toThrow(
      CUSTOM_ERROR_MESSAGE,
    );
  });
});
