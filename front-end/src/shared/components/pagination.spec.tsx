import { fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from './pagination';

describe('Pagination', () => {
  it('calls onPageChange when page button is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={4} totalPages={12} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText('5'));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });
});

