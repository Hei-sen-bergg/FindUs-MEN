import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import "./LayoutStyle.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Layout() {
  return (
    <div className="Layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="Layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export { RequireAuth, Layout };
