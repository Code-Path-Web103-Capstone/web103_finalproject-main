import { useRoutes } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import LandingPage from "./pages/LandingPage";

function App() {
  const routes = [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
      element: <SignUpForm />,
    },
  ];

  const element = useRoutes(routes);

  return <main className="flex min-h-screen flex-col">{element}</main>;
}

export default App;
