import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { PageLoader } from '../components/shared/PageLoader';

// Helper for dynamic imports of named exports
const lazyPage = (importFn, name) =>
  React.lazy(() => importFn().then((module) => ({ default: module[name] })));

// Public Pages (Lazy Loaded)
const HomePage = lazyPage(() => import('../pages/public/HomePage'), 'HomePage');
const ProgramsPage = lazyPage(() => import('../pages/public/ProgramsPage'), 'ProgramsPage');
const TrainersPage = lazyPage(() => import('../pages/public/TrainersPage'), 'TrainersPage');
const MembershipPage = lazyPage(() => import('../pages/public/MembershipPage'), 'MembershipPage');
const BranchesPage = lazyPage(() => import('../pages/public/BranchesPage'), 'BranchesPage');
const FacilitiesPage = lazyPage(() => import('../pages/public/FacilitiesPage'), 'FacilitiesPage');
const GalleryPage = lazyPage(() => import('../pages/public/GalleryPage'), 'GalleryPage');
const EventsPage = lazyPage(() => import('../pages/public/EventsPage'), 'EventsPage');
const ReviewsPage = lazyPage(() => import('../pages/public/ReviewsPage'), 'ReviewsPage');
const AboutPage = lazyPage(() => import('../pages/public/AboutPage'), 'AboutPage');
const CorporatePage = lazyPage(() => import('../pages/public/CorporatePage'), 'CorporatePage');
const ContactPage = lazyPage(() => import('../pages/public/ContactPage'), 'ContactPage');
const AuthPage = lazyPage(() => import('../pages/auth/AuthPage'), 'AuthPage');
const AdminLoginPage = lazyPage(() => import('../pages/auth/AdminLoginPage'), 'AdminLoginPage');
const TrainerLoginPage = lazyPage(() => import('../pages/auth/TrainerLoginPage'), 'TrainerLoginPage');
const MemberLoginPage = lazyPage(() => import('../pages/auth/MemberLoginPage'), 'MemberLoginPage');

// Admin Pages (Lazy Loaded)
const AdminOverview = lazyPage(() => import('../pages/admin/AdminOverview'), 'AdminOverview');
const AdminMembers = lazyPage(() => import('../pages/admin/AdminMembers'), 'AdminMembers');
const AdminTrainers = lazyPage(() => import('../pages/admin/AdminTrainers'), 'AdminTrainers');
const AdminMemberships = lazyPage(() => import('../pages/admin/AdminMemberships'), 'AdminMemberships');
const AdminAttendance = lazyPage(() => import('../pages/admin/AdminAttendance'), 'AdminAttendance');
const AdminSchedule = lazyPage(() => import('../pages/admin/AdminSchedule'), 'AdminSchedule');
const AdminEquipment = lazyPage(() => import('../pages/admin/AdminEquipment'), 'AdminEquipment');
const AdminAnalytics = lazyPage(() => import('../pages/admin/AdminAnalytics'), 'AdminAnalytics');
const AdminNotifications = lazyPage(() => import('../pages/admin/AdminNotifications'), 'AdminNotifications');
const AdminSettings = lazyPage(() => import('../pages/admin/AdminSettings'), 'AdminSettings');

// Trainer Pages (Lazy Loaded)
const TrainerOverview = lazyPage(() => import('../pages/trainer/TrainerOverview'), 'TrainerOverview');
const TrainerClients = lazyPage(() => import('../pages/trainer/TrainerClients'), 'TrainerClients');
const TrainerWorkoutBuilder = lazyPage(() => import('../pages/trainer/TrainerWorkoutBuilder'), 'TrainerWorkoutBuilder');
const TrainerEquipment = lazyPage(() => import('../pages/trainer/TrainerEquipment'), 'TrainerEquipment');
const TrainerLeave = lazyPage(() => import('../pages/trainer/TrainerLeave'), 'TrainerLeave');
const TrainerAttendance = lazyPage(() => import('../pages/trainer/TrainerAttendance'), 'TrainerAttendance');
const TrainerNotifications = lazyPage(() => import('../pages/trainer/TrainerNotifications'), 'TrainerNotifications');
const TrainerProfile = lazyPage(() => import('../pages/trainer/TrainerProfile'), 'TrainerProfile');

// Member Pages (Lazy Loaded)
const MemberOverview = lazyPage(() => import('../pages/member/MemberOverview'), 'MemberOverview');
const MemberMemberships = lazyPage(() => import('../pages/member/MemberMemberships'), 'MemberMemberships');
const MemberWorkouts = lazyPage(() => import('../pages/member/MemberWorkouts'), 'MemberWorkouts');
const MemberDiet = lazyPage(() => import('../pages/member/MemberDiet'), 'MemberDiet');
const MemberProgress = lazyPage(() => import('../pages/member/MemberProgress'), 'MemberProgress');
const MemberNotifications = lazyPage(() => import('../pages/member/MemberNotifications'), 'MemberNotifications');
const MemberProfile = lazyPage(() => import('../pages/member/MemberProfile'), 'MemberProfile');

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Marketing Site Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/classes" element={<Navigate to="/programs" replace />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/admin" element={<AdminLoginPage />} />
          <Route path="/auth/trainer" element={<TrainerLoginPage />} />
          <Route path="/auth/member" element={<MemberLoginPage />} />
          <Route path="/login/admin" element={<AdminLoginPage />} />
          <Route path="/login/trainer" element={<TrainerLoginPage />} />
          <Route path="/login/member" element={<MemberLoginPage />} />
          <Route path="/auth/:roleParam" element={<AuthPage />} />
          <Route path="/login/:roleParam" element={<AuthPage />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="trainers" element={<AdminTrainers />} />
          <Route path="memberships" element={<AdminMemberships />} />
          <Route path="programs" element={<Navigate to="/admin" replace />} />
          <Route path="diet" element={<Navigate to="/admin" replace />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="schedule" element={<AdminSchedule />} />
          <Route path="equipment" element={<AdminEquipment />} />
          <Route path="payments" element={<Navigate to="/admin" replace />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Trainer Dashboard Routes */}
        <Route path="/trainer" element={<DashboardLayout />}>
          <Route index element={<TrainerOverview />} />
          <Route path="clients" element={<TrainerClients />} />
          <Route path="workout-builder" element={<TrainerWorkoutBuilder />} />
          <Route path="equipment" element={<TrainerEquipment />} />
          <Route path="leave" element={<TrainerLeave />} />
          <Route path="attendance" element={<TrainerAttendance />} />
          <Route path="notifications" element={<TrainerNotifications />} />
          <Route path="profile" element={<TrainerProfile />} />
        </Route>

        {/* Member Dashboard Routes */}
        <Route path="/member" element={<DashboardLayout />}>
          <Route index element={<MemberOverview />} />
          <Route path="memberships" element={<MemberMemberships />} />
          <Route path="workouts" element={<MemberWorkouts />} />
          <Route path="diet" element={<MemberDiet />} />
          <Route path="classes" element={<Navigate to="/member" replace />} />
          <Route path="attendance" element={<Navigate to="/member" replace />} />
          <Route path="payments" element={<Navigate to="/member" replace />} />
          <Route path="progress" element={<MemberProgress />} />
          <Route path="notifications" element={<MemberNotifications />} />
          <Route path="profile" element={<MemberProfile />} />
        </Route>

        {/* Fallback redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

