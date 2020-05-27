import React from 'react'

class StockPanel extends React.Component {
	constructor() {
		super()
		this.state={}
	}

	render() {
		return(
			<div>
				<h1>{this.props.id}</h1>
				<button onClick={ () => this.props.onClick(this.props.id) }>stock</button>
			</div>
		)
	}
}
export default StockPanel