import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';
import Drawer from 'material-ui/Drawer';
import styles from './NodeView.styles';


class NodeView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            drawerRows: [],
        }
    }

    componentWillReceiveProps = (nextProps) => {
        //TODO: first check if there're differences
        const node = nextProps.node, open = nextProps.open;
        const drawerRows = Object.entries(node).map((item, index) => {
            const key = item[0], value = item[1];
            return <MenuItem key={index} value={value}>{key}: {value}</MenuItem>
        });
        this.setState({ drawerRows, open });
    }

    render() {
        const { 
            classes,
            open,
            onToggle,
        } = this.props;

        return (
            <Drawer
                anchor='right'
                width='100'
                open={open}
                onClose={onToggle}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={onToggle}>
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
        );
    }
}

NodeView.propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object.isRequired,
    /**
     * @ignore
     */
    theme: PropTypes.object.isRequired,
    /**
     * Whether the view is open or not
     */
    open: PropTypes.bool.isRequired,
    /**
     * The node data to be displayed
     */
    node: PropTypes.array.isRequired,
    /**
     * @param {object} event The event source of the callback
     */
    onToggle: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(NodeView);