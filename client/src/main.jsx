import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import About from "./pages/About.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import NewPassword from "./components/NewPassword.jsx";


// You can do this:
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
  <Route path="/" element={<Layout />}>
    <Route path="/" element={<App />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<h1>Contact</h1>} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/passwordreset" element={<PasswordReset/>} />
    <Route path="/newpassword" element={<NewPassword/>} />
    <Route path="*" element={<h1>404</h1>} />
  </Route>
    <Route path="/dashboard" element={<Dashboard/>} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
