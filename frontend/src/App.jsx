import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import * as sessionActions from "./store/session";
// import { Modal } from "./context/Modal";
import Header from "./components/Header/Header";
import DashBoard from "./components/DashBoard/DashBoard";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import FilterAccounts from "./components/FilterAccounts/FilterAccounts";
import AccountProfile from "./components/AccountProfile/AccountProfile";

function Layout() {
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      {/* <Modal /> */}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/",
        element: <FilterAccounts />,
      },
      {
        path: "/CreateAccount",
        element: <CreateAccount />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/account/:id",
        element: <AccountProfile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
