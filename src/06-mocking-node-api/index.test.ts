import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './index';
import path from 'path';

const PATH_TO_FILE = 'index.ts';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockedTimeout = jest.fn(doStuffByTimeout);
    const cb = () => 'test';
    const timeout = 1000;

    mockedTimeout(cb, timeout);
    expect(mockedTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const cb = () => 'test';
    const timeout = 1000;

    const mockedTimeout = jest.fn(doStuffByTimeout);
    const mockedCb = jest.fn(cb);

    mockedTimeout(mockedCb, timeout);
    expect(mockedCb).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockedCb).toHaveBeenCalled();
    expect(mockedCb).toReturnWith('test');
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockedInterval = jest.fn(doStuffByInterval);
    const cb = () => 'test';
    const timeout = 1000;

    mockedInterval(cb, timeout);
    expect(mockedInterval).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const interval = 1000;

    doStuffByTimeout(cb, interval);
    expect(cb).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();

    doStuffByTimeout(cb, interval);
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    doStuffByTimeout(cb, interval);
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(2);

    jest.runOnlyPendingTimers();

    doStuffByTimeout(cb, interval);
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockedJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(PATH_TO_FILE);
    expect(mockedJoin).toHaveBeenCalledWith(__dirname, PATH_TO_FILE);
  });

  test('should return null if file does not exist', async () => {
    const fakePath = 'test.ts';
    const content = await readFileAsynchronously(fakePath);
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = await readFileAsynchronously(PATH_TO_FILE);
    expect(content).not.toBeNull();
  });
});
