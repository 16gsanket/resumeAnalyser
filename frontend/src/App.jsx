import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import ErrorPage from "./Pages/ErrorPage";
import SignIn from "./Pages/SignIn";
import HomePage from "./Pages/HomePage";
import { Provider } from "react-redux";
import store from "./Feature/app/store";
import ProtectedElement from "./Components/ProtectedElement";
import About from "./Pages/About";
import Prices from "./Pages/Prices";

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
          path: "/about-us",
          element: <About />,
        },
        {
          path: "/pricing",
          element: <Prices />,
        },

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
