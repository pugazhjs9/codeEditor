import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    // Programmatic navigation to /auth if not authenticated
    navigate('/auth', { replace: true });
    return null; // Return null or a fallback component while navigating
  }

  return children;
};

export default PrivateRoute;
