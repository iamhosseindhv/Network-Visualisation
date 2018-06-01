import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import D3Graph from '../D3Graph/D3Graph';
import CollapsibleDrawer from '../CollapsibleDrawer/CollapsibleDrawer';
import { RootWrapper, getMuiTheme } from './App.styles';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            graphData: {},
            graphConfig: {},
            theme: getMuiTheme(),
        };
    }


    onChangeForm = config => {
        //TODO: check for differendces first
        const newTheme = getMuiTheme(config.isDarkTheme);
        this.setState({
            theme: newTheme,
            graphConfig: config,
        });
    };

    onChangeData = data => { this.setState({ graphData: data }) };

    render() {
        return (
            <MuiThemeProvider theme={this.state.theme}>
                <RootWrapper>
                    <CollapsibleDrawer onChangeForm={this.onChangeForm} onChangeData={this.onChangeData} />
                    <D3Graph data={this.state.graphData} config={this.state.graphConfig} />
                </RootWrapper>
            </MuiThemeProvider>
        );
    }

}

export default App;