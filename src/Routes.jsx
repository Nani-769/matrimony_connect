import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import WelcomeAuthentication from "pages/welcome-authentication";
import RequestManagementHub from "pages/request-management-hub";
import ProfileDetailView from "pages/profile-detail-view";
import DashboardMatchDiscovery from "pages/dashboard-match-discovery";
import MultiStepRegistration from "pages/multi-step-registration";
import MyProfileManagement from "pages/my-profile-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<WelcomeAuthentication />} />
        <Route path="/welcome-authentication" element={<WelcomeAuthentication />} />
        <Route path="/request-management-hub" element={<RequestManagementHub />} />
        <Route path="/profile-detail-view" element={<ProfileDetailView />} />
        <Route path="/dashboard-match-discovery" element={<DashboardMatchDiscovery />} />
        <Route path="/multi-step-registration" element={<MultiStepRegistration />} />
        <Route path="/my-profile-management" element={<MyProfileManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;