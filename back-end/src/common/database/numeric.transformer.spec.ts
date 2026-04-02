import { numericTransformer } from './numeric.transformer';

describe('numericTransformer', () => {
  it('serializes numbers and strings to database values', () => {
    expect(numericTransformer.to(12.5)).toBe('12.5');
    expect(numericTransformer.to('99.9')).toBe('99.9');
  });

  it('deserializes nullable database values', () => {
    expect(numericTransformer.from('12.5')).toBe(12.5);
    expect(numericTransformer.from(null)).toBeNull();
  });
});
