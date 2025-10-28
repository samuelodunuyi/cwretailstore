import { useState } from 'react';
import { useLoginMutation, useRegisterMutation } from '@/redux/services/auth.services';

export function useAuth() {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [user, setUser] = useState<{ username: string; email: string; role: number } | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const signIn = async (username: string, password: string) => {
    const response = await login({ username, password }).unwrap();
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    setUser({ username: response.username, email: response.email, role: response.role });
    setProfile(response.profile ?? null); // only if API returns it
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    await register({ firstName, lastName, username: email, email, password }).unwrap();
  };

  const hasRole = (roleToCheck: number) => user?.role === roleToCheck;

  return { signIn, signUp, user, profile, hasRole };
}
