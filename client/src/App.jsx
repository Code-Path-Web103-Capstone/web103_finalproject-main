import { useRoutes } from "react-router-dom";
import AuthContainer from "./pages/AuthContainer";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import LandingPage from "./pages/LandingPage";
import { UserProvider } from "./services/context.jsx";

function App() {
  const routes = [
    {
      path: "/",
      element: <LandingPage />,
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
  ];

  const element = useRoutes(routes);

  return (
    <UserProvider>
      <main className="flex min-h-screen flex-col">{element}</main>
    </UserProvider>
  );
}

export default App;
