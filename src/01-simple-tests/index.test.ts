import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 10, action: Action.Add })).toEqual(20);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 10, action: Action.Subtract })).toEqual(
      0,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 10, action: Action.Multiply })).toEqual(
      100,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 10, action: Action.Divide })).toEqual(
      1,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 2, b: 10, action: Action.Exponentiate }),
    ).toEqual(1024);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 10, action: null })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: null, b: 10, action: Action.Add })).toEqual(
      null,
    );

    expect(simpleCalculator({ a: 2, b: null, action: Action.Add })).toEqual(
      null,
    );

    expect(simpleCalculator({ a: null, b: null, action: Action.Add })).toEqual(
      null,
    );
  });
});
