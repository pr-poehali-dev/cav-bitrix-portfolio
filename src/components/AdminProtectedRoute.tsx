import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_auth') === 'true';
    const authTime = localStorage.getItem('admin_auth_time');
    
    if (!isAuthenticated || !authTime) {
      navigate('/admin/login');
      return;
    }

    const sessionDuration = 24 * 60 * 60 * 1000;
    const elapsed = Date.now() - parseInt(authTime);
    
    if (elapsed > sessionDuration) {
      localStorage.removeItem('admin_auth');
      localStorage.removeItem('admin_auth_time');
      navigate('/admin/login');
    }
  }, [navigate]);

  const isAuthenticated = localStorage.getItem('admin_auth') === 'true';
  
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
