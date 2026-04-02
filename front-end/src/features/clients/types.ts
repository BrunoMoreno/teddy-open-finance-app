export type Client = {
  id: string;
  name: string;
  salary: number;
  companyValue: number;
  email?: string | null;
  phone?: string | null;
  accessCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type ClientsResponse = {
  items: Client[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type DashboardSummary = {
  totalClients: number;
  recentClients: Client[];
  creationSeries: Array<{ period: string; count: number }>;
};

