import React from 'react'
import styled from 'styled-components'

const Styles = styled.div`
	.about{
		background: url(../img/AboutUs.gif) no-repeat center fixed;
		background-position: center;
		background-size: cover;
		padding: 140px 100px;
		color: #000
	}
`

class About extends React.Component {
	render() {
		return (
			<div>		
				<section className="about">
				</section>
			</div>
		)
	}
}

export default About