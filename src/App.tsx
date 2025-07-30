// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RoleSelectionPage from './pages/auth/RoleSelectionPage';
import SkillSelectionPage from './pages/auth/SkillSelectionPage';
import ProfileSetupPage from './pages/auth/ProfileSetupPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfileCompletionPage from './pages/auth/ProfileCompletionPage';
import BountyDetailPage from './pages/dashboard/BountyDetailPage';
import ManageListingPage from './pages/dashboard/ManageListingPage';
import ListingDetailPage from './pages/dashboard/ListingDetailPage';
import CreateBountyPage from './pages/dashboard/CreateBountyPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/skill-selection" element={<SkillSelectionPage />} />
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
          <Route path="/profile-completion" element={<ProfileCompletionPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/bounty/:id" element={<BountyDetailPage />} />
          <Route path="/dashboard/manage-listing" element={<ManageListingPage />} />
          <Route path="/dashboard/listing-detail" element={<ListingDetailPage />} />
          <Route path="/dashboard/create-bounty" element={<CreateBountyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
