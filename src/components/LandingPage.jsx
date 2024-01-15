import React from "react";
import ReferenceCard from "./ReferenceCard";
import ProfilePic from "../rsc/profile_img.jpg"
import contentData from '../content/hello_world.json';


function LandingPage() {
    return (
        <div className="landing-page" id="landing-page">
            <ReferenceCard name={contentData.title} caption={contentData.description} img_url={ProfilePic}/>
        </div>
    )
}

export default LandingPage