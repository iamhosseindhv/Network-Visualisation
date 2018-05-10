import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';
import Drawer from 'material-ui/Drawer';
import { Graph } from '../react-d3-graph';
import { createConfig } from './D3Graph.config';
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
        };
    }

    componentWillReceiveProps = newProps => {
        const config = createConfig(newProps.config);
        this.setState({ config: config });
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
        if (presentDrawer) {
            this.handleRenderingDrawerData(node);
            this.handleDrawerToggle();
        }
        this.setState({ presentDrawer: !presentDrawer });
    }

    onMouseOverNode = node => { /*console.log(`Mouse is over node (${node})`);*/ }

    onMouseOutNode = node => { /*console.log(`Mouse is out of node (${node})`);*/ }

    handleDrawerToggle = () => { this.setState({ drawerOpen: !this.state.drawerOpen }) };

    handleRenderingDrawerData = (node) => {
        const drawerRows = Object.entries(node).map((item, index) => {
            const key = item[0], value = item[1];
            return <MenuItem key={index} value={value}>{key}: {value}</MenuItem>
        });
        this.setState({ drawerRows });
    }

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
                <Drawer
                    anchor='right'
                    width='100'
                    open={this.state.drawerOpen}
                    onClose={this.handleDrawerToggle}>
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerToggle}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                    <ListItem>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Details" />
                    </ListItem>
                    {this.state.drawerRows}
                </Drawer>

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