import { useRoutes } from "react-router-dom";
import AuthContainer from "./pages/AuthContainer";
import SignUpForm from "./components/auth/SignUpForm";
import LoginForm from "./components/auth/LoginForm";
import Homepage from "./pages/Homepage.jsx";
import CreateBudget from "./pages/CreateBudget";
import AccountSettings from "./pages/AccountSettings.jsx";
import Overview from "./pages/Overview.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import StatementInput from "./pages/StatementInput.jsx";
import ActualIncomesExpenses from "./pages/ActualIncomesExpenses.jsx";
import Budgets from "./pages/AllBudgets.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import AllBudgets from "./pages/AllBudgets.jsx";

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
      path: "/actual-incomes-expenses",
      element: <ActualIncomesExpenses />,
    },
    {
      path: "/budgets/:userId",
      element: <Budgets />,
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
      path: "/create-budget",
      element: <CreateBudget />,
    },
    {
      path: "/budgets",
      element: <AllBudgets />,
    },
  ];

  const element = useRoutes(routes);

  return <MainLayout element={element} />;
}

export default App;
