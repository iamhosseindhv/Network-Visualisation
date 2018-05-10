import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import D3Graph from '../D3Graph/D3Graph';
import CollapsibleDrawer from '../CollapsibleDrawer/CollapsibleDrawer';
import { muiTheme, styles } from './App.styles';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            graphData: {},
            graphConfig: {},
        };
    }

    onChangeForm = config => { this.setState({ graphConfig: config }) };

    onChangeData = data => { this.setState({ graphData: data }) };

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={muiTheme}>
                <div className={classes.root}>
                    <CollapsibleDrawer onChangeForm={this.onChangeForm} onChangeData={this.onChangeData} />
                    <D3Graph data={this.state.graphData} config={this.state.graphConfig} />
                </div>
            </MuiThemeProvider>
        );
    }

}

export default withStyles(styles)(App);