import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { Account } from './context/AccountContext';
import './index.css';
import Chat from "./pages/Chat/Chat";
import ChartDisplay from "./pages/FlowChart/ChartDisplay";
import Home from './pages/Home/Home';
import Locations from './pages/Locations/LocationsPage';
import Login from './pages/Login/Login';
import Portfolio from './pages/Portfolio/Portfolio';
import Signup from './pages/Signup/Signup';
import UserSettings from "./pages/UserSettings/UserSettings";
import ErrorPage from "./routes/ErrorPage";
import PublicRoute from "./routes/PublicRoute";
import Root from "./routes/RootRoute";

const protectedRoutes = [
  {
    path: "/settings",
    element: <UserSettings />
  },
  {
    path: "/chat",
    element: <Chat />
  },
  {
    path: "/flow",
    element: <ChartDisplay />
  },
  {
    path: "/locations",
    element: <Locations />
  },
  {
    path: "/",
    element: <Home />
  },
];

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Account><PublicRoute><Login /></PublicRoute></Account>,
    errorElement: <ErrorPage />
  },
  {
    path: "/signup",
    element: <Account><PublicRoute><Signup /></PublicRoute></Account>,
    errorElement: <ErrorPage />
  },
  {
    path: "/portfolio",
    element: <PublicRoute><Portfolio /></PublicRoute>,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <Account><Root /></Account>,
    errorElement: <ErrorPage />,
    children: protectedRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
