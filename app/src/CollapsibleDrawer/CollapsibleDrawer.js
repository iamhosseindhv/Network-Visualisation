import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
/* Uncomment if you needed app bar at the top */
/*import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import MenuIcon from '@material-ui/icons/Menu';*/
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Form from '../Form/Form';
import Filters from '../Filters/Filters';
import styles from './CollapsibleDrawer.styles';


class CollapsibleDrawer extends Component {
    state = {
        open: true,
    };

    handleDrawerToggle = () => { this.setState({ open: !this.state.open }) };

    render() {
        const {
            classes,
            onChangeForm,
            onChangeData,
        } = this.props;

        return (
            /* Uncomment if you needed app bar at the top */
            /* <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)} >
                <Toolbar disableGutters={!this.state.open}>
                    <IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerToggle}
                        className={classNames(classes.menuButton, this.state.open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap> Mini variant drawer </Typography>
                </Toolbar>
            </AppBar> */

            <Drawer
                variant="permanent"
                classes={{ paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose), }}
                open={this.state.open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={this.handleDrawerToggle}>
                        {this.state.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <Form onChange={onChangeForm} />
                <Divider />
                <Filters onChangeData={onChangeData} />
            </Drawer>
        );
    }
}

CollapsibleDrawer.propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object.isRequired,
    /**
     * @ignore
     */
    theme: PropTypes.object.isRequired,
    /**
     * @param {object} event The event source of the callback
     */
    onChangeForm: PropTypes.func.isRequired,
    /**
     * @param {object} event The event source of the callback
     */
    onChangeData: PropTypes.func.isRequired,
};


export default withStyles(styles, { withTheme: true })(CollapsibleDrawer);