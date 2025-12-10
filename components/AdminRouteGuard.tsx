import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ADMIN_AUTH_KEY = 'admin_authenticated'; // Chave consistente

const AdminRouteGuard: React.FC = () => {
  const isAuthenticated = localStorage.getItem(ADMIN_AUTH_KEY) === 'true';

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/admin/login" replace />;
  }

  // Se estiver autenticado, renderiza o conteúdo da rota filha (AdminDashboard)
  return <Outlet />;
};

export default AdminRouteGuard;