
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './UserLayout';
import BrowseBooks from './BrowseBooks';
import BorrowHistory from './BorrowHistory';
import UserOverview from './UserOverview';

const UserDashboard = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<UserOverview />} />
        <Route path="/browse" element={<BrowseBooks />} />
        <Route path="/history" element={<BorrowHistory />} />
        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>
    </UserLayout>
  );
};

export default UserDashboard;
