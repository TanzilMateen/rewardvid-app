// Aapka Final Vercel Backend URL
// src/apiConfig.ts

const API_BASE_URL = "https://reward-app-backend-seven.vercel.app";

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  LOGIN: `${API_BASE_URL}/login`,
  SIGNUP: `${API_BASE_URL}/signup`,
  FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password`,
  DASHBOARD_STATS: `${API_BASE_URL}/user-stats`,
  WATCH_VIDEO: `${API_BASE_URL}/videos`,
  WITHDRAW: `${API_BASE_URL}/withdraw`,
  // Admin Endpoints
  ADMIN_STATS: `${API_BASE_URL}/admin/stats`,
  ADMIN_USERS: `${API_BASE_URL}/admin/users`,
};

export default API_BASE_URL;