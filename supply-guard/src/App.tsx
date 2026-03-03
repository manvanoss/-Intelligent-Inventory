import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import OrdersPage from './features/orders/OrdersPage';     // 👈 Import Orders
import SettingsPage from './features/settings/SettingsPage'; // 👈 Import Settings
import InventoryPage from './features/inventory/InventoryPage';
import MainLayout from "./components/layout/MainLayout";
import { useAuthStore } from "./stores/useAuthStore";

// 1. Create a "Bouncer" to protect routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((state) => state.token);
  // If no token, kick them back to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route: Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes: The App */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Default to Dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          
          {/* Add other pages here later */}
          {/* <Route path="inventory" element={<InventoryPage />} /> */}
        </Route>

        {/* Catch-all: Redirect unknown URLs to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}