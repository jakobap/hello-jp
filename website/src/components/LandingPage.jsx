
import 'react-chatbot-kit/build/main.css'
import "./Index.css"
import "./Chat/Chat.css"

import { React, useState } from "react";
import ReferenceCard from "./ReferenceCard.jsx";
import contentData from './content/hello_world.json';

import { Container } from "react-bootstrap";
import NavigationLinks from "./NavLinks.jsx";
import Linkedin from "./rsc/linkedin.png"
import Medium from "./rsc/medium_logo.png"
import Github from "./rsc/github.png"

import Chatbot from 'react-chatbot-kit'
import config from './Chat/config.jsx';
import MessageParser from './Chat/MessageParser.jsx';
import ActionProvider from './Chat/ActionProvider.jsx';


function LandingPage() {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <Container className="landing-page" id="landing-page">
            <ReferenceCard name={contentData.title} caption={contentData.description} />

            <NavigationLinks toggleChat={toggleChat} showChat={showChat}/>

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


            {showChat && ( // Conditional rendering
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />)}
        </Container>
    )
}

export default LandingPage