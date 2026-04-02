import { buildPagination } from './pagination';

describe('buildPagination', () => {
  it('returns full list for short ranges', () => {
    expect(buildPagination(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns ellipsis for long ranges', () => {
    expect(buildPagination(4, 12)).toEqual([1, '...', 3, 4, 5, '...', 12]);
  });
});

