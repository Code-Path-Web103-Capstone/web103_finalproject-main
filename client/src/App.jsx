import { useRoutes } from "react-router-dom";
import AuthContainer from "./pages/AuthContainer";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Homepage from "./pages/Homepage.jsx";
import CreateBudget from "./pages/CreateBudget";
import { UserProvider } from "./services/context.jsx";

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
      path: "/createBudget",
      element: <CreateBudget />,
    },
  ];

  const element = useRoutes(routes);

  return (
    <UserProvider>
      <main className="flex min-h-screen flex-col">{element}</main>
    </UserProvider>
  );
}

export default App;
