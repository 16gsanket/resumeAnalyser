import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import ErrorPage from "./Pages/ErrorPage";
import SignIn from "./Pages/SignIn";
import HomePage from "./Pages/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <SignIn />,
        },

        {
          path: "/home",
          element: <HomePage />,
        },

        // {
        //   //
        //   element:<ProtectedElement />,
        //   children:[
        //     {
        //       path:'/Activity',
        //       element:<Activity />
        //     }
        //   ]
        // },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
