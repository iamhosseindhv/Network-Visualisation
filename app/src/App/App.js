import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import D3Graph from '../D3Graph/D3Graph';
import CollapsibleDrawer from '../CollapsibleDrawer/CollapsibleDrawer';
import { RootWrapper, muiTheme } from './App.styles';


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
        return (
            <MuiThemeProvider theme={muiTheme}>
                <RootWrapper>
                    <CollapsibleDrawer onChangeForm={this.onChangeForm} onChangeData={this.onChangeData} />
                    <D3Graph data={this.state.graphData} config={this.state.graphConfig} />
                </RootWrapper>
            </MuiThemeProvider>
        );
    }

}

export default App;