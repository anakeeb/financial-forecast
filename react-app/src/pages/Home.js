import React from 'react'
import styled from 'styled-components'
import CardDeck from 'react-bootstrap/CardDeck'
import { Layout } from '../components/Layout'
import Rain from '../img/Rain.gif'
import LinkToHowItWorks from '../img/linkToHowItWorks.png'


class Home extends React.Component {
	render() {
		const Styles = styled.div`
			.showcase{
				background: url(${ Rain }) no-repeat center fixed;
				background-position: center;
				background-size: cover;
				background-attachment: scroll;
				height: 600px;
				padding: 140px 100px;
				color: #000
			}

			.link-to-how-it-works {
				background: url(${ LinkToHowItWorks }) no-repeat center fixed;
				background-position: center;
				background-size: cover;
				background-attachment: scroll;
				height: 700px;
				width: 100%;
				padding: 140px 100px;
				color: #000
			}

			.card-deck {
				margin: auto;
			}
		`
		return (
			<Styles>		
				<div className="showcase">
				</div>
				<div className='link-to-how-it-works'>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>

					<Layout className='card-deck'>
						<CardDeck>
					    	{ this.props.stockPanels }
						</CardDeck>
					</Layout>
				</div>
				
			</Styles>
		)
	}
}

export default Home