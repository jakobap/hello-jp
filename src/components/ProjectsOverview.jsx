import React from "react";
import { Container } from "react-bootstrap";
import Grid from '@mui/material/Grid';
import BackHomeButt from "./BackHomeButt";
import ProjectCard from "./ProjectCard"
import projectData from "../content/projects.json"
import ReactGA from 'react-ga4';


function ProjectsOverview() {
    ReactGA.send({ hitType: "pageview", page: "/projects"});
    return (
        <Container className="project-overview-container">
            <BackHomeButt />

            <Grid container spacing={2} className="project-cards-container">

                {projectData.list_of_talks.map((project, index) => (

                    <Grid item xs={6}>
                        <ProjectCard
                            project_name={project.project_title}
                            description={project.project_description}
                            img={project.img}
                            technologies={project.technologies}
                            link={project.link}
                            link_description={project.link_description}
                        />
                    </Grid>
                ))}

            </Grid>

        </Container>
    )
}

export default ProjectsOverview