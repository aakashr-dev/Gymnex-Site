import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { ScrollToTop } from './components/shared/ScrollToTop';
import { IntroLoader } from './components/shared/IntroLoader';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
      <IntroLoader />
      <ScrollToTop />
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#121218',
              color: '#ffffff',
              border: '1px solid rgba(245, 166, 35, 0.4)',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: '#F5A623',
                secondary: '#000000',
              },
            },
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
