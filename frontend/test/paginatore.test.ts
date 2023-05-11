import { describe, expect, test } from 'vitest';

const paginatore = (currentPage: number, totalPages: number): string[] => {

  if (currentPage > totalPages || currentPage < 1) {
    return [];
  }

  const maxButtons = 3;
  const buttons = Math.min(totalPages, maxButtons);
  const list = Array.from({ length: totalPages }, (_, i) => i + 1);

  let startIndex = Math.max(0, currentPage - Math.floor(buttons / 2) - 1)
  let endIndex = Math.min(totalPages, currentPage + Math.floor(buttons / 2))

  if (currentPage === 1) {
    endIndex = buttons
  }
  if (currentPage === totalPages) {
    startIndex = totalPages - buttons
  }

  return list.slice(startIndex, endIndex).map(item => item.toString())
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
    expect(paginatore(2, 2)).toStrictEqual(['1', '2']);
  });

  test('should return three pages', () => {
    expect(paginatore(3, 4)).toStrictEqual(['2', '3', '4']);
    expect(paginatore(2, 4)).toStrictEqual(['1', '2', '3']);
  });

  test('should return three pages with extrema pages', () => {
    expect(paginatore(1, 4)).toStrictEqual(['1', '2', '3']);
    expect(paginatore(4, 4)).toStrictEqual(['2', '3', '4']);
  });

});
