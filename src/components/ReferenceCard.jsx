import React from "react";
import { Container } from "react-bootstrap";
import NavigationLinks from "./NavLinks";
import ProfilePic from "./rsc/profile_img.jpg"
import Linkedin from "./rsc/linkedin.png"
import Medium from "./rsc/medium_logo.png"
import Github from "./rsc/github.png"


function ReferenceCard(props) {
    return (
        <Container className={"reference-card"}>

            <img src={ProfilePic} alt={props.img_alt} className={"reference-image"} />

            <Container className={"reference-card-header-container"}>
                <p className={"reference-card-header"} >{props.name}</p>
            </Container>

            <Container className={"reference-card-caption-container"}>
                <p className={"reference-card-caption"}>{props.caption}</p>
            </Container>

            <NavigationLinks/>

            <Container className={"social-links-container"}>
                <a href="https://www.linkedin.com/in/jakob-poerschmann/" target="_blank" className={"social-link"}>
                    <img src={Linkedin} alt="LinkedIn icon" className={"reference-social-icon"} />
                </a>
                <a href="https://github.com/jakobap" target="_blank" className={"social-link"}>
                    <img src={Github} alt="GitHub Icon" className={"reference-social-icon"} />
                </a>
                <a href="https://medium.com/@jakobpoerschmann" target="_blank" className={"social-link"}>
                    <img src={Medium} alt="Medium Blogging Platform Icon" className={"reference-social-icon"} />
                </a>
            </Container>

        </Container>
    )
}

export default ReferenceCard