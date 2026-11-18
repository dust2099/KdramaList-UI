import { useState, type FormEvent } from 'react';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import type { User } from '../types/userTypes';

interface Props {
  user: User;
  onSuccess: (updatedUser: User) => void;
}

export function ProfileEditForm({ user, onSuccess }: Props) {
  const [username, setUsername] = useState(user.username);
  const { updateProfile, isLoading, error } = useUpdateProfile();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updated = await updateProfile(user.id, { username });
    if (updated) onSuccess(updated);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
