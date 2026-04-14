import React from 'react';
import { User, Metric } from './types';
import { DataList } from './DataList';

interface DashboardProps {
  users: User[];
  metrics: Metric[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ users, metrics, isDarkMode, toggleDarkMode }) => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans w-full">
      <header className="mb-10 flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 transition-colors">
            Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Welcome back! Here's what's happening today.</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle Button */}
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-amber-400 shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              // Sun Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              // Moon Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white font-bold text-xl border-2 border-white dark:border-slate-800 ring-4 ring-slate-100 dark:ring-slate-900 hover:scale-105 transition-all duration-300 cursor-pointer">
            A
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {metrics.map((metric, index) => (
          <div key={metric.id} className={`relative overflow-hidden bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 group animate-fade-in-up delay-${(index + 1) * 100}`}>
            <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity duration-300">
              {metric.trend === 'up' ? (
                <svg className="w-24 h-24 text-emerald-500 translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>
              ) : metric.trend === 'down' ? (
                <svg className="w-24 h-24 text-rose-500 translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>
              ) : (
                <svg className="w-24 h-24 text-slate-500 translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12l-4-4v3H3v2h15v3z"/></svg>
              )}
            </div>
            
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 transition-colors">{metric.label}</h3>
              <div className="flex items-end gap-3 mb-1">
                <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
                  {metric.value.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                  metric.trend === 'up' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 
                  metric.trend === 'down' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400' : 
                  'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {metric.trend === 'up' ? '+14.5%' : metric.trend === 'down' ? '-2.4%' : '0.0%'}
                </span>
                <span className="text-sm text-slate-400 dark:text-slate-500">vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <section className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-700 p-6 md:p-8 animate-fade-in-up delay-200 transition-colors duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors">Recent Users</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Manage individuals who recently joined.</p>
            </div>
            <button className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors text-sm shadow-sm">
              View All
            </button>
          </div>
          
          <DataList<User>
            data={users}
            keyExtractor={(user) => user.id}
            emptyMessage="No users found."
            renderItem={(user) => (
              <div className="flex items-center justify-between p-4 mb-3 bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-200 hover:scale-[1.01] cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 font-semibold text-lg border border-slate-200 dark:border-slate-600 shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-900 dark:group-hover:text-indigo-300 transition-colors">{user.name}</h3>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{user.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="hidden sm:block text-right">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-300 transition-colors">{user.lastLogin.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">Last login</div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                    user.role === 'Admin' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-200 dark:ring-indigo-500/30' : 
                    user.role === 'User' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-500/30' : 
                    'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-500/30'
                  }`}>
                    {user.role}
                  </span>
                  
                  <button className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                  </button>
                </div>
              </div>
            )}
          />
        </section>

        {/* Quick Actions remains the same since it's already a dark gradient, but we ensure it matches well */}
        <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl shadow-xl shadow-indigo-900/20 dark:shadow-indigo-900/40 p-6 md:p-8 text-white relative overflow-hidden animate-fade-in-up delay-300 group">
          {/* ... keeping the rest of the Quick Actions code the exact same ... */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Quick Actions</h2>
            <p className="text-indigo-200 text-sm mb-8">Frequently used administrative tools.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', label: 'Add User' },
                { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'Reports' },
                { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', label: 'Settings' },
                { icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', label: 'Alerts' },
              ].map((action, i) => (
                <button key={i} className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all hover:-translate-y-1 shadow-sm">
                  <svg className="w-8 h-8 mb-2 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={action.icon} /></svg>
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};