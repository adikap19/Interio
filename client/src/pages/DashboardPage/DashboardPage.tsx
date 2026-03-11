import { useState } from 'react';
import { User } from '../../types';
import { logout } from '../../services/auth';
import Navbar from '../../components/layout/Navbar/Navbar';
import SettingsModal from '../../components/layout/SettingsModal/SettingsModal';
import './DashboardPage.css';

interface Props {
  user: User;
  onLogout: () => void;
}

export default function DashboardPage({ user: initialUser, onLogout }: Props) {
  const [user, setUser]               = useState(initialUser);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = () => { logout(); onLogout(); };

  return (
    <div className="dashboard-page">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <main className="dashboard-page__main">
        <h1 className="dashboard-page__greeting">Good to see you, {user.name.split(' ')[0]} ✦</h1>
        <p className="dashboard-page__hint">Your moodboards will appear here.</p>
      </main>

      {settingsOpen && (
        <SettingsModal
          user={user}
          onClose={() => setSettingsOpen(false)}
          onUserUpdate={(updated) => setUser(updated)}
        />
      )}
    </div>
  );
}
