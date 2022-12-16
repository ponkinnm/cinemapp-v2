import React, {useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function LoginView({error, handleSubmit, setHasAccount}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
        <div className="p-4 box">
            <h2 className="mb-3">Login</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={() => handleSubmit(email, password)}>
                <FloatingLabel label="Email" className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        required
                        placeholder="Enter email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel label="Password" className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        required
                        placeholder="Enter password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FloatingLabel>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="Submit" size="lg" >Login</Button>
                    <span className="text-muted small d-flex justify-content-center">Don't have an account?</span>
                    <Button variant="secondary" className="btn-sm" size="lg" onClick={() => setHasAccount(false)}>Register new user</Button>
                </div>
            </Form>
        </div>
        </>
    );
}

export default LoginView;
