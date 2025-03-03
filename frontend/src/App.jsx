import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import ErrorPage from "./Pages/ErrorPage";
import SignIn from "./Pages/SignIn";
import HomePage from "./Pages/HomePage";
import { Provider } from "react-redux";
import store from "./Feature/app/store";
import ProtectedElement from "./Components/ProtectedElement";

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

        // {
        //   path: "/home",
        //   element: <HomePage />,
        // },

        {
         
          element:<ProtectedElement />,
          children:[
            {
              path:'/home',
              element:<HomePage />
            }
          ]
        },
      ],
    },
  ]);

  return (
    <>
    <Provider store={store}>

      <RouterProvider router={router} />
    </Provider>
    </>
  );
}

export default App;
