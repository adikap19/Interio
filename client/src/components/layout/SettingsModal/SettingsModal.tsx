import { useState, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { User } from '../../../types';
import api from '../../../services/api';
import './SettingsModal.css';

interface Props {
  user: User;
  onClose: () => void;
  onUserUpdate: (updated: User) => void;
}

type Tab = 'profile' | 'security';

const MUI_SX = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#faf8f5',
    '& fieldset': { borderColor: '#e0d5c8' },
    '&:hover fieldset': { borderColor: '#c4a882' },
    '&.Mui-focused fieldset': { borderColor: '#5c3a1e', borderWidth: '1.5px' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#5c3a1e' },
};

export default function SettingsModal({ user, onClose, onUserUpdate }: Props) {
  const [tab, setTab]       = useState<Tab>('profile');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError]   = useState('');

  // Profile tab state
  const [name, setName]     = useState(user.name);
  const [email, setEmail]   = useState(user.email);

  // Security tab state
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd]         = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const resetFeedback = () => { setSuccess(''); setError(''); };

  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);
    try {
      const { data } = await api.patch<User>('/auth/profile', { name, email });
      onUserUpdate(data);
      setSuccess('Profile updated successfully.');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } }).response?.data?.error;
      setError(msg || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSave = async (e: FormEvent) => {
    e.preventDefault();
    resetFeedback();
    if (newPwd !== confirmPwd) { setError('New passwords do not match.'); return; }
    if (newPwd.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await api.patch('/auth/password', { currentPassword: currentPwd, newPassword: newPwd });
      setSuccess('Password changed successfully.');
      setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } }).response?.data?.error;
      setError(msg || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t: Tab) => { setTab(t); resetFeedback(); };

  return (
    <div className="settings-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="settings-modal">
        {/* Header */}
        <div className="settings-modal__header">
          <h2 className="settings-modal__title">Account Settings</h2>
          <button className="settings-modal__close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="settings-modal__tabs">
          <button className={`settings-modal__tab${tab === 'profile' ? ' settings-modal__tab--active' : ''}`} onClick={() => switchTab('profile')}>
            Profile
          </button>
          <button className={`settings-modal__tab${tab === 'security' ? ' settings-modal__tab--active' : ''}`} onClick={() => switchTab('security')}>
            Security
          </button>
        </div>

        {/* Profile tab */}
        {tab === 'profile' && (
          <form onSubmit={handleProfileSave}>
            <div className="settings-modal__body">
              {success && <div className="settings-modal__success">{success}</div>}
              {error   && <div className="settings-modal__error">{error}</div>}
              <TextField label="Full Name" value={name} onChange={e => setName(e.target.value)} required fullWidth size="small" sx={MUI_SX} />
              <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth size="small" sx={MUI_SX} />
            </div>
            <div className="settings-modal__footer">
              <button type="button" className="settings-modal__cancel" onClick={onClose}>Cancel</button>
              <button type="submit" className="settings-modal__save" disabled={loading}>
                {loading ? <CircularProgress size={16} sx={{ color: '#f5ede0' }} /> : null}
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Security tab */}
        {tab === 'security' && (
          <form onSubmit={handlePasswordSave}>
            <div className="settings-modal__body">
              {success && <div className="settings-modal__success">{success}</div>}
              {error   && <div className="settings-modal__error">{error}</div>}
              <TextField label="Current Password" type="password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} required fullWidth size="small" sx={MUI_SX} />
              <TextField label="New Password"     type="password" value={newPwd}     onChange={e => setNewPwd(e.target.value)}     required fullWidth size="small" sx={MUI_SX} />
              <TextField label="Confirm New Password" type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} required fullWidth size="small" sx={MUI_SX} />
            </div>
            <div className="settings-modal__footer">
              <button type="button" className="settings-modal__cancel" onClick={onClose}>Cancel</button>
              <button type="submit" className="settings-modal__save" disabled={loading}>
                {loading ? <CircularProgress size={16} sx={{ color: '#f5ede0' }} /> : null}
                Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
