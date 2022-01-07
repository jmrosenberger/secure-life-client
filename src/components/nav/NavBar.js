import React from "react"
import { Link, useHistory } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
// import 'bootstrap/dist/css/bootstrap.css'
import "./NavBar.css"

console.log(localStorage.getItem("sl_username"))
export const NavBar = () => {
    const history = useHistory()

    return (
        <Navbar expand="sm md lg xl xxl" bg="secondary" fixed="top" className="navbar_container">
            <Container>
                <Navbar.Brand href="/"><img rel="" src="" alt="" className="navbar__logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/adventures">Adventures</Nav.Link>
                        <Nav.Link href="/growth">Growth</Nav.Link>
                        <Nav.Link href="/events">Events</Nav.Link>
                        <NavDropdown title={`Welcome ${localStorage.getItem("sl_username")}!`} id="nav-dropdown" 
                        active className="basic-nav-dropdown">
                            {/* <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item> */}
                            {/* <NavDropdown.Divider /> */}
                            <NavDropdown.Item href="/humans">My People</NavDropdown.Item>
                            <NavDropdown.Item href="/locations">My Locations</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#" onClick={
                                () => {
                                    localStorage.removeItem("sl_token")
                                    localStorage.removeItem("sl_username")
                                }
                            } >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}
