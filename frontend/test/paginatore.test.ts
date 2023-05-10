import { describe, expect, test } from 'vitest';

const paginatore = (currentPage: number, totalPages: number): string[] => {
  const maxButtons = 3;
  const buttons = Math.min(totalPages, maxButtons);

  const list = Array.from(Array(buttons).keys());

  if (currentPage > totalPages || currentPage < 1) {
    return [];
  }
  if (currentPage > 1 && currentPage < totalPages) {
    return list.map((item) => (item + currentPage - 1).toString());
  }
  if (currentPage <= 1) {
    return list.map((item) => (item + 1).toString());
  }
  if (currentPage === totalPages) {
    return list.map((item) => (item + currentPage - (buttons - 1)).toString());
  }
  return [];
};

describe('paginatore', () => {
  test('should return empty', () => {
    expect(paginatore(0, 0)).toStrictEqual([]);
    expect(paginatore(0, 2)).toStrictEqual([]);
    expect(paginatore(4, 2)).toStrictEqual([]);
  });

  test('should return one page', () => {
    expect(paginatore(1, 1)).toStrictEqual(['1']);
  });

  test('should return two pages', () => {
    expect(paginatore(1, 2)).toStrictEqual(['1', '2']);
  });

  test('should return three pages', () => {
    expect(paginatore(1, 4)).toStrictEqual(['1', '2', '3']);
  });

  test('should return three pages with currentPage 3', () => {
    expect(paginatore(3, 4)).toStrictEqual(['2', '3', '4']);
  });

  test('should return three pages with last page buttons', () => {
    expect(paginatore(10, 10)).toStrictEqual(['8', '9', '10']);
  });

  test('should return three pages with last page buttons', () => {
    expect(paginatore(4, 4)).toStrictEqual(['2', '3', '4']);
  });
});
