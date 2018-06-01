import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Subheader from '../Subheader/Subheader';
import Utils from '../utils/communications';


const styles = theme => ({
    formControl: {
        // margin: theme.spacing.unit,
        minWidth: '100% !important',
    },
});

class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentGraph: '',
            availableGraphs: [],
        };
    };

    handleGraphChange = event => {
        const currentGraph = event.target.value;
        const selectedGraph = this.state.availableGraphs.find(graph => graph.name === currentGraph);
        this.setState({ currentGraph });
        Utils.getGraphData(selectedGraph.id)
            .then(this.updateData)
            .catch(this.handleError);
    };

    handleError = (err) => {
        // here you may present a snackBar to tell the user something has gone wrong,
        // but for now just console.log
        console.log(err);
    };

    handleChange = event => { this.setState({ [event.target.name]: event.target.value }) };

    updateData = graphData => { this.props.onChangeData(graphData) };

    componentDidMount = () => {
        Utils.getAvailableGraphs()
            .then(data => this.setState({ availableGraphs: data }))
            .catch(this.handleError);
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Subheader id="graph-search" title="Search" icon={<SearchIcon />}/>
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
    onChangeData: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Filters);