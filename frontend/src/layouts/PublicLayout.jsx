import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { QuickRoleSwitcher } from '../components/shared/QuickRoleSwitcher';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-dark-base text-gray-100 flex flex-col relative selection:bg-crimson-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
