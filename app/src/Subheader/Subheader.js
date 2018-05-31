import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    subheading: {
        paddingLeft: theme.spacing.unit,
        fontSize: '1rem',
        fontWeight: 400,
        color: 'rgba(0, 0, 0, 0.54)',
        marginTop: theme.spacing.unit - 1,
    },
});


class Subheader extends Component {
    render() {
        const { 
            classes,
            id,
            title,
            icon,
        } = this.props;
        return (
            <ListItem>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <Typography className={classes.subheading} id={id}>
                    {title}
                </Typography>
            </ListItem>
        );
    }
}

Subheader.propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object.isRequired,
    /**
     * @ignore
     */
    theme: PropTypes.object.isRequired,
    //...
    //...
    //...
    //...
    //...
};

export default withStyles(styles, { withTheme: true })(Subheader);