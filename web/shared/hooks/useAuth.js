import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export function useAuth() {
  const queryClient = useQueryClient();

  // Fetch the current user session from our backend API
  const { data, isLoading, error } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data?.data?.user || null;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      window.location.href = `${API_URL}/auth/google`;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'me'], null);
      queryClient.clear();
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
      window.location.href = '/login';
    },
  });

  // Parse backend authentication errors from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const urlError = urlParams.get('error');
  const displayError = urlError === 'auth_failed' ? 'Google Authentication failed. Please try again.' : null;

  return {
    user: data || null,
    loading: isLoading,
    error: displayError,
    isAuthenticated: !!data,
    // GitHub integration status from the /auth/me response
    githubConnected: data?.githubConnected || false,
    githubUsername: data?.githubUsername || null,
    signInWithGoogle: () => loginMutation.mutateAsync(),
    signOut: () => logoutMutation.mutateAsync(),
    // Helper to refetch user data (e.g., after connecting GitHub)
    refetchUser: () => queryClient.invalidateQueries({ queryKey: ['auth', 'me'] }),
  };
}
