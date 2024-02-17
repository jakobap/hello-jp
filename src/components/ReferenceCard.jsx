import React from "react";
import { Container } from "react-bootstrap";
import ProfilePic from "./rsc/profile_img.jpg"
import "./Index.css"


function ReferenceCard(props) {
    return (
        <Container className={"reference-card2"}>

            <img src={ProfilePic} alt={props.img_alt} className={"reference-image"} />

            <Container className={"reference-card-header-container"}>
                <p className={"reference-card-header"} >{props.name}</p>
            </Container>

            <Container className={"reference-card-caption-container"}>
                <p className={"reference-card-caption"}>{props.caption}</p>
            </Container>

        </Container>
    )
}

export default ReferenceCard