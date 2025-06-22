
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import BookManagement from './BookManagement';
import UserManagement from './UserManagement';
import BorrowManagement from './BorrowManagement';
import AdminOverview from './AdminOverview';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/books" element={<BookManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/borrows" element={<BorrowManagement />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
