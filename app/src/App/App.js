import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import D3Graph from '../D3Graph/D3Graph';
import Layout from '../Layout/Layout';

import data from '../data';


const muiTheme = createMuiTheme({
	palette: {
		primary: {
			light: purple[300],
			main: purple[500],
			dark: purple[700],
		},
		secondary: {
			light: green[300],
			main: green[500],
			dark: green[700],
		},
	},
});

export default class App extends Component {
	constructor(properties) {
		super(properties)
		this.state = {
			graphData: {},
			graphConfig: {},
		}


		this.getGraphData()
			.then(data => this.setState({ graphData: data }))
			.catch(err => console.log(err));
	}

	getGraphData = async () => {
		// const response = await fetch('/data/graph_name');
		// const body = await response.json();
		// if (response.status !== 200) throw Error(body.message);
		// return body;

		//fake async
		return data;
	};


	onChangeForm = config => { this.setState({ graphConfig: config }) }
	
	onChangeData = data => { this.setState({ graphData: data }) }

	render() {
		return (
			<MuiThemeProvider theme={muiTheme}>
				<Layout onChangeForm={this.onChangeForm} onChangeData={this.onChangeData}>
					<D3Graph data={this.state.graphData} config={this.state.graphConfig} />
				</Layout>
			</MuiThemeProvider>
		);
	}

}