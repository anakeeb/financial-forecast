import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import Fade from 'react-bootstrap/Fade'
import CanvasJSReact from '../canvasjs.react'
import { Layout } from '../components/Layout'
import styled from 'styled-components'





var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSChart = CanvasJSReact.CanvasJSChart


class Main extends React.Component {
	constructor() {
		super()
		this.state={
			predicted: null,
			finishedTraining: false,
			epochIteration: 0,
			epochs: 100,
			timePortion: 7
		}
		this.arrOfClosePrice = this.arrOfClosePrice.bind(this)
		this.testModel = this.testModel.bind(this)
		this.handleStartClick = this.handleStartClick.bind(this)
		this.handleEpochPlusClick = this.handleEpochPlusClick.bind(this)
		this.handleEpochMinusClick = this.handleEpochMinusClick.bind(this)
		this.handleTimePlusClick = this.handleTimePlusClick.bind(this)
		this.handleTimeMinusClick = this.handleTimeMinusClick.bind(this)
	}

	arrOfClosePrice() {
		let selectedId = -1
		if (this.props.panels[0].selected === true) {
			selectedId = 0
		}
		else if (this.props.panels[1].selected === true) {
			selectedId = 1
		}
		else if (this.props.panels[2].selected === true) {
			selectedId = 2
		}
		else {
			selectedId = -1
		}
		if ((selectedId < 0) || (this.props.panels[selectedId].timeSeries === null)) {
			console.log('returning')
			return null
		}
		var keys = Object.keys(this.props.panels[selectedId].timeSeries)
		var closes = new Array(keys.length)
		for (let i = 0; i < keys.length; i++) {
			closes[i] = parseInt(this.props.panels[selectedId].timeSeries[`${ keys[i] }`]['4. close'], 10)
		}
		return closes
	}

	handleStartClick() {

		let prices = this.arrOfClosePrice()
		let thisVar = this
		this.testModel(prices, 7, 100).then(function (result) {
			console.log(result)
			console.log(thisVar.state)
			thisVar.setState(prevState => {
				return {
					predicted: result,
					finishedTraining: true,
					epochIteration: prevState.epochIteration,
					epochs: prevState.epochs
				}
			})
		})

	}

	handleEpochPlusClick() {
		this.setState(prevState => {
			return {
				predicted: prevState.predicted,
				finishedTraining: prevState.finishedTraining,
				epochIteration: prevState.epochIteration,
				epochs: prevState.epochs + 1,
				timePortion: prevState.timePortion
			}
		})
	}

	handleEpochMinusClick() {
		this.setState(prevState => {
			let epoch = prevState.epochs
			if (epoch > 1) {
				epoch -= 1
			}
			return {
				predicted: prevState.predicted,
				finishedTraining: prevState.finishedTraining,
				epochIteration: prevState.epochIteration,
				epochs: epoch,
				timePortion: prevState.timePortion
			}
		})
	}

	handleTimePlusClick() {
		this.setState(prevState => {
			return {
				predicted: prevState.predicted,
				finishedTraining: prevState.finishedTraining,
				epochIteration: prevState.epochIteration,
				epochs: prevState.epochs,
				timePortion: prevState.timePortion + 1
			}
		})
	}

	handleTimeMinusClick() {
		this.setState(prevState => {
			let time = prevState.timePortion
			if (time > 1) {
				time -= 1
			}
			return {
				predicted: prevState.predicted,
				finishedTraining: prevState.finishedTraining,
				epochIteration: prevState.epochIteration,
				epochs: prevState.epochs,
				timePortion: time
			}
		})
	}

	//start of ml functions

