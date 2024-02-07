import React from "react";
import ReferenceCard from "./ReferenceCard";
import contentData from '../content/hello_world.json';


function LandingPage() {
    return (
        <div className="landing-page" id="landing-page">
            <ReferenceCard name={contentData.title} caption={contentData.description}/>
        </div>
    )
}

export default LandingPage