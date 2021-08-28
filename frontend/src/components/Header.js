import React from 'react'
import {Container,Navbar,Nav} from 'react-bootstrap'
const Header = () => {
    return (
        <header>
            
            <Navbar bg="dark"  variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">Gshop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navi">
                        <Nav.Link href="/Cart">Cart</Nav.Link>
                        <Nav.Link href="/Login">Sign-in</Nav.Link>
                    </Nav> 
                </Navbar.Collapse>
            </Container>   
            </Navbar>
        
        
        </header>
    )
}

export default Header
