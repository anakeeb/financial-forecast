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
				color: $color-black;
				box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
				border: solid 3px transparent;
				background-image: linear-gradient(#333, rgba(255, 255, 255, 0)), linear-gradient(101deg, #88d498, #ffffff);
				background-origin: border-box;
				background-clip: content-box, border-box;
				box-shadow: 2px 1000px 1px #fff inset;
				float: right;
				
				&:hover {
					box-shadow: none;
				}
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
						<button className='link-button'>click me</button>
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