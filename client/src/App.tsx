import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User } from './types';
import { getMe } from './services/auth';
import AuthPage from './pages/AuthPage/AuthPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    getMe()
      .then(setUser)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={!user ? <AuthPage onAuth={setUser} /> : <Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={user ? <DashboardPage user={user} onLogout={() => setUser(null)} /> : <Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/auth'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
