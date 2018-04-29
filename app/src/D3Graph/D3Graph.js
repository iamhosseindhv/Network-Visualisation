import React, { Component } from 'react';
import { Graph } from '../react-d3-graph';

const defaultConfig = {
    graph: {
        nodeHighlightBehavior: true,
        automaticRearrangeAfterDropNode: true,
        highlightOpacity: 0.2,
        height: 800,
        width: 1200,
    },
    node: {
        color: '#d3d3d3',
        highlightColor: 'lightgreen',
        size: 200,
    },
    link: {
        highlightColor: '#484848'
    }
};

export default class D3Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: this.createConfig(),
            data: {},
            renderGraph: false,
        };
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

    componentWillReceiveProps = newProps => {
        const config = this.createConfig(newProps.config);
        this.setState({ config: config });
        //if there is data
        if (Object.keys(newProps.data).length !== 0) {
            this.setState({
                data: newProps.data,
                renderGraph: true,
            });
        }
    }

    createConfig = (newConfig = {}) => {
        const mergedConfig = {
            ...defaultConfig.graph,
            ...newConfig.graph,
            node: {
                ...defaultConfig.node,
                ...newConfig.node,
            },
            link: {
                ...defaultConfig.link,
                ...newConfig.link,
            },
        };
        return mergedConfig;
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