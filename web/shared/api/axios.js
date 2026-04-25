import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Auto-refresh on 401 ───────────────────────────────────────
// When a request returns 401, try POST /auth/refresh once.
// If refresh succeeds, replay the original request. If refresh fails, give up
// and let the caller handle the 401 (usually by redirecting to /login).

let isRefreshing = false;
let refreshWaitQueue = [];

function flushQueue(error) {
  refreshWaitQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  refreshWaitQueue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Only try to refresh on 401, never for the refresh endpoint itself or login flows
    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest.url?.includes('/auth/google') ||
      originalRequest.url?.includes('/auth/logout')
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If a refresh is already in flight, wait for it to complete
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshWaitQueue.push({
          resolve: () => resolve(api(originalRequest)),
          reject: (e) => reject(e),
        });
      });
    }

    isRefreshing = true;

    try {
      await api.post('/auth/refresh');
      flushQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      flushQueue(refreshError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
