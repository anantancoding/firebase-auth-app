import { updateCurrentUser } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/Login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong>
          {updateCurrentUser.email}
          <link to="/update-profile" className="btn btn-primary w-100 mt-3">
            {" "}
            Update Profile{" "}
          </link>
        </Card.Body>
      </Card>
      <div className="w-600 center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
}
