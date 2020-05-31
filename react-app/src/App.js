import React from 'react';
import StockPanel from './components/StockPanel'
import Directory from './components/Directory'
import './css/style.css'


class App extends React.Component {
	constructor() {
		super()
		this.state={
			panels: [
				{
					id: 1,
					name: 'AMZN',
					clicked: false
				},
				{
					id: 2,
					name: 'GOOG',
					clicked: false
				},
				{
					id: 3,
					name: 'NFLX',
					clicked: false
				},
				{
					id: 4,
					name: 'MSFT',
					clicked: false
				},
				{
					id: 5,
					name: 'AAPL',
					clicked: false
				}
			],
			pages: {
				landing: true,
				aboutUs: false
			}


		}
		this.handleClick = this.handleClick.bind(this)
		this.handleHomeClick = this.handleHomeClick.bind(this)
		this.handleAboutClick = this.handleAboutClick.bind(this)

	}

	handleClick(id) {
		console.log(id)
		this.setState(prevState => {
			const updatedPanels = prevState.panels.map(panel => {
				if (panel.id === id) {
					panel.clicked = !(panel.clicked)
				}
				return panel
			})
			return {
				panels: updatedPanels,
				pages: prevState.pages
			}
		})

	}

	handleHomeClick() {
		this.setState(prevState => {
			return {
				panels: prevState.panels,
				pages: {
					landing: true,
					aboutUs: false
				}
			}
		})
	}

	handleAboutClick() {
		this.setState(prevState => {
			return {
				panels: prevState.panels,
				pages: {
					landing: false,
					aboutUs: true
				}
			}
		})
	}



	render() {
		const stockPanels = this.state.panels.map(panel => <StockPanel key={ panel.id } panel={ panel } onClick={ this.handleClick }/>)
		if (this.state.pages.landing) {
			return (
				<div>
					<Directory handleHomeClick={ this.handleHomeClick } handleAboutClick={ this.handleAboutClick } />
					<section className="showcase">
				    	<div className="w3-container w3-center">
					        <br/>
					        <br/>
					        <br/>
					        <hr/>
					        <p className="w3-animate-opacity">
					            An app that allows users to pick and choose what features we use to forecast stock over the next 10-30 days. This will allow users to get an experience with machine learning even though they are not actually writing any of the code. 
					        </p>
				        	<button class="w3-button w3-green w3-large w3-opacity">Start here</button>
				        </div>
				    </section>
				    <div>
				        { stockPanels }
				    </div>
				</div>
				
			)
		}

		if (this.state.pages.aboutUs) {
			return (
				<div>
					<Directory handleHomeClick={ this.handleHomeClick } handleAboutClick={ this.handleAboutClick }/>
					<section className="about">
				    </section>
				    
				</div>
				
			)
		}
		
	}


}


export default App;
