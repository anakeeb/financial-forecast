import React from 'react'

class StockPanel extends React.Component {
	constructor() {
		super()
		var d = new Date()
		let day = d.getDate()
		if (day < 10) {
			day = '0' + day.toString()
		}
		else {
			day = day.toString()
		}
		let month = d.getMonth() + 1
		if (month < 10) {
			month = '0' + month.toString()
		}
		else {
			month = month.toString()
		}
		let year = d.getFullYear()
		year = year.toString()
		this.state={
			timeSeries: null,
			date: `${year}-${month}-${day} `
		}
		this.findHighestDailyPrice = this.findHighestDailyPrice.bind(this)
	}


	findHighestDailyPrice() {
		if (this.state.timeSeries === null) {
			console.log('returning')
			return 0
		}
		let highest = 0
		console.log(this.state.timeSeries)
		for (let i = 10; i < 17; i++) {
			for(let j = 0; j < 56; j += 5) {
				if ((i === 16) && (j > 0)) {
					return highest
				}
				if (j < 10) {
					console.log(this.state.date + `${i}:0${j}:00`)
					console.log(this.state.timeSeries[this.state.date + `${i}:0${j}:00`])
					console.log(this.state.timeSeries[this.state.date + `${i}:0${j}:00`]['2. high'])
					let high = parseInt(this.state.timeSeries[this.state.date + `${i}:0${j}:00`]['2. high'], 10)
					if (high >= highest) {
						highest = high
					}
				}
				else {
					console.log(this.state.date + `${i}:${j}:00`)
					console.log(this.state.timeSeries[this.state.date + `${i}:${j}:00`]['2. high'])
					console.log(this.state.timeSeries[this.state.date + `${i}:${j}:00`]['2. high'])
					let high = parseInt(this.state.timeSeries[this.state.date + `${i}:${j}:00`]['2. high'], 10)
					if (high >= highest) {
						highest = high
					}
				}
				
			}
		}
		console.log(highest)
		return highest
	}

	componentDidMount() {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ this.props.panel.name }&interval=5min&apikey=PUITOEHB47EXYOC4"`)
            .then(response => response.json())
            .then(data => this.setState(prevState => {
            	return {
            		timeSeries: data['Time Series (5min)'],
                	date: prevState.date
            	}
            }))
    }

	render() {
		console.log(this.props.panel.name)
		console.log(this.state.timeSeries)
		console.log(this.state.date)
		
		let highest = this.findHighestDailyPrice()


		return(
			<div>
				<h1> <hr/> { this.props.panel.name }</h1>
				<h1>{ highest }</h1>
				<h1>{ this.props.panel.clicked ? 'clicked' : 'not clicked' }</h1>
				<button onClick={ () => this.props.onClick(this.props.panel.id) }>stock</button>
			</div>
		)
	}
}
export default StockPanel