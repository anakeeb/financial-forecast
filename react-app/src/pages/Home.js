import React from 'react'
import styled from 'styled-components'
import CardDeck from 'react-bootstrap/CardDeck'
import { Layout } from '../components/Layout'


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
				    </div>
				</section>
				<Layout>
					<CardDeck>
				    	{ this.props.stockPanels }
					</CardDeck>
				</Layout>
			</div>
		)
	}
}

export default Home