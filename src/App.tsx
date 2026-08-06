import { useEffect } from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicSite from "./pages/PublicSite";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";
import DashboardHome from "./admin/DashboardHome";
import SiteSettings from "./admin/SiteSettings";
import {
  ManageOfficersPage,
  ManageAchievementsPage,
  ManageProductionsPage,
  ManageEventsPage,
  ManageGalleryPage,
  ManageMediaPage,
  ManageTestimonialsPage,
} from "./admin/pages";

/** Listens globally for the secret Alt + C admin shortcut and silently
 * redirects to the hidden admin login route. This shortcut — along with
 * directly visiting #/admin/login — is the only way to reach the admin
 * area; it is never linked from the public navigation or footer. */
function SecretAdminShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        navigate("/admin/login");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <SecretAdminShortcut />
        <Routes>
          <Route path="/" element={<PublicSite />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="officers" element={<ManageOfficersPage />} />
            <Route path="achievements" element={<ManageAchievementsPage />} />
            <Route path="productions" element={<ManageProductionsPage />} />
            <Route path="events" element={<ManageEventsPage />} />
            <Route path="gallery" element={<ManageGalleryPage />} />
            <Route path="media" element={<ManageMediaPage />} />
            <Route path="testimonials" element={<ManageTestimonialsPage />} />
            <Route path="settings" element={<SiteSettings />} />
          </Route>
          <Route path="*" element={<PublicSite />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}
