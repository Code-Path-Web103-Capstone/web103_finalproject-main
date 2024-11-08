import { useRoutes } from "react-router-dom";
import AuthContainer from "./pages/AuthContainer";
import SignUpForm from "./components/auth/SignUpForm";
import LoginForm from "./components/auth/LoginForm";
import Homepage from "./pages/Homepage.jsx";
import CreateBudget from "./pages/CreateBudget";
import AccountSettings from "./pages/AccountSettings.jsx";
import { UserProvider } from "./services/context.jsx";
import Header from "./components/Header.jsx";
import NavBar from "./components/nav/NavBar.jsx";
import Overview from "./pages/Overview.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import StatementInput from "./pages/StatementInput.jsx";
import ActualIncomesExpenses from "./pages/ActualIncomesExpenses.jsx";

function App() {
  const routes = [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/auth",
      element: <AuthContainer />,
      children: [
        {
          path: "signup",
          element: <SignUpForm />,
        },
        {
          path: "login",
          element: <LoginForm />,
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
  ];

  const element = useRoutes(routes);

  return (
    <UserProvider>
      <main className="flex min-h-screen w-full flex-col items-center">
        {/* Header and Nav always visible */}
        <Header />
        <NavBar />
        {element}
      </main>
    </UserProvider>
  );
}

export default App;
