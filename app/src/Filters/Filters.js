import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: 232,
    },
    formControlMoveRight: {
        transform: 'translate3d(' + theme.spacing.unit * 6 + 'px, 0, 0)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
        }),
    },
    formControlMoveLeft: {
        transform: 'translate3d(0, 0, 0)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
        }),
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

    handleGraphChange = () => {
        const selectedGraph = this.state.availableGraphs.find(graph => graph.name === this.state.currentGraph);
        //modify this
        const query = {
            id: selectedGraph.id,
            ...this.state,
        };
        Utils.getGraphData(selectedGraph.id, query)
            .then(graphData => this.props.onChangeData(graphData))
            .catch(this.handleError);
    };

    handleError = (err) => {
        // here you may present a snackBar to tell the user something has gone wrong,
        // but for now just console.log
        console.log(err);
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value }, () => {
            this.handleGraphChange();
        })
    };

    componentDidMount = () => {
        Utils.getAvailableGraphs()
            .then(data => this.setState({ availableGraphs: data }))
            .catch(this.handleError);
    };

    render() {
        const { classes, open } = this.props;
        const formControlClassName = classNames(classes.formControl, open ? classes.formControlMoveLeft : classes.formControlMoveRight);
        return (
            <Fragment>
                <Subheader id="graph-search" title="Search" icon={<SearchIcon />} />
                <ListItem>
                    <form className={classes.root}>
                        <FormControl className={formControlClassName}>
                            <InputLabel htmlFor="graph-id">Choose your graph</InputLabel>
                            <Select
                                value={this.state.currentGraph}
                                onChange={this.handleChange}
                                inputProps={{ name: "currentGraph", id: "graph-id" }}
                            >
                                {this.state.availableGraphs.map(graph => {
                                    return <MenuItem key={graph.id} value={graph.name}>{graph.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    
                    </form>
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
     * Whether the left drawer is open or not.
     * Needed for transition of input elements
     */
    open: PropTypes.bool.isRequired,
    /**
     * @param {object} event The event source of the callback
     */
    onChangeData: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Filters);