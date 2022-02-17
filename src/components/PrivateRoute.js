import { updateCurrentUser } from "firebase/auth";
import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Component /> : <Navigate to="/Login" />;
}
