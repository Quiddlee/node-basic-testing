import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 10, b: 10, action: Action.Subtract, expected: 0 },
  { a: 10, b: -10, action: Action.Subtract, expected: 20 },

  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 2, b: 10, action: Action.Multiply, expected: 20 },
  { a: 10, b: 10, action: Action.Multiply, expected: 100 },

  { a: 10, b: 10, action: Action.Divide, expected: 1 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 5, b: 3, action: Action.Divide, expected: 1.6666666666666667 },

  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
];

describe('simpleCalculator', () => {
  test.each(testCases)('Calculates properly', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toEqual(expected);
  });
});
