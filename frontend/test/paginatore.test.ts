import { describe, expect, test } from 'vitest';

const paginatore = (currentPage: number, totalPages: number): string[] => {
  if (currentPage > totalPages || currentPage < 1) {
    return [];
  }

  const maxButtons = 3;
  const buttons = Math.min(totalPages, maxButtons);
  const list = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startIndex =
    currentPage === totalPages
      ? totalPages - buttons
      : Math.max(0, currentPage - Math.floor(buttons / 2) - 1);
  const endIndex =
    currentPage === 1 ? buttons : Math.min(totalPages, currentPage + Math.floor(buttons / 2));

  return list.slice(startIndex, endIndex).map((item) => item.toString());
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

  // test('should return three pages with extrema pages', () => {
  //   expect(paginatore(1, 4)).toStrictEqual(['1', '2', '3']);
  //   expect(paginatore(4, 4)).toStrictEqual(['2', '4', '4']);
  // });

  describe('caso normale', () => {
    test.each([
      [1, 10, ['1', '2', '3']],
      [2, 10, ['1', '2', '3']],
      [3, 10, ['2', '3', '4']],
      [4, 10, ['3', '4', '5']],
      [5, 10, ['4', '5', '6']],
      [6, 10, ['5', '6', '7']],
      [7, 10, ['6', '7', '8']],
      [8, 10, ['7', '8', '9']],
      [9, 10, ['8', '9', '10']],
      [10, 10, ['8', '9', '10']],
    ])('paginatore(currentePage=%i, totalPages=%i) -> %s', (a, b, c) => {
      expect(paginatore(a, b)).toStrictEqual(c);
    });
  });

  describe('caso limite meno pagine che bottoni', () => {
    test.each([
      [1, 1, ['1']],
      [1, 2, ['1', '2']],
      [2, 2, ['1', '2']],
      [1, 3, ['1', '2', '3']],
      [2, 3, ['1', '2', '3']],
      [3, 3, ['1', '2', '3']],
    ])('paginatore(currentePage=%i, totalPages=%i) -> %s', (a, b, c) => {
      expect(paginatore(a, b)).toStrictEqual(c);
    });
  });

  describe('pagina non valida', () => {
    test.each([
      [0, 1, []],
      [2, 1, []],
      [11, 10, []],
      [-4, 5, []],
      [2, 0, []],
      [0, 0, []],
      [-1, 0, []],
    ])('paginatore(currentePage=%i, totalPages=%i) -> %s', (a, b, c) => {
      expect(paginatore(a, b)).toStrictEqual(c);
    });
  });
});

// TODO
// Aggiungere test-each matriciale
// Una expectation per ogni test
