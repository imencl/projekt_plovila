import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {IME_APLIKACIJE, RouteNames} from "../constants.js";
import { useNavigate } from "react-router-dom";
//import { Link } from 'react-router-dom'
//import { RouteNames } from '../constants'

export default function Izbornik(){

    const navigate = useNavigate()

    return(
        // <nav>
        //     <Link to={RouteNames.HOME}>Početna</Link>
        //     {' | '}
        //     <Link to={RouteNames.PLOVILA_PREGLED}>Plovila</Link>
        // </nav>
    
    <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>FD2</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                        onClick={()=>navigate(RouteNames.HOME)}
                        >Početna</Nav.Link>
                       
                        <NavDropdown title="Najam plovila" id="basic-nav-dropdown">
                            <NavDropdown.Item
                            onClick={()=>navigate(RouteNames.PLOVILA_PREGLED)}
                            >Plovila</NavDropdown.Item>
                            
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        )
}
