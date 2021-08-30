import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Container,Navbar,Nav} from 'react-bootstrap'
const Header = () => {
    return (
        <header>
            
            <Navbar bg="dark"  variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand >Gshop</Navbar.Brand>
                </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navi">
                        
                    <LinkContainer to='/Cart'>
                        <Nav.Link >Cart</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to='/login'>
                        <Nav.Link href="/Login">Sign-in</Nav.Link>
                    </LinkContainer>
                    </Nav> 
                </Navbar.Collapse>
            </Container>   
            </Navbar>
        
        
        </header>
    )
}

export default Header
