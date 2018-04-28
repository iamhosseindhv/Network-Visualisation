import React, { Component } from 'react';
import { Graph } from '../react-d3-graph';
import data from '../data';


export default class D3Graph extends Component {
    constructor(props) {
        super(props);
        this.state = { data };
    }

    onClickNode = id => console.log(`Clicked node ${id}`);

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

        const data = {
            nodes: this.state.data.nodes,
            links: this.state.data.links
        };

        const myConfig = {
            nodeHighlightBehavior: true,
            automaticRearrangeAfterDropNode: true,
            height: 800,
            width: 1200,
            node: {
                color: 'lightgreen',
                size: 120,
                highlightStrokeColor: 'blue'
            },
            link: {
                highlightColor: '#9900ff'
            }
        };

        const graphProps = {
            id: 'graph',
            data,
            config: myConfig,
            onClickNode: this.onClickNode,
            onClickLink: this.onClickLink,
            onMouseOverNode: this.onMouseOverNode,
            onMouseOutNode: this.onMouseOutNode,
            onMouseOverLink: this.onMouseOverLink,
            onMouseOutLink: this.onMouseOutLink
        };

        return (
            <Graph ref="graph" {...graphProps} />
        );
    }
}