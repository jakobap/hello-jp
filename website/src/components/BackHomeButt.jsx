import React from "react";
import { Container, Button } from "react-bootstrap";

function BackHomeButt() {
    return (
        <Container className="back-home-container">
            <Button href="/home" variant="link">Back home</Button>
        </Container>
    )
}

export default BackHomeButt