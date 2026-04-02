import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useAuthStore } from '../../features/auth/auth-store';

export function AppShell() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function navClass({ isActive }: { isActive: boolean }) {
    return isActive ? 'active' : '';
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand-row">
          <button className="icon-button" onClick={() => setSidebarOpen((value) => !value)} aria-label="Alternar menu">
            ☰
          </button>
          <div className="brand">
            <span className="brand-mark">🦊</span>
            <span>Teddy Open Finance</span>
          </div>
        </div>
        <nav className="topnav">
          <NavLink className={navClass} to="/clients">
            Clientes
          </NavLink>
          <NavLink className={navClass} to="/clients/selected">
            Clientes selecionados
          </NavLink>
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </nav>
        <div className="greeting">Olá, {user?.name ?? 'Usuário'}!</div>
      </header>
      <div className="shell-body">
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
          <NavLink className={navClass} to="/dashboard">
            Home
          </NavLink>
          <NavLink className={navClass} to="/clients">
            Clientes
          </NavLink>
          <NavLink className={navClass} to="/clients/selected">
            Clientes selecionados
          </NavLink>
        </aside>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
