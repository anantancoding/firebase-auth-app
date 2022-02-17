import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setloading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to log in");
    }
    setloading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {/* {currentUser && currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Login
            </Button>
          </Form>
          <div className="W-100 text-center mt-2 ">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-600 center mt-2">
        Need an account ?<Link to="/signup">Sign UP</Link>
      </div>
    </>
  );
}
