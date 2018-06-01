import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Graph } from '../react-d3-graph';
import { createConfig } from './D3Graph.config';
import NodeView from '../NodeView/NodeView';
import styles from './D3Graph.styles';

class D3Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: createConfig(),
            data: {},
            drawerOpen: false,
            shouldRenderGraph: false,
            presentDrawer: true,
            highlightedNode: [],
        };
    }

    componentWillReceiveProps = newProps => {
        //TODO: check for differences, and update (if there were any diff)
        const darkTheme = newProps.config.isDarkTheme;
        const config = createConfig(newProps.config, darkTheme);
        this.setState({ config });
        //if there is data
        if (Object.keys(newProps.data).length !== 0) {
            this.setState({
                data: newProps.data,
                shouldRenderGraph: true,
            });
        }
    }

    onClickNode = node => { /*console.log(`Clicked node ${node}`);*/ }

    onDoubleClickNode = node => {
        const presentDrawer = this.state.presentDrawer;
        if (!presentDrawer) {
            this.setState({ presentDrawer: true });
        } else {
            this.setState({
                highlightedNode: node,
                drawerOpen: !this.state.drawerOpen,
            });
        }
    }

    onMouseOverNode = node => { /*console.log(`Mouse is over node (${node})`);*/ }

    onMouseOutNode = node => { /*console.log(`Mouse is out of node (${node})`);*/ }

    handleClose = () => {
        this.setState({
            drawerOpen: false,
            presentDrawer: false,
        });
    };

    render() {
        const { classes } = this.props;
        if (!this.state.shouldRenderGraph) {
            return <h2>waiting for data...</h2>;
        }

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
            onMouseOverNode: this.onMouseOverNode,
            onMouseOutNode: this.onMouseOutNode,
        };
        return (
            <main className={classes.content}>
                <NodeView
                    open={this.state.drawerOpen}
                    node={this.state.highlightedNode}
                    onClose={this.handleClose}
                />
                <Graph ref="graph" {...graphProps} />
            </main>
        );
    }

}

D3Graph.propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object.isRequired,
    /**
     * @ignore
     */
    theme: PropTypes.object.isRequired,
    /**
     * The data to be shown as a graph
     */
    data: PropTypes.object.isRequired,
    /**
     * Configurations of the graph
     */
    config: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(D3Graph);