import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import "./index.css";
import Home from "./routes/Home";
import Matches from "./routes/Matches";
import Profile from "./routes/Profile";
import HomeAlternate from "./routes/HomeAlternate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/matches",
        element: <Matches />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/alternate",
        element: <HomeAlternate />,
      }
    ]
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
