import { useRoutes } from "react-router-dom";
import AuthContainer from "./pages/AuthContainer";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import LandingPage from "./pages/LandingPage";

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

  return <main className="flex min-h-screen flex-col">{element}</main>;
}

export default App;
