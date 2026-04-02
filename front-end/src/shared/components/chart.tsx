type ChartProps = {
  series: Array<{ period: string; count: number }>;
};

export function Chart({ series }: ChartProps) {
  const max = Math.max(...series.map((entry) => entry.count), 1);

  return (
    <div className="chart-card">
      <h3>Criação de clientes</h3>
      <div className="chart-bars">
        {series.map((entry) => (
          <div key={entry.period} className="chart-item">
            <div className="chart-bar-wrapper">
              <div className="chart-bar" style={{ height: `${(entry.count / max) * 100}%` }} />
            </div>
            <span>{entry.period}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

