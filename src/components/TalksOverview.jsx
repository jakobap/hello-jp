import React from "react";
import TalkTable from "./TalkTable";
import { Container } from "react-bootstrap";
import BackHomeButt from "./BackHomeButt";

function TalksOverview() {
    ReactGA.pageview("/projects");
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