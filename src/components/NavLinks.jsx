import { Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';

function NavigationLinks() {
    return (

        <Container className="navigation-links-container">

            <Nav className="justify-content-center">
                <Nav.Item>
                    <Nav.Link href="/projects">My Favourite Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/talks">My Talks</Nav.Link>
                </Nav.Item>
            </Nav>

        </Container>

    );
}

export default NavigationLinks;