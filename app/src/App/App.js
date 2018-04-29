import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import createPalette from 'material-ui/styles/palette';

import D3Graph from '../D3Graph/D3Graph';
import Layout from '../Layout/Layout';



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
	}

	state = {
		config: 'sss',
	}

	onFormChange = data => {
		this.setState({ config: data });
	}
	
	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<Layout onFormChange={this.onFormChange}>
					<D3Graph />
					{/* <D3Graph config={this.state.config}/> */}
				</Layout>
			</MuiThemeProvider>
		);
	}

}