import { createBrowserRouter, Navigate } from 'react-router-dom';

import { DashboardPage } from '../features/dashboard/dashboard-page';
import { LoginPage } from '../features/auth/login-page';
import { ClientDetailPage } from '../features/clients/client-detail-page';
import { ClientsPage } from '../features/clients/clients-page';
import { SelectedClientsPage } from '../features/clients/selected-clients-page';
import { AppShell } from '../shared/components/app-shell';
import { ProtectedRoute } from '../shared/components/protected-route';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/clients', element: <ClientsPage /> },
      { path: '/clients/selected', element: <SelectedClientsPage /> },
      { path: '/clients/:id', element: <ClientDetailPage /> },
    ],
  },
]);

