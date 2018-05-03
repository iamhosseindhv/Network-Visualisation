import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { ListItem } from 'material-ui/List';
import { FormControl } from 'material-ui/Form';
import Utils from '../utils/communications';


const styles = theme => ({
    formControl: {
        // margin: theme.spacing.unit,
        minWidth: '100%',
    },
});

class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentGraph: '',
            availableGraphs: [],
        };
        Utils.getAvailableGraphs()
            .then(data => this.setState({ availableGraphs: data }))
            .catch(err => console.log(err)); //for now just console.log
    };

    handleGraphChange = event => {
        const graphName = event.target.value;
        var graphId;
        this.state.availableGraphs.forEach(graph => {
            if (graph.name === graphName) { graphId = graph.id; }
        });
        this.setState({ currentGraph: graphName });
        Utils.getGraphData(graphId)
            .then(this.updateData)
            .catch(err => console.log(err)); //for now just console.log
    };

    handleChange = event => { this.setState({ [event.target.name]: event.target.value }) };

    updateData = graphData => { this.props.onChangeData(graphData) };

    render() {
        const {
            children,
            classes,
            theme,
        } = this.props;

        return (
            <Fragment>
                <Divider />
                <ListItem >
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="graph-id">Choose your graph</InputLabel>
                        <Select
                            value={this.state.currentGraph}
                            onChange={this.handleGraphChange}
                            inputProps={{ name: 'currentGraph', id: 'graph-id' }}
                        >
                            {this.state.availableGraphs.map(graph => {
                                return <MenuItem key={graph.id} value={graph.name}>{graph.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </ListItem >
            </Fragment>
        );
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

export default withStyles(styles, { withTheme: true })(Filters);