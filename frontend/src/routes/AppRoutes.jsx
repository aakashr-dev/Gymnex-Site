import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { ProgramsPage } from '../pages/public/ProgramsPage';
import { TrainersPage } from '../pages/public/TrainersPage';
import { MembershipPage } from '../pages/public/MembershipPage';
import { ClassesPage } from '../pages/public/ClassesPage';
import { BranchesPage } from '../pages/public/BranchesPage';
import { FacilitiesPage } from '../pages/public/FacilitiesPage';
import { GalleryPage } from '../pages/public/GalleryPage';
import { EventsPage } from '../pages/public/EventsPage';
import { ReviewsPage } from '../pages/public/ReviewsPage';
import { AboutPage } from '../pages/public/AboutPage';
import { CorporatePage } from '../pages/public/CorporatePage';
import { ContactPage } from '../pages/public/ContactPage';
import { AuthPage } from '../pages/auth/AuthPage';
import { AdminLoginPage } from '../pages/auth/AdminLoginPage';
import { TrainerLoginPage } from '../pages/auth/TrainerLoginPage';
import { MemberLoginPage } from '../pages/auth/MemberLoginPage';

// Admin Pages
import { AdminOverview } from '../pages/admin/AdminOverview';
import { AdminMembers } from '../pages/admin/AdminMembers';
import { AdminTrainers } from '../pages/admin/AdminTrainers';
import { AdminMemberships } from '../pages/admin/AdminMemberships';
import { AdminPrograms } from '../pages/admin/AdminPrograms';
import { AdminDiet } from '../pages/admin/AdminDiet';
import { AdminAttendance } from '../pages/admin/AdminAttendance';
import { AdminSchedule } from '../pages/admin/AdminSchedule';
import { AdminEquipment } from '../pages/admin/AdminEquipment';
import { AdminPayments } from '../pages/admin/AdminPayments';
import { AdminAnalytics } from '../pages/admin/AdminAnalytics';
import { AdminNotifications } from '../pages/admin/AdminNotifications';
import { AdminSettings } from '../pages/admin/AdminSettings';

// Trainer Pages
import { TrainerOverview } from '../pages/trainer/TrainerOverview';
import { TrainerClients } from '../pages/trainer/TrainerClients';
import { TrainerWorkoutBuilder } from '../pages/trainer/TrainerWorkoutBuilder';
import { TrainerNutritionPlanner } from '../pages/trainer/TrainerNutritionPlanner';
import { TrainerClassSchedule } from '../pages/trainer/TrainerClassSchedule';
import { TrainerAttendance } from '../pages/trainer/TrainerAttendance';
import { TrainerProgress } from '../pages/trainer/TrainerProgress';
import { TrainerNotifications } from '../pages/trainer/TrainerNotifications';
import { TrainerProfile } from '../pages/trainer/TrainerProfile';

// Member Pages
import { MemberOverview } from '../pages/member/MemberOverview';
import { MemberMemberships } from '../pages/member/MemberMemberships';
import { MemberWorkouts } from '../pages/member/MemberWorkouts';
import { MemberDiet } from '../pages/member/MemberDiet';
import { MemberClasses } from '../pages/member/MemberClasses';
import { MemberAttendance } from '../pages/member/MemberAttendance';
import { MemberPayments } from '../pages/member/MemberPayments';
import { MemberProgress } from '../pages/member/MemberProgress';
import { MemberNotifications } from '../pages/member/MemberNotifications';
import { MemberProfile } from '../pages/member/MemberProfile';

export const AppRoutes = () => {
  return (
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
        <Route path="nutrition-planner" element={<TrainerNutritionPlanner />} />
        <Route path="class-schedule" element={<TrainerClassSchedule />} />
        <Route path="attendance" element={<TrainerAttendance />} />
        <Route path="progress" element={<TrainerProgress />} />
        <Route path="notifications" element={<TrainerNotifications />} />
        <Route path="profile" element={<TrainerProfile />} />
      </Route>

      {/* Member Dashboard Routes */}
      <Route path="/member" element={<DashboardLayout />}>
        <Route index element={<MemberOverview />} />
        <Route path="memberships" element={<MemberMemberships />} />
        <Route path="workouts" element={<MemberWorkouts />} />
        <Route path="diet" element={<MemberDiet />} />
        <Route path="classes" element={<MemberClasses />} />
        <Route path="attendance" element={<MemberAttendance />} />
        <Route path="payments" element={<MemberPayments />} />
        <Route path="progress" element={<MemberProgress />} />
        <Route path="notifications" element={<MemberNotifications />} />
        <Route path="profile" element={<MemberProfile />} />
      </Route>

      {/* Fallback redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
