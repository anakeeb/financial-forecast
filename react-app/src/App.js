import React from 'react';
import StockPanel from './components/StockPanel'


class App extends React.Component {
	constructor() {
		super()
		this.state={

		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(id) {
		console.log(id)
	}

	render() {
		return (
		  <div>
		    <StockPanel id={1} onClick={ this.handleClick }/>
		    <StockPanel id={2} onClick={ this.handleClick }/>
		    <StockPanel id={3} onClick={ this.handleClick }/>
		    <StockPanel id={4} onClick={ this.handleClick }/>
		    <StockPanel id={5} onClick={ this.handleClick }/>
		    <StockPanel id={6} onClick={ this.handleClick }/>
		  </div>
		)
	}

}


export default App;
