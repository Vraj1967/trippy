import React, { useState, useEffect } from 'react';
import { Dashboard } from './Dashboard';
import { User, Metric, ApiResponse } from './types';

const fetchDashboardData = async (): Promise<ApiResponse<{ users: User[], metrics: Metric[] }>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        data: {
          users: [
            { id: '1', name: 'Alena Smith', email: 'alena.smith@example.com', role: 'Admin', lastLogin: new Date('2023-11-01') },
            { id: '2', name: 'Marcus Jones', email: 'marcus.j@example.com', role: 'User', lastLogin: new Date('2023-11-05') },
            { id: '3', name: 'Diana Prince', email: 'diana.p@example.com', role: 'Guest', lastLogin: new Date('2023-10-28') },
            { id: '4', name: 'Evan Wright', email: 'evan.wright@example.com', role: 'User', lastLogin: new Date('2023-11-06') }
          ],
          metrics: [
            { id: 'm1', label: 'Total Revenue', value: 84250, trend: 'up' },
            { id: 'm2', label: 'Active Subscriptions', value: 4342, trend: 'up' },
            { id: 'm3', label: 'Churn Rate', value: 12, trend: 'down' }
          ]
        }
      });
    }, 1500);
  });
};

export const DashboardModule: React.FC = () => {
  const [apiState, setApiState] = useState<ApiResponse<{ users: User[], metrics: Metric[] }>>({
    status: 'idle',
    data: { users: [], metrics: [] }
  });

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply the 'dark' class to the HTML document when state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setApiState((prev) => ({ ...prev, status: 'loading' }));
    
    fetchDashboardData().then((response) => {
      setApiState(response);
    }).catch((err) => {
      setApiState({ status: 'error', data: { users: [], metrics: [] }, error: err.message });
    });
  }, []);

  if (apiState.status === 'loading') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center font-sans dark:bg-slate-900 transition-colors duration-300">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-indigo-100 dark:border-slate-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 dark:border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 animate-pulse">
          Crafting your workspace...
        </div>
      </div>
    );
  }

  // ... error state remains the same (omitted for brevity, you can keep your existing one) ...

  return (
    // Added dark:bg-slate-900 and dark:text-slate-100 here
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900/50 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Glows (Adjusted opacity for dark mode) */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/60 dark:from-indigo-900/20 to-transparent pointer-events-none transition-colors duration-300"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-30 animate-blob pointer-events-none transition-colors duration-300"></div>
      
      <div className="relative z-10">
        <Dashboard 
          users={apiState.data.users} 
          metrics={apiState.data.metrics} 
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
      </div>
    </div>
  );
};

export default DashboardModule;