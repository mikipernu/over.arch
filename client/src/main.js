"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var react_router_dom_1 = require("react-router-dom");
var AccountContext_1 = require("./context/AccountContext");
require("./index.css");
var Chat_1 = require("./pages/Chat/Chat");
var Login_1 = require("./pages/Login/Login");
var Signup_1 = require("./pages/Signup/Signup");
var UserSettings_1 = require("./pages/UserSettings/UserSettings");
var ErrorPage_1 = require("./routes/ErrorPage");
var PublicRoute_1 = require("./routes/PublicRoute");
var RootRoute_1 = require("./routes/RootRoute");
var protectedRoutes = [
    {
        path: "/settings",
        element: <UserSettings_1.default />
    },
    // {
    //   path: "chat/:channelId",
    //   element: <Chat />
    // },
    {
        path: "/chat",
        element: <Chat_1.default />
    },
    {
        path: "/",
        element: <react_router_dom_1.Navigate to="/chat"/>
    },
];
var router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: "/login",
        element: <AccountContext_1.Account><PublicRoute_1.default><Login_1.default /></PublicRoute_1.default></AccountContext_1.Account>,
        errorElement: <ErrorPage_1.default />
    },
    {
        path: "/signup",
        element: <AccountContext_1.Account><PublicRoute_1.default><Signup_1.default /></PublicRoute_1.default></AccountContext_1.Account>,
        errorElement: <ErrorPage_1.default />
    },
    {
        path: "/",
        element: <AccountContext_1.Account><RootRoute_1.default /></AccountContext_1.Account>,
        errorElement: <ErrorPage_1.default />,
        children: protectedRoutes,
    },
    {
        path: "*",
        element: <react_router_dom_1.Navigate to="/" replace/>
    }
]);
client_1.default.createRoot(document.getElementById('root')).render(<react_1.default.StrictMode>
    <react_router_dom_1.RouterProvider router={router}/>
  </react_1.default.StrictMode>);
