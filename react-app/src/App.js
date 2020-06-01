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
					id: 0,
					name: 'AMZN',
					clicked: false,
					timeSeries: null
				},
				{
					id: 1,
					name: 'GOOG',
					clicked: false,
					timeSeries: null
				},
				{
					id: 2,
					name: 'NFLX',
					clicked: false,
					timeSeries: null
				},
				{
					id: 3,
					name: 'MSFT',
					clicked: false,
					timeSeries: null
				},
				{
					id: 4,
					name: 'AAPL',
					clicked: false,
					timeSeries: null
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

	componentDidMount() {
        //Making API calls
        if(!this.state.panels[0].timeSeries) {
        	fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ this.state.panels[0].name }&apikey=PUITOEHB47EXYOC4`)
	            .then(response => response.json())
	            .then(data => this.setState(prevState => {
	            	const updatedPanels = prevState.panels.map(panel => {
	            		if (panel.id === 0) {
	            			panel.timeSeries = data['Weekly Time Series']
	            		}
	            		return panel
	            	})
	            	return {
	            		timeSeries: updatedPanels,
	            		pages: prevState.pages
	            	}
	            })
        	)
        }
        if(!this.state.panels[1].timeSeries) {
        	fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ this.state.panels[1].name }&apikey=PUITOEHB47EXYOC4`)
	            .then(response => response.json())
	            .then(data => this.setState(prevState => {
	            	const updatedPanels = prevState.panels.map(panel => {
	            		if (panel.id === 1) {
	            			panel.timeSeries = data['Weekly Time Series']
	            		}
	            		return panel
	            	})
	            	return {
	            		timeSeries: updatedPanels,
	            		pages: prevState.pages
	            	}
	            })
        	)
        }
        if(!this.state.panels[2].timeSeries) {
        	fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ this.state.panels[2].name }&apikey=PUITOEHB47EXYOC4`)
	            .then(response => response.json())
	            .then(data => this.setState(prevState => {
	            	const updatedPanels = prevState.panels.map(panel => {
	            		if (panel.id === 2) {
	            			panel.timeSeries = data['Weekly Time Series']
	            		}
	            		return panel
	            	})
	            	return {
	            		timeSeries: updatedPanels,
	            		pages: prevState.pages
	            	}
	            })
        	)
        }
        if(!this.state.panels[3].timeSeries) {
        	fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ this.state.panels[3].name }&apikey=PUITOEHB47EXYOC4`)
	            .then(response => response.json())
	            .then(data => this.setState(prevState => {
	            	const updatedPanels = prevState.panels.map(panel => {
	            		if (panel.id === 3) {
	            			panel.timeSeries = data['Weekly Time Series']
	            		}
	            		return panel
	            	})
	            	return {
	            		timeSeries: updatedPanels,
	            		pages: prevState.pages
	            	}
	            })
        	)
        }
        if(!this.state.panels[4].timeSeries) {
        	fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ this.state.panels[4].name }&apikey=PUITOEHB47EXYOC4`)
	            .then(response => response.json())
	            .then(data => this.setState(prevState => {
	            	const updatedPanels = prevState.panels.map(panel => {
	            		if (panel.id === 4) {
	            			panel.timeSeries = data['Weekly Time Series']
	            		}
	            		return panel
	            	})
	            	return {
	            		timeSeries: updatedPanels,
	            		pages: prevState.pages
	            	}
	            })
        	)
        }

    }

	render() {
		console.log(this.state)
		const stockPanels = this.state.panels.map(panel => <StockPanel key={ panel.id } panel={ panel } onClick={ this.handleClick }/>)
		let page
		if (this.state.pages.landing) {
			page = (
				<div>
					
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
		else if (this.state.pages.aboutUs) {
			page = (
				<div>
					<section className="about">
				    </section>    
				</div>
			)
		}
		return (
			<div>
				<Directory handleHomeClick={ this.handleHomeClick } handleAboutClick={ this.handleAboutClick } />
				{ page }
			</div>
		)
	}


}


export default App;
