
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Login from '@/components/auth/Login';
import AdminDashboard from '@/components/admin/AdminDashboard';
import UserDashboard from '@/components/user/UserDashboard';
import ChangePassword from '@/components/auth/ChangePassword';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'admin' | 'user' }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/user'} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? 
          <Navigate to={user?.role === 'admin' ? '/admin' : '/user'} replace /> : 
          <Login />
        } 
      />
      <Route 
        path="/change-password" 
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/*" 
        element={
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          isAuthenticated ? 
            <Navigate to={user?.role === 'admin' ? '/admin' : '/user'} replace /> : 
            <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <AppRoutes />
        <Toaster />
      </div>
    </AuthProvider>
  );
};

export default Index;
