import React from "react";
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';


function ProjectCard(props) {
    let linkElement;

    if (props.link == "") {
        linkElement = <p>Public repo coming soon</p>
    } else {
        linkElement = <a href={props.link}>{props.link_description}</a>
    }

    return (
        <Card variant="outlined" className="project-card">
            <h1>{props.project_name}</h1>
            <p>{props.description}</p>
            <img className="project-card-img" src={props.img} alt={props.description} />
            <List>
                {props.technologies.map((technology, index) => (
                    <Chip label={technology} variant="outlined" />
                ))}
            </List>

            {linkElement}

        </Card>
    )
}

export default ProjectCard