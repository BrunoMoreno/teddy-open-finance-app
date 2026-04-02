import { FormEvent, useEffect, useState } from 'react';

import { Modal } from '../../shared/components/modal';
import { parseCurrencyInput } from '../../shared/utils/currency';
import type { Client } from './types';

type ClientFormModalProps = {
  title: string;
  submitLabel: string;
  initialValue?: Client;
  onClose: () => void;
  onSubmit: (payload: { name: string; salary: number; companyValue: number }) => Promise<void>;
};

export function ClientFormModal({
  title,
  submitLabel,
  initialValue,
  onClose,
  onSubmit,
}: ClientFormModalProps) {
  const [name, setName] = useState(initialValue?.name ?? '');
  const [salary, setSalary] = useState(initialValue ? String(initialValue.salary) : '');
  const [companyValue, setCompanyValue] = useState(initialValue ? String(initialValue.companyValue) : '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(initialValue?.name ?? '');
    setSalary(initialValue ? String(initialValue.salary) : '');
    setCompanyValue(initialValue ? String(initialValue.companyValue) : '');
  }, [initialValue]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Nome é obrigatório.';
    if (!salary.trim()) nextErrors.salary = 'Salário é obrigatório.';
    if (!companyValue.trim()) nextErrors.companyValue = 'Valor da empresa é obrigatório.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setApiError(null);
    try {
      await onSubmit({
        name,
        salary: parseCurrencyInput(salary),
        companyValue: parseCurrencyInput(companyValue),
      });
      onClose();
    } catch {
      setApiError('Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal title={title} onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label>
          <input
            placeholder="Digite o nome:"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name ? <span className="form-error">{errors.name}</span> : null}
        </label>
        <label>
          <input
            placeholder="Digite o salário:"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
          />
          {errors.salary ? <span className="form-error">{errors.salary}</span> : null}
        </label>
        <label>
          <input
            placeholder="Digite o valor da empresa:"
            value={companyValue}
            onChange={(event) => setCompanyValue(event.target.value)}
          />
          {errors.companyValue ? <span className="form-error">{errors.companyValue}</span> : null}
        </label>
        {apiError ? <p className="form-error">{apiError}</p> : null}
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Carregando...' : submitLabel}
        </button>
      </form>
    </Modal>
  );
}
