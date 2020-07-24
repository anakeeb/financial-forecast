import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'
import AboutUs from '../img/AboutUs.gif'
import HowItWorks from '../img/howItWorks.png'



class About extends React.Component {
	render() {
		const Styles = styled.div`
			.about{
				background: url(${ AboutUs }) no-repeat center fixed;
				background-position: center;
				background-size: cover;
				background-attachment: scroll;
				height: 600px;
				padding: 140px 100px;
				color: #000
			}

			.how-it-works {
				background: url(${ HowItWorks }) no-repeat center fixed;
				background-position: center;
				background-size: cover;
				background-attachment: scroll;
				height: 700px;
				width: 100%;
				padding: 140px 100px;
				color: #000
			}

			.text {
				font-family: "Verdana";
				font-weight: 500px;
			}
		`
		return (
			<Styles>		
				<section className="about">
				<Container>
					<Row>
						<Col>
						</Col>
						<Col>
							<h1 className='text'>
								This website was made by a Purdue student to serve as a resume project.  
								I am passionate about learning more about the field of computer science and machine learning.
							</h1>
						</Col>
					</Row>
				</Container>
				</section>
				<section className='how-it-works'>
				</section>
			</Styles>
		)
	}
}

export default About