	testModel(prices) {
		console.log(prices)
		let epochs = this.state.epochs
		let timePortion = this.state.timePortion
		this.setState(prevState => {
			return {
				predicted: null,
				finishedTraining: false,
				epochIteration: 0,
				epochs: epochs,
				timePortion: timePortion
			}
		})
		let thisVar = this
		return new Promise(function (resolve, reject) {
			console.log('in testModel promise')
			console.log(thisVar.state)
			try {
				let predictedForState


				//below are helper functions to manipulate data/implement the neural network

				//next two functions normalize data
				const minMaxScalar = function (data, min, max) {
				    let scaledData = data.map((value) => {
				        return (value - min) / (max - min)
				    })
				    return {
				    	data: scaledData,
				    	min: min,
				    	max: max
				    }
				}

				const minMaxInverseScalar = function (data, min, max) {
					console.log('minMaxInverseScalar')
					console.log(data)
				    let scaledData = data.map(value => {
				        return value * (max - min) + min
				    })

				    return {
				        data: scaledData,
				        min: min,
				        max: max
				    }
				}

				//finds last timePortion days of the array
				const lastTimePortionDays = function (data, timePortion) {
				    let size = data.length
				    let features = []

				    for (let i = (size - timePortion); i < size; i++) {
				        features.push(data[i])
				    }
				    
				    return features
				}

				//processes the data
				const processData = function (prices, timePortion) {
					console.log('processData')
					let min = Number.MAX_SAFE_INTEGER
					let max = 0
				    for(let i = 0; i < prices.length; i++) {
				    	if (prices[i] >= max) {
				    		max = prices[i]
				    	}
				    	if (prices[i] <= min) {
				    		min = prices[i]
				    	}
				    }
					let scaled = minMaxScalar(prices, min, max)
					let size = prices.length
					let trainX = []
					let trainY = []

				    try {
				        for (let i = timePortion; i < size; i++) {
				            for (let j = (i - timePortion); j < i; j++) {
				                trainX.push(scaled.data[j])
				            }
				            trainY.push(scaled.data[i])
				        }
				    }
				    catch (ex) {
				        console.log(ex)
				    }

				    return {
				    	size: (size - timePortion),
				        timePortion: timePortion,
				        trainX: trainX,
				        trainY: trainY,
				        min: scaled.min,
				        max: scaled.max,
				        originalData: prices
				    }
				}

				//gets the model
				const getModel = function (data) {
				    return new Promise(function (resolve, reject) {

				        // Linear (sequential) stack of layers
				        const model = tf.sequential()

				        // Define input layer
				        model.add(tf.layers.inputLayer({
				            inputShape: [timePortion, 1],
				        }))

				        // Add the first convolutional layer
				        model.add(tf.layers.conv1d({
				            kernelSize: 2,
				            filters: 128,
				            strides: 1,
				            use_bias: true,
				            activation: 'relu',
				            kernelInitializer: 'VarianceScaling'
				        }))

				        // Add the Average Pooling layer
				        model.add(tf.layers.averagePooling1d({
				            poolSize: [2],
				            strides: [1]
				        }))

				        // Add the second convolutional layer
				        model.add(tf.layers.conv1d({
				            kernelSize: 2,
				            filters: 64,
				            strides: 1,
				            use_bias: true,
				            activation: 'relu',
				            kernelInitializer: 'VarianceScaling'
				        }))

				        // Add the Average Pooling layer
				        model.add(tf.layers.averagePooling1d({
				            poolSize: [2],
				            strides: [1]
				        }))

				        // Add Flatten layer, reshape input to (number of samples, number of features)
				        model.add(tf.layers.flatten({

				        }))

				        // Add Dense layer, 
				        model.add(tf.layers.dense({
				            units: 1,
				            kernelInitializer: 'VarianceScaling',
				            activation: 'linear'
				        }))
				        console.log('getModel returning')
				        return resolve({
				            'model': model,
				            'data': data
				        })
				    })
				}

				//trains model
				const train = function (model, data, epochs) {
				    console.log("MODEL SUMMARY: ")
				    model.summary()

				    const epochFunc = function () {
				    	thisVar.setState(prevState => {
				    		return {
				    			predicted: prevState.predicted,
				    			finishedTraining: prevState.finishedTraining,
				    			epochIteration: prevState.epochIteration + 1,
				    			epochs: prevState.epochs
				    		}
				    	})
				    }
				    return new Promise(function (resolve, reject) {
				        console.log('in promise')
				        try {
				            // Optimize using adam (adaptive moment estimation) algorithm
				            model.compile({ optimizer: 'adam', loss: 'meanSquaredError' })

				            // Train the model
				            model.fit(data.tensorTrainX, data.tensorTrainY, {
				                epochs: epochs,
				                callbacks: {
				                	onEpochEnd: epochFunc
				                }
				            }).then(function (result) {
				                for (let i = 0; i < result.epoch.length; ++i) {
				                    console.log("Loss after Epoch " + i + " : " + result.history.loss[i])
				                }
				                console.log("Loss after last Epoch (" + result.epoch.length + ") is: " + result.history.loss[result.epoch.length-1])
				                resolve(model)
				            })
				        }
				        catch (ex) {
				            reject(ex)
				        }
				    })
				}

				

				//function continues
				

				let data = processData(prices, timePortion)
				let nextDayPrediction = lastTimePortionDays(prices, timePortion)

				getModel(data).then(function (built) {
					let tensorData = {
				        tensorTrainX: tf.tensor1d(built.data.trainX).reshape([built.data.size, built.data.timePortion, 1]),
				    	tensorTrainY: tf.tensor1d(built.data.trainY)
					}
					let max = built.data.max
		            let min = built.data.min
		            console.log(built)
					train(built.model, tensorData, epochs).then(function (model) {
						// Predict for the same train data
		                // We gonna show the both (original, predicted) sets on the graph 
		                // so we can see how well our model fits the data
		                var predictedX = model.predict(tensorData.tensorTrainX)
		                        
		                // Scale the next day features
		                let nextDayPredictionScaled = minMaxScalar(nextDayPrediction, min, max)
		                // Transform to tensor data
		                let tensorNextDayPrediction = tf.tensor1d(nextDayPredictionScaled.data).reshape([1, built.data.timePortion, 1])
		                // Predict the next day stock price
		                let predictedValue = model.predict(tensorNextDayPrediction)    
		                        
		                // Get the predicted data for the train set
		                predictedValue.data().then(function (predValue) {
		                    // Revert the scaled features, so we get the real values
		                    let inversePredictedValue = minMaxInverseScalar(predValue, min, max)

		                    // Get the next day predicted value
		                    predictedX.data().then(function (pred) {
		                        // Revert the scaled feature
		                        var predictedXInverse = minMaxInverseScalar(pred, min, max)

		                        // Convert Float32Array to regular Array, so we can add additional value
		                        predictedXInverse.data = Array.prototype.slice.call(predictedXInverse.data)
		                        // Add the next day predicted stock price so it's showed on the graph
		                        predictedXInverse.data[predictedXInverse.data.length] = inversePredictedValue.data[0]
		    
		                        // Revert the scaled labels from the trainY (original), 
		                        // so we can compare them with the predicted one
		                        var trainYInverse = minMaxInverseScalar(built.data.trainY, min, max)

		                        console.log('original')
		                        console.log(trainYInverse.data)
		                        console.log('predicted')
		                		console.log(predictedXInverse.data)
		                		predictedForState = predictedXInverse.data
		                		console.log('this.setState')
								resolve(predictedForState)
		                    })
		                })    
					})
				})
			}
			catch (ex) {
				reject(ex)
			}
		})
    }


