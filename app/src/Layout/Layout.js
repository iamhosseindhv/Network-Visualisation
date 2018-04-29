import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import MenuIcon from '@material-ui/icons/Menu';

import Form from '../Form/Form';

const drawerWidth = 320;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
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
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});


class Layout extends React.Component {
    state = {
        open: false,
    };

    handleDrawerToggle = () => { this.setState({ open: !this.state.open }) };

    render() {
        const {
            children,
            classes,
            theme,
            onChangeForm,
        } = this.props;

        return (
            <div className={classes.root}>
                {/* <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)} >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap> Mini variant drawer </Typography>
                    </Toolbar>
                </AppBar> */}

                <Drawer
                    variant="permanent"
                    classes={{ paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose), }}
                    open={this.state.open}
                >
                    {/* Form stuff start - Form onChange={onChangeForm} */}
                    <Form
                        open={this.state.open}
                        onToggleOpen={this.handleDrawerToggle}
                        onChange={onChangeForm}
                    />
                    {/* Form stuff end */}

                </Drawer>

                <main className={classes.content}>
                    {/* uncomment line below if you also uncommented the Appbar/Toolbar component */}
                    {/* <div className={classes.toolbar} /> */}
                    {children}
                </main>
            </div>
        );
    }
}

Layout.propTypes = {
    /**
     * The contents of the drawer.
     */
    children: PropTypes.node,
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
    onFormChange: PropTypes.func,
};


export default withStyles(styles, { withTheme: true })(Layout);