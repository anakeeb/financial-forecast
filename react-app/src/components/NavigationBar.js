import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components'

const Styles = styled.div`
	.navbar {
		background-color: #FFF;
	}

	.navbar-brand, .navbar-nav, .nav-link {
		color: #DDD;

		&:hover {
			color: #AAA;
		}
	}
`
function NavigationBar() {
	return (
		<Styles>
			<Navbar bg='light' variant='light' expand='lg'>
				<Navbar.Brand href='/'>
					<img
				        src="../src/img/logo.svg"
				        width="30"
				        height="30"
				        className="d-inline-block align-top"
				        alt="React Bootstrap logo"
				    />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Item>
							<Nav.Link href='/'>
								Home
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='/main'>
								Main
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='/about'>
								About
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Styles>
	)
}
export default NavigationBar