	render() {
		console.log('render')
		const Styles = styled.div`
			.startButton {
				background-color: #88D498;
				color: #DDD;
				cursor: pointer;
				&:hover {
					text-shadow: #B7E5C1;

				}
			}

			.epoch-text {
				color: #DDD;
			}

			.dropdown-button {
				background-color = #000
			}

			.navbar-secondary {
				background-color: #222;
			}
		`

		let btnName = ''
		let selectedId = -1
		if (this.props.panels[0].selected === true) {
			btnName = this.props.panels[0].name
			selectedId = 0
		}
		else if (this.props.panels[1].selected === true) {
			btnName = this.props.panels[1].name
			selectedId = 1
		}
		else if (this.props.panels[2].selected === true) {
			btnName = this.props.panels[2].name
			selectedId = 2
		}
		else {
			btnName = 'Stock'
		}

		let startButton
		let epochButton
		let timeButton
		if (btnName !== 'Stock') {
			startButton = (
				<Styles>
					<Col>
						<Button className='startButton' onClick={ this.handleStartClick }>start</Button>
					</Col>
				</Styles>
			)

			epochButton = (
				<Styles>
					<Col className='epoch-text'>
						<Button className='startButton' onClick={ this.handleEpochMinusClick }>-</Button> 
						{ this.state.epochs } Epochs
						<Button className='startButton' onClick={ this.handleEpochPlusClick }>+</Button>	
					</Col>
				</Styles>
			)

			timeButton = (
				<Styles>
					<Col className='epoch-text'>
						<Button className='startButton' onClick={ this.handleTimeMinusClick }>-</Button> 
						{ this.state.timePortion } Weeks back
						<Button className='startButton' onClick={ this.handleTimePlusClick }>+</Button>	
					</Col>
				</Styles>
			)
		}


		let options
		let graph

		if((selectedId > -1) && (this.state.finishedTraining)) {
			let closes = this.arrOfClosePrice()
			CanvasJS.addColorSet("greenShades",
                [
	                "#88D498",
	                "9ED488",
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
						type: 'line',
						dataPoints: [
							{
								x: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000),
								y: closes[7]
							},
							{
								x: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000),
								y: closes[6]
							},
							{
								x: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
								y: closes[5]
							},
							{
								x: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
								y: closes[4]
							},
							{
								x: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
								y: closes[3]
							},
							{
								x: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
								y: closes[2]
							},
							{
								x: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
								y: closes[1]
							},
							{
								x: new Date(Date.now()),
								y: closes[0]
							}
						]
					},
					{
						type: 'line',
						dataPoints: [
							{
								x: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000),
								y: this.state.predicted[8]
							},
							{
								x: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000),
								y: this.state.predicted[7]
							},
							{
								x: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
								y: this.state.predicted[6]
							},
							{
								x: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
								y: this.state.predicted[5]
							},
							{
								x: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
								y: this.state.predicted[4]
							},
							{
								x: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
								y: this.state.predicted[3]
							},
							{
								x: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
								y: this.state.predicted[2]
							},
							{
								x: new Date(Date.now()),
								y: this.state.predicted[1]
							},
							{
								x: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
								y: this.state.predicted[0]
							}
						]
					}
				]
			}
			graph = (
				<Fade>
					<CanvasJSChart options={ options } />
				</Fade>
			)		
		}
		


		let percentComplete = ((this.state.epochIteration / this.state.epochs) * 100)

		return (
			<Styles>
				<Container fluid>
					<Row className='navbar-secondary'>
						<Col>
							<DropdownButton id="dropdown-basic-button" title={ btnName }>
							    <Dropdown.Item onSelect={ () => this.props.onSelect(this.props.panels[0].id) }> { this.props.panels[0].name } </Dropdown.Item>
							    <Dropdown.Item onSelect={ () => this.props.onSelect(this.props.panels[1].id) }> { this.props.panels[1].name } </Dropdown.Item>
							    <Dropdown.Item onSelect={ () => this.props.onSelect(this.props.panels[2].id) }> { this.props.panels[2].name } </Dropdown.Item>
							</DropdownButton>
						</Col>
						{ timeButton }
						{ epochButton}
						{ startButton }
					</Row>
				</Container>
				<Layout>
					
					<ProgressBar now={ percentComplete }/>
					{ graph }
				</Layout>
			</Styles>
		)
	}
}

export default Main