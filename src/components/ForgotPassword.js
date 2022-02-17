import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setloading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox fot further instructions");
    } catch {
      setError("Failed to Rest Password");
    }
    setloading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="message">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Rest Password
            </Button>
          </Form>
          <div className="W-100 text-center mt-2 ">
            <Link to="/Login">Login</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-600 center mt-2">
        Need an account ?<Link to="/signup">Sign UP</Link>
      </div>
    </>
  );
}
