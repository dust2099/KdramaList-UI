import { useState, type FormEvent } from 'react';
import { userApi,type User } from '../features/users';

export default function App() {
  // Auth & User State
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Login Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Edit Form Input
  const [newUsername, setNewUsername] = useState('');

  // 1. Test Login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('Logging in...');

    try {
      const authResponse = await userApi.login({ email, password });
      setUser(authResponse.user);
      setNewUsername(authResponse.user.username);
      setStatus('Logged in successfully! Access token saved in memory.');
    } catch (err) {
      setStatus('');
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  // 2. Test Protected Update (uses authFetch)
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError('');
    setStatus('Updating username...');

    try {
      const updatedUser = await userApi.updateUser(user.id, { username: newUsername });
      setUser(updatedUser);
      setStatus('Success! Protected route worked.');
    } catch (err) {
      setStatus('');
      setError(err instanceof Error ? err.message : 'Update failed');
    }
  };

  // 3. Test Logout
  const handleLogout = async () => {
    await userApi.logout();
    setUser(null);
    setStatus('Logged out and cookie cleared.');
    setError('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Auth & CRUD Test</h2>

      {status && <p style={{ color: 'green' }}>{status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!user ? (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3>1. Log In</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ padding: '10px', border: '1px solid #ccc' }}>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>2. Test Protected PUT</h3>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
            <button type="submit">Update Username</button>
          </form>

          <button onClick={handleLogout} style={{ backgroundColor: '#ff4d4d', color: 'white' }}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
