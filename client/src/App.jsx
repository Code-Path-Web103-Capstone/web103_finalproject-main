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
import Breakdown from "./components/overview/Breakdown.jsx";

function App() {
  const routes = [
    {
      path: "/",
      element: <Homepage />, // Home page component
    },
    {
      path: "/login",
      element: <AuthContainer />, // Auth layout for login
      children: [
        {
          path: "",
          element: <LoginForm />,
        },
      ],
    },
    {
      path: "/signup",
      element: <AuthContainer />, // Auth layout for signup
      children: [
        {
          path: "",
          element: <SignUpForm />,
        },
      ],
    },

    {
      path: "/account",
      element: <AccountSettings />,
    },
    {
      path: "/statement-input",
      element: <StatementInput />,
    },
    {
      path: "/overview",
      element: <Overview />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/statement-input",
      element: <StatementInput />,
    },
    {
      path: "/budgets",
      element: <AllBudgets />,
    },
    {
      path: "/auth/callback", // Route for OAuth callback
      element: <AuthCallbackPage />,
    },
    {
      path: "/breakdown/:year/:month",
      element: <Breakdown />,
    },
  ];

  const element = useRoutes(routes);

  return <MainLayout element={element} />;
}

export default App;
