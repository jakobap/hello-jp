import React from "react";
import { Container } from "react-bootstrap";
import BackHomeButt from "./BackHomeButt";

function ProjectsOverview() {
    return (
        <Container className="project-overview-container">
            <BackHomeButt />
            <p>This should be an overview table over the projects I worked on.</p>
        </Container>
    )
}

export default ProjectsOverview