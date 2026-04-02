export const numericTransformer = {
  to: (value: number | string): string => String(value),
  from: (value: string | null): number | null =>
    value === null ? null : Number(value),
};

