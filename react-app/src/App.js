import React from 'react';
import StockPanel from './components/StockPanel'


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
				},
				// {
				// 	id: 6,
				// 	name: 'TSLA',
				// 	clicked: false
				// }
				
			]

		}
		this.handleClick = this.handleClick.bind(this)
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
				panels: updatedPanels
			}
		})

	}

	

	render() {
		const stockPanels = this.state.panels.map(panel => <StockPanel key={ panel.id } panel={ panel } onClick={ this.handleClick }/>)
		return (
		  <div>
		    { stockPanels }
		  </div>
		)
	}

}


export default App;
