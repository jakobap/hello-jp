import React from "react";
import TalkTable from "./TalkTable";
import { Container } from "react-bootstrap";
import BackHomeButt from "./BackHomeButt";
import ReactGA from 'react-ga4';

import { getAnalytics, logEvent } from "firebase/analytics";

function TalksOverview() {
    ReactGA.send({ hitType: "pageview", page: "/talks"});
    const analytics = getAnalytics();
    logEvent(analytics, 'talks-pageview');
    return (
        <Container className="talks-overview-container">
            <BackHomeButt />
            <Container className="talk-table-container">
                <TalkTable />
            </Container>

        </Container>
    )
}

export default TalksOverview