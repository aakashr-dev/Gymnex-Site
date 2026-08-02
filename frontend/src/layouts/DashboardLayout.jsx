import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/shared/Sidebar';
import { Topbar } from '../components/shared/Topbar';
import { QuickRoleSwitcher } from '../components/shared/QuickRoleSwitcher';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-dark-base text-gray-100 flex relative overflow-x-hidden selection:bg-crimson-500 selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto pb-24">
          <Outlet />
        </main>
      </div>
      <QuickRoleSwitcher />
    </div>
  );
};
