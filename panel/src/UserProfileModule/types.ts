export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Guest';
  lastLogin: Date;
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
}

// Generic API Response wrapper interface
export interface ApiResponse<T> {
  data: T;
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
}
