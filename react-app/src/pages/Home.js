import React from 'react'
import styled from 'styled-components'
import CardDeck from 'react-bootstrap/CardDeck'


const Styles = styled.div`
	.showcase{
		background: url(../img/Rain.gif) no-repeat center fixed;
		background-position: center;
		background-size: cover;
		height: 600px;
		padding: 140px 100px;
		color: #000
	}

	.showcase h1{
		font-size: 40px;
		font-weight: 700;
		text-transform: uppercase;
	}

	.showcase hr{
		width: 100px;
		margin: auto;
		border-width: 3px;
		border-color: #88d498;
	}
`

class Home extends React.Component {
	render() {
		return (
			<div>		
				<section className="showcase">
				    <div>
					    <br/>
					    <br/>
					    <br/>
					    <hr/>
					    <p className="w3-animate-opacity">
					        An app that allows users to pick and choose what features we use to forecast stock over the next 10-30 days. This will allow users to get an experience with machine learning even though they are not actually writing any of the code. 
					    </p>
				    </div>
				</section>
				<br/>
				<CardDeck>
				    { this.props.stockPanels }
				</CardDeck>

			</div>
		)
	}
}

export default Home