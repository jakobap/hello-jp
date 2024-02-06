import React from "react";
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


function ProjectCard(props) {
    return (
        <Card variant="outlined" className="project-card">
            <h1>{props.project_name}</h1>
            <p>{props.description}</p>
            <List>
                {props.technologies.map((technology, index) => (
                    <ListItem disablePadding>
                        <p>{technology}</p>
                    </ListItem>
                ))}
            </List>
            <a href={props.link}>{props.link_description}</a>
        </Card>
    )
}

export default ProjectCard