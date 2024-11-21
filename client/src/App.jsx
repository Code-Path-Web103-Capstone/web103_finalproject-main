import { useRoutes } from "react-router-dom";
import AuthContainer from "./pages/AuthContainer";
import SignUpForm from "./components/auth/SignUpForm";
import LoginForm from "./components/auth/LoginForm";
import Homepage from "./pages/Homepage.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import Overview from "./pages/Overview.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import StatementInput from "./pages/StatementInput.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import AllBudgets from "./pages/AllBudgets.jsx";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import MonthBreakdown from "./pages/MonthBreakdown.jsx";
import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
  const routes = [
    {
      path: "/",
      element: <Homepage />, // Public route
    },
    {
      path: "/login",
      element: <AuthContainer />,
      children: [
        {
          path: "",
          element: <LoginForm />,
        },
      ],
    },
    {
      path: "/signup",
      element: <AuthContainer />,
      children: [
        {
          path: "",
          element: <SignUpForm />,
        },
      ],
    },
    {
      path: "/account",
      element: (
        <ProtectedRoute>
          <AccountSettings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/statement-input",
      element: (
        <ProtectedRoute>
          <StatementInput />
        </ProtectedRoute>
      ),
    },
    {
      path: "/overview",
      element: (
        <ProtectedRoute>
          <Overview />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/budgets",
      element: (
        <ProtectedRoute>
          <AllBudgets />
        </ProtectedRoute>
      ),
    },
    {
      path: "/auth/callback",
      element: <AuthCallbackPage />,
    },
    {
      path: "/breakdown/:year/:month",
      element: (
        <ProtectedRoute>
          <MonthBreakdown />
        </ProtectedRoute>
      ),
    },
  ];

  const element = useRoutes(routes);

  return <MainLayout element={element} />;
}

export default App;
