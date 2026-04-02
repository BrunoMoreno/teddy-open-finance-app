import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getClient } from './clients-api';
import { formatCurrency } from '../../shared/utils/currency';

export function ClientDetailPage() {
  const { id = '' } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
  });

  if (isLoading || !data) {
    return <p>Carregando cliente...</p>;
  }

  return (
    <section className="panel detail-panel">
      <h1>{data.name}</h1>
      <p>Salário: {formatCurrency(data.salary)}</p>
      <p>Empresa: {formatCurrency(data.companyValue)}</p>
      <p>Access count: {data.accessCount}</p>
      {data.email ? <p>E-mail: {data.email}</p> : null}
      {data.phone ? <p>Telefone: {data.phone}</p> : null}
    </section>
  );
}

