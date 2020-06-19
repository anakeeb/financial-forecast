import React from 'react'
import styled from 'styled-components'
import CardDeck from 'react-bootstrap/CardDeck'
import { Layout } from '../components/Layout'
import Rain from '../img/Rain.gif'
import LinkToHowItWorks from '../img/linkToHowItWorks.svg'


class Home extends React.Component {
	render() {
		const Styles = styled.div`
			.showcase{
				background: url(${ Rain }) no-repeat center fixed;
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

			.link-to-how-it-works {
				background: url(${ LinkToHowItWorks }) no-repeat center fixed;
				background-position: center;
				background-size: cover;
				height: 700px;
				padding: 140px 100px;
				color: #000
			}
		`
		return (
			<Styles>		
				<section className="showcase">
				    <div>
					    <br/>
					    <br/>
					    <br/>
					    <hr/>
				    </div>
				</section>
				<section className='link-to-how-it-works'>
				</section>
				<Layout>
					<CardDeck>
				    	{ this.props.stockPanels }
					</CardDeck>
				</Layout>
			</Styles>
		)
	}
}

export default Home