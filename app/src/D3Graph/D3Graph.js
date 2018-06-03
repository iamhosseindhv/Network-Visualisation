import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Graph } from '../react-d3-graph';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import DialpadIcon from '@material-ui/icons/Dialpad';
import { createConfig } from './D3Graph.config';
import NodeView from '../NodeView/NodeView';
import styles from './D3Graph.styles';

const LoadingIndicator = props => {
    return (
        <div className={props.placeholderDark}>
            <Fade in={props.in} unmountOnExit>
                <LinearProgress />
            </Fade>
        </div>
    );
}

const NoDataLabel = props => {
    const classes = props.className;
    return (
        <div className={classes.loadingContainer}>
            <div className={classes.innerContainer}>
                <DialpadIcon className={classes.icon} style={{ width: 64, height: 64 }} iconStyle={{ fontSize: 40 }} />
                <h2>No Data Available</h2>
            </div>
        </div>
    );
}

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

    handleClose = () => {
        this.setState({
            drawerOpen: false,
            presentDrawer: false,
        });
    }

    render() {
        const { classes, loading } = this.props;
        if (!this.state.shouldRenderGraph) {
            return (
                <main className={classes.content}>
                    <LoadingIndicator className={classes.placeholderDark} in={loading} />
                    <NoDataLabel className={{
                        loadingContainer: classes.loadingContainer,
                        innerContainer: classes.innerContainer,
                        icon: classes.icon
                    }}
                    />
                </main >
            );
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
                <LoadingIndicator className={classes.placeholder} in={loading} />
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
    /**
     * @param {boolean} boolean value to determine we are loading graph data or not
     */
    loading: PropTypes.bool.isRequired,
};

export default withStyles(styles, { withTheme: true })(D3Graph);