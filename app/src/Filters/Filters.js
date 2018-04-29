import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';




class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        const {
            children,
            classes,
            theme,
        } = this.props;

        return (
            <div>
                <Divider />
                <p>Filter stuff here</p>
            </div>
        )
    }
}

Filters.propTypes = {
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
    onChangeData: PropTypes.func,
};

export default withStyles({ withTheme: true })(Filters);