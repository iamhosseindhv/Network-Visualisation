import React, { Component } from 'react';
import { Graph } from '../react-d3-graph';
import { createConfig } from './D3Graph.config';


export default class D3Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: createConfig(),
            data: {},
            renderGraph: false,
        };
    }

    componentWillReceiveProps = newProps => {
        const config = createConfig(newProps.config);
        this.setState({ config: config });
        //if there is data
        if (Object.keys(newProps.data).length !== 0) {
            this.setState({
                data: newProps.data,
                renderGraph: true,
            });
        }
    }

    onClickNode = id => console.log(`Clicked node ${id}`);

    onDoubleClickNode = id => console.log(`Double clicked node ${id}`);

    onClickLink = (source, target) => console.log(`Clicked link between ${source} and ${target}`);

    onMouseOverNode = id => console.log(`Do something when mouse is over node (${id})`);

    onMouseOutNode = id => console.log(`Do something when mouse is out of node (${id})`);

    onMouseOverLink = (source, target) => {
        console.log(`Do something when mouse is over link between ${source} and ${target}`);
    }

    onMouseOutLink = (source, target) => {
        console.log(`Do something when mouse is out of link between ${source} and ${target}`);
    }

    render() {

        if (this.state.renderGraph) {
            const data = {
                nodes: this.state.data.nodes,
                links: this.state.data.links
            };
            const graphProps = {
                id: 'graph',
                data,
                config: this.state.config,
                onClickNode: this.onClickNode,
                onDoubleClickNode: this.onDoubleClickNode,
                onClickLink: this.onClickLink,
                onMouseOverNode: this.onMouseOverNode,
                onMouseOutNode: this.onMouseOutNode,
                onMouseOverLink: this.onMouseOverLink,
                onMouseOutLink: this.onMouseOutLink
            };
            return (
                <Graph ref="graph" {...graphProps} />
            );

        } else {
            //render a page which shows loading and saying that data is on it's way
            return (
                <h2>waiting for data...</h2>
            );
        }


    }
}