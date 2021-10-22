import { loopAt } from './utils';

it('is loopAt', () => {
  const a = [0, 1, 2];
  expect(loopAt(a, -3)).toBe(0);
  expect(loopAt(a, -2)).toBe(1);
  expect(loopAt(a, -1)).toBe(2);
  expect(loopAt(a, 0)).toBe(0);
  expect(loopAt(a, 1)).toBe(1);
  expect(loopAt(a, 2)).toBe(2);
  expect(loopAt(a, 3)).toBe(0);
  expect(loopAt(a, 4)).toBe(1);
  expect(loopAt(a, 5)).toBe(2);
});
