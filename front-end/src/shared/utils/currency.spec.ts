import { formatCurrency, parseCurrencyInput } from './currency';

describe('currency utils', () => {
  it('formats BRL values', () => {
    expect(formatCurrency(3500)).toBe('R$ 3.500,00');
  });

  it('parses user input into number', () => {
    expect(parseCurrencyInput('R$ 120.000,00')).toBe(120000);
  });
});

