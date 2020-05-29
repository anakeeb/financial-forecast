import React from 'react'

class StockPanel extends React.Component {
	constructor() {
		super()
		this.state={
			timeSeries: null
		}
		this.arrOfHighestPrice = this.arrOfHighestPrice.bind(this)
	}


	
	arrOfHighestPrice() {
		if (this.state.timeSeries === null) {
			console.log('returning')
			return null
		}
		var keys = Object.keys(this.state.timeSeries)
		var highs = new Array(keys.length)
		for (let i = 0; i < keys.length; i++) {
			highs[i] = parseInt(this.state.timeSeries[`${ keys[i] }`]['2. high'], 10)
		}
		return highs
	}

	componentDidMount() {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ this.props.panel.name }&apikey=PUITOEHB47EXYOC4`)
            .then(response => response.json())
            .then(data => this.setState(prevState => {
            	return {
            		timeSeries: data['Weekly Time Series'],
            	}
            }))
    }

	render() {
		console.log(this.props.panel.name)
		console.log(this.state.timeSeries)
		

		let highest = this.arrOfHighestPrice()
		console.log(highest)

		return(
			<div>
				<h1> <hr/> { this.props.panel.name }</h1>
				<h1> { highest ? highest[0] : 'loading' }</h1>
				<h1>{ this.props.panel.clicked ? 'clicked' : 'not clicked' }</h1>
				<button onClick={ () => this.props.onClick(this.props.panel.id) }>stock</button>
			</div>
		)
	}
}
export default StockPanel