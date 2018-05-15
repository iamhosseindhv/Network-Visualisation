import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { ListItemText } from 'material-ui/List';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';
import Drawer from 'material-ui/Drawer';
import styles from './NodeView.styles';

const NODE_KEY_BLACKLIST = ['symbolType', 'highlighted', 'x', 'y', 'index', 'vy', 'vx'];

class NodeView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            drawerRows: [],
        }
    }

    omitKeys = (obj) => {
        var dup = {};
        for (var key in obj) {
            if (NODE_KEY_BLACKLIST.indexOf(key) == -1) {
                dup[key] = obj[key];
            }
        }
        return dup;
    }

    componentWillReceiveProps = (nextProps) => {
        //TODO: first check if there're differences
        const open = nextProps.open;
        const ddd = this.omitKeys(nextProps.node);
        const drawerRows = Object.entries(ddd).map((item, index) => {
            const key = item[0], value = item[1];
            return (
                <ListItem key={index} value={value}>
                    <ListItemText secondary={`${key}`} primary={`${value}`} />
                </ListItem>
            )
        });
        this.setState({ drawerRows, open });
    }

    render() {
        const {
            classes,
            open,
            onClose,
        } = this.props;

        return (
            <Drawer
                anchor='right'
                variant='persistent'
                classes={{ paper: classNames(classes.drawerPaper) }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={onClose}>
                        <ClearIcon />
                    </IconButton>
                    <ListItemText primary="Info" />
                </div>
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
    onClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(NodeView);