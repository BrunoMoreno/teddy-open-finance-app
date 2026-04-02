import { render, screen } from '@testing-library/react';

import { Chart } from './chart';

describe('Chart', () => {
  it('renders chart labels', () => {
    render(<Chart series={[{ period: '2026-01', count: 2 }]} />);
    expect(screen.getByText('2026-01')).toBeInTheDocument();
  });
});

