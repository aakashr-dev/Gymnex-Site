import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#121218',
              color: '#ffffff',
              border: '1px solid rgba(220, 20, 60, 0.4)',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: '#DC143C',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
