import { useQuery } from '@tanstack/react-query';

import { getDashboardSummary } from '../clients/clients-api';
import { Chart } from '../../shared/components/chart';
import { formatCurrency } from '../../shared/utils/currency';

export function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: getDashboardSummary,
  });

  if (isLoading || !data) {
    return <p>Carregando dashboard...</p>;
  }

  return (
    <section className="page-section">
      <div className="stats-grid">
        <div className="stat-card">
          <span>Total de clientes</span>
          <strong>{data.totalClients}</strong>
        </div>
        <div className="stat-card">
          <span>Clientes recentes</span>
          <strong>{data.recentClients.length}</strong>
        </div>
      </div>
      <Chart series={data.creationSeries} />
      <div className="panel">
        <h2>Últimos clientes</h2>
        <ul className="recent-list">
          {data.recentClients.map((client) => (
            <li key={client.id}>
              <span>{client.name}</span>
              <span>{formatCurrency(client.salary)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

