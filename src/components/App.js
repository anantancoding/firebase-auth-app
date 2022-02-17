import React from "react";
import Signup from "./signup.js";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute.js";
import ForgotPassword from "./ForgotPassword.js";
import UpDate from "./UpDate";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-800" style={{ maxWidth: "600px" }}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/UpDate"
                element={
                  <PrivateRoute>
                    <UpDate />
                  </PrivateRoute>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </Container>
  );
}

export default App;
