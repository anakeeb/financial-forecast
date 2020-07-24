import React from 'react'
import Card from 'react-bootstrap/Card'
import Fade from 'react-bootstrap/Fade'
import CanvasJSReact from '../canvasjs.react'
import styled from 'styled-components'


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

		let highest = null
		let lowest = null

		if (this.props.panel.timeSeries) {
			highest = this.arrOfHighestPrice()
			lowest = this.arrOfLowestPrice()
		}
		
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
				theme: 'light1',
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
								x: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
								y: [highest[9], lowest[9]]
							},
							{
								x: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
								y: [highest[8], lowest[8]]
							},
							{
								x: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
								y: [highest[7], lowest[7]]
							},
							{
								x: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
								y: [highest[6], lowest[6]]
							},
							{
								x: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
								y: [highest[5], lowest[5]]
							},
							{
								x: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
								y: [highest[4], lowest[4]]
							},
							{
								x: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
								y: [highest[3], lowest[3]]
							},
							{
								x: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
								y: [highest[2], lowest[2]]
							},
							{
								x: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
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

		const graph = (
			<Fade>
				<CanvasJSChart options={ options } />
			</Fade>
		)

		const text = (
			<>
				<Card.Title>
					{ this.props.panel.name }
				</Card.Title>
				
		    </>

		)


		const Styles = styled.div`
			.stock-card {
				background: linear-gradient(to bottom, #88d498 20%, #6BCA7F 100%);
				color: #FFF;
				padding:16px 31px;
				height: 200;
				width: 100;
				&:hover {
					background: #FFF;
					color: #000;
					height: 200;
					width: 100;
				}
			}
		`

		return(

			<Styles>
				<Card style={{ width: '18rem', height: '18rem' }} border="dark" onMouseEnter={ () => this.props.onHover(this.props.panel.id) } onMouseLeave={ () => this.props.onHover(this.props.panel.id) }>
			        <Card.Body>
			    	    {this.props.panel.hovered ? graph : text }
			        </Card.Body>
			    </Card>
			</Styles>
		    
		)
	}
}
export default StockPanel