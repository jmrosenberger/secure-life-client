import React from "react"
import { Link, useHistory } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import "./NavBar.css"

console.log(localStorage.getItem("sl_username"))
export const NavBar = () => {
    const history = useHistory()
    // return (
    //     <ul className="navbar">
    //         <li className="navbar__item">
    //             <Link className="nav-link" to="/adventures">Adventures</Link>
    //         </li>
    //         <li className="navbar__item">
    //             <Link className="nav-link" to="/locations">Locations</Link>
    //         </li>
    //         <li className="navbar__item">
    //             <Link className="nav-link" to="/growth">Growth</Link>
    //         </li>
    //         <li className="navbar__item">
    //             <Link className="nav-link" to="/events">Events</Link>
    //         </li>
    //         <div> 
    //             Welcome {localStorage.getItem("sl_username")}!
    //         </div>
    //         {
    //             (localStorage.getItem("sl_token") !== null) ?
    //                 <li className="nav-item">
    //                     <button className="nav-link fakeLink"
    //                         onClick={() => {
    //                             localStorage.removeItem("sl_token")
    //                             localStorage.removeItem("sl_username")
    //                             history.push({ pathname: "/" })
    //                         }}
    //                     >Logout</button>
    //                 </li> :
    //                 <>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/login">Login</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/register">Register</Link>
    //                     </li>
    //                 </>
    //         }        </ul>
    // )

    return (
        <Navbar expand="sm md lg xl xxl" bg="secondary" fixed="top" className="navbar_container">
            <Container>
                {/* <Navbar.Brand href="/"><img rel="" src="" alt="logo" className="navbar__logo" /></Navbar.Brand> */}
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/adventures">Adventures</Nav.Link>
                        <Nav.Link href="/locations">Locations</Nav.Link>
                        <Nav.Link href="/growth">Growth</Nav.Link>
                        <Nav.Link href="/events">Events</Nav.Link>
                        <NavDropdown title={`Welcome ${localStorage.getItem("sl_username")}`} id="basic-nav-dropdown" className="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/humans">My People</NavDropdown.Item>
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
