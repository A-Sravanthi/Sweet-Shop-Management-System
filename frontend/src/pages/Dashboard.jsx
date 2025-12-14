import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role'); // 'admin' or 'user'
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else if (role === 'user') {
      navigate('/user-dashboard');
    } else {
      navigate('/'); // If not logged in, redirect to home
    }
  }, [navigate]);

  return null; // Nothing to render, just redirect
}

export default Dashboard;
