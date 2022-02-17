import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import login from "./Login";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match ");
    }
    const promises = [];
    setloading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    promises
      .all(promises)
      .then(() => {
        navigate.push("/");
      })
      .catch(() => {
        setError("Failed to update an account");
      })
      .finally(() => {
        setloading(false);
      });
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Up Date</h2>
          {/* {currentUser && currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-600 center mt-2">
        <Link to="/Dashboard">Cancel</Link>
      </div>
    </>
  );
}
