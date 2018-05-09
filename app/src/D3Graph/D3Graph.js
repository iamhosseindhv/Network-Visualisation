import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';
import Drawer from 'material-ui/Drawer';
import { Graph } from '../react-d3-graph';
import { createConfig } from './D3Graph.config';

let drawerWidth = 260;
const styles = theme => ({
    list: {
        width: drawerWidth,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
});

class D3Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: createConfig(),
            data: {},
            drawerOpen: false,
            highlightedNode: {},
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
        this.setState({
            highlightedNode: node,
            presentDrawer: !presentDrawer,
        });
    }

    onMouseOverNode = node => { /*console.log(`Do something when mouse is over node (${node})`);*/ }

    onMouseOutNode = node => { /*console.log(`Do something when mouse is out of node (${node})`);*/ }

    onClickLink = (source, target) => { /*console.log(`Clicked link between ${source} and ${target}`);*/ }

    onMouseOverLink = (source, target) => {
        /*console.log(`Do something when mouse is over link between ${source} and ${target}`);*/
    }

    onMouseOutLink = (source, target) => {
        /*console.log(`Do something when mouse is out of link between ${source} and ${target}`);*/
    }

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

        if (this.state.shouldRenderGraph) {
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
                <Fragment>
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
                </Fragment>
            );

        } else {
            //render a page which shows loading and saying that data is on it's way
            return (
                <h2>waiting for data...</h2>
            );
        }


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
};

export default withStyles(styles, { withTheme: true })(D3Graph);