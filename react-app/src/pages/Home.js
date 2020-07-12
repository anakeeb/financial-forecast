import React from 'react'
import styled from 'styled-components'
import CardDeck from 'react-bootstrap/CardDeck'
import { Layout } from '../components/Layout'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Rain from '../img/Rain.gif'
import LinkToHowItWorks from '../img/linkToHowItWorks.png'
import QuickLooks from '../img/quickLooks.png'


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
			.myButton {
				box-shadow:inset 0px 1px 0px 0px #dcecfb;
				
				background-color:#bddbfa;
				border-radius:15px;
				border:4px solid #84bbf3;
				display:inline-block;
				cursor:pointer;
				color:#ffffff;
				font-family:Verdana;
				font-size:23px;
				font-weight:bold;
				padding:19px 33px;
				text-decoration:none;
				text-shadow:0px 1px 0px #528ecc;
			}
			.myButton:hover {
				background:linear-gradient(to bottom, #80b5ea 5%, #bddbfa 100%);
				background-color:#80b5ea;
			}
			.myButton:active {
				position:relative;
				top:1px;
			}


			.link-button-bad {
				background-color: transparent;
				border-radius: 15px;
				border: 4px transparent;
				cursor: poiner;
				color: #000;
				padding: 25px 40px;
				background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #88d498, #ffffff);
				    background-origin: border-box;
				    background-clip: content-box, border-box;
				    box-shadow: transparent;
				&:hover {
					box-shadow: none;
				}

			}

			.link-button {
				border-radius: 4px;
				padding: 1rem;
				font-family: 'Avenir Next';
				font-size: 60px;
				padding: 30px 60px;				
				border: solid 3px transparent;
				float: right;
				border-color: #88d498;
				background: transparent;
				color: #88d498;
				border-radius: 4px;
				
			
				
				&:hover {
					color: linear-gradient(#222222, #000);
					background: #88d498;
					border-color: transparent;

				}
			}

			.quick-looks{
				background: url(${ QuickLooks }) no-repeat center fixed;
				background-position: center;
				background-size: cover;
				background-attachment: scroll;
				height: 700px;
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
					<Link to='/about'>
						<button className='link-button'>CLICK HERE</button>
					</Link>
					
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
					<br/>
					<br/>
					<br/>
					<br/>



				</div>
				<div className="quick-looks">
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