import React from 'react'
import Card from 'react-bootstrap/Card'
import Fade from 'react-bootstrap/Fade'
import CanvasJSReact from '../canvasjs.react'


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StockPanel extends React.Component {
	constructor() {
		super()
		this.state={
			hover: false
		}
		this.arrOfHighestPrice = this.arrOfHighestPrice.bind(this)
		this.arrOfLowestPrice = this.arrOfLowestPrice.bind(this)
		this.arrOfDates = this.arrOfDates.bind(this)
	}

	arrOfDates() {
		if (this.props.panel.timeSeries === null) {
			console.log('returning')
			return null
		}
		var keys = Object.keys(this.props.panel.timeSeries)
		console.log(keys)
		return keys
	}
	
	arrOfHighestPrice() {
		if (this.props.panel.timeSeries === null) {
			console.log('returning')
			return null
		}
		var keys = Object.keys(this.props.panel.timeSeries)
		var lows = new Array(keys.length)
		for (let i = 0; i < keys.length; i++) {
			lows[i] = parseInt(this.props.panel.timeSeries[`${ keys[i] }`]['3. low'], 10)
		}
		return lows
	}

	arrOfLowestPrice() {
		if (this.props.panel.timeSeries === null) {
			console.log('returning')
			return null
		}
		var keys = Object.keys(this.props.panel.timeSeries)
		var highs = new Array(keys.length)
		for (let i = 0; i < keys.length; i++) {
			highs[i] = parseInt(this.props.panel.timeSeries[`${ keys[i] }`]['2. high'], 10)
		}
		return highs
	}

	render() {

		console.log(this.props.panel.name)
		console.log(this.props.panel.timeSeries)

		let highest = this.arrOfHighestPrice()
		let lowest = this.arrOfLowestPrice()
		let keys = this.arrOfDates()

		let options = null
		if (highest) {
			CanvasJS.addColorSet("greenShades",
                [
	                "#88D498",
	                "#008080",
	                "#2E8B57",
	                "#3CB371",
	                "#90EE90"            
                ])
			options = {
				colorSet: 'greenShades',
				theme: 'dark1',
				axisX: {
					valueFormatString: 'MMM D',

				},
				axisY: {
					includeZero: false,
					prefix: "$"
				},
				data: [
					{
						type: 'rangeArea',
						dataPoints: [

							{
								x: new Date(Date.now() - 63 * 24 * 60 * 60 * 1000),
								y: [highest[9], lowest[9]]
							},
							{
								x: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000),
								y: [highest[8], lowest[8]]
							},
							{
								x: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000),
								y: [highest[7], lowest[7]]
							},
							{
								x: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000),
								y: [highest[6], lowest[6]]
							},
							{
								x: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
								y: [highest[5], lowest[5]]
							},
							{
								x: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
								y: [highest[4], lowest[4]]
							},
							{
								x: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
								y: [highest[3], lowest[3]]
							},
							{
								x: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
								y: [highest[2], lowest[2]]
							},
							{
								x: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
								y: [highest[1], lowest[1]]
							},
							{
								x: new Date(Date.now()),
								y: [highest[0], lowest[0]]
							}

						]
					}
				]
			}
		}

		const toFade = (
			<Fade>
				{ this.props.panel.hovered ? <CanvasJSChart options={ options } /> : <h1></h1> }
			</Fade>
		)

		return(

			
			  <Card bg='light' text='dark' border='dark' onMouseEnter={ () => this.props.onHover(this.props.panel.id) } onMouseLeave={ () => this.props.onHover(this.props.panel.id) }>
			    <Card.Body>
			      <Card.Title> { this.props.panel.name } </Card.Title>
			    </Card.Body>
			    { toFade }
			    
			  </Card>
			  




			// <div>

			// 	<h1> <hr/> { this.props.panel.name }</h1>
			// 	<h1> { highest ? highest[0] : 'loading' }</h1>
			// 	<h1>{ this.props.panel.clicked ? 'clicked' : 'not clicked' }</h1>
			// 	<button onClick={ () => this.props.onClick(this.props.panel.id) }>stock</button>
			// 	{ this.props.panel.clicked ? <CanvasJSChart options={ options } /> : <h1></h1> }


			// </div>
		)
	}
}
export default StockPanel