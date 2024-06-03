
import 'react-chatbot-kit/build/main.css'
import "./Index.css"
import "./Chat/Chat.css"

import { React, useState, useEffect } from "react";
import ReferenceCard from "./ReferenceCard.jsx";
import contentData from '../content/hello_world.json';

import { Container } from "react-bootstrap";
import NavigationLinks from "./NavLinks.jsx";
import Linkedin from "./rsc/linkedin.png"
import Medium from "./rsc/medium_logo.png"
import Github from "./rsc/github.png"

import Chatbot from 'react-chatbot-kit'
import config from './Chat/config.jsx';
import MessageParser from './Chat/MessageParser.jsx';
import ActionProvider from './Chat/ActionProvider.jsx';

import { getAnalytics, logEvent } from "firebase/analytics";

function LandingPage() {
    const [showChat, setShowChat] = useState(false);
    const convId = 5
    const analytics = getAnalytics();
    logEvent(analytics, 'landing-pageview');

    const toggleChat = () => {
        setShowChat(!showChat);
        logEvent(analytics, 'chat-open');
    };

    useEffect(() => {
        const wakeUpEndpoints = [
            "https://hello-jp-llmserver-stag-nbzldk2rfa-ew.a.run.app/wakeup",
            "https://hello-jp-llmserver-nbzldk2rfa-ew.a.run.app/wakeup",
        ];

        const wakeUpService = async (url) => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(
                        `Failed to wake up ${url}: HTTP error! status: ${response.status}`
                    );
                }

                console.log(`Successfully woke up ${url}:`, response);
            } catch (error) {
                console.error(error.message); // Log the specific error message
            }
        };

        wakeUpEndpoints.forEach(wakeUpService); // Wake up each service
    }, []);

    const handleSocialClick = (platform) => {
        logEvent(analytics, `social_link_click_${platform}`); // Log click event
    };

    return (
        <Container className="landing-page" id="landing-page">
            <ReferenceCard name={contentData.title} caption={contentData.description} />

            <NavigationLinks toggleChat={toggleChat} showChat={showChat} />

            <Container className={"social-links-container"}>
                <a href="https://www.linkedin.com/in/jakob-poerschmann/" target="_blank" rel="noopener noreferrer" className={"social-link"} onClick={() => handleSocialClick('linkedin')}>
                    <img src={Linkedin} alt="LinkedIn icon" className={"reference-social-icon"} />
                </a>
                <a href="https://github.com/jakobap" target="_blank" rel="noopener noreferrer" className={"social-link"} onClick={() => handleSocialClick('github')}>
                    <img src={Github} alt="GitHub Icon" className={"reference-social-icon"} />
                </a>
                <a href="https://medium.com/@jakobpoerschmann" target="_blank" rel="noopener noreferrer" className={"social-link"} onClick={() => handleSocialClick('medium')}>
                    <img src={Medium} alt="Medium Blogging Platform Icon" className={"reference-social-icon"} />
                </a>
            </Container>


            {showChat && ( // Conditional rendering
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                    convId={convId}
                />)}
        </Container>
    )
}

export default LandingPage