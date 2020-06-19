import React from 'react'
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
				height: 700px;
				padding: 140px 100px;
				color: #000
			}
			.how-it-works {
				background: url(${ HowItWorks }) no-repeat center fixed;
				background-position: center;
				background-size: cover;
				background-attachment: scroll;
				height: 700px
				padding: 140px 100px;
				color: #000

			}
		`
		return (
			<Styles>		
				<section className="about">
				</section>
				<section className='how-it-works'>
				</section>
			</Styles>
		)
	}
}

export default About