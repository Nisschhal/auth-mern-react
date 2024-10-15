import { Navigate, Route, Routes } from "react-router-dom";
import { FloatingShape } from "./components/FloatingShape";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

// Redirect authenticated user to homepage/dashboard
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  // if user is authenticated and verified pass them to dashboard or home page
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// redirect user to dashboard if authenticated else to login or verify-email respectively
const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  // login if not authenticated at load page
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // verify email page if signedup but not verified
  if (!user.isVerified) return <Navigate to="/verify-email" replace />;
  // else let it be
  return children;
};

function App() {
  const { checkAuth, isCheckingAuth, user } = useAuthStore();

  // check as soon as, if user is already logged in or authenticated
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // while checkauth runs show loadingspinner
  if (isCheckingAuth) return <LoadingSpinner />;
  console.log(user);

  return (
    <div
      className="min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-green-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-green-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={0}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/verify-email"
          element={
            <RedirectAuthenticatedUser>
              <EmailVerification />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
      {/* Call Toast if there is any */}
      <Toaster />
    </div>
  );
}

export default App;
