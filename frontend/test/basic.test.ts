import { expect, test } from 'vitest';
import { mySum } from '../src/utils';

test('test di prova', () => {
  expect(mySum(1, 2)).toBe(3);
});
