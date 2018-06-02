import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Subheader from '../Subheader/Subheader';
import Utils from '../utils/communications';
import styles from './Filters.styles';

const genderDatasource = ['Male', 'Female'].map((gender, i) => {
    return <MenuItem key={i} value={gender.toLowerCase()}>{gender}</MenuItem>
});

const ageDatasource = ['20-25', '25-30', '30-40', '40-50', '50-60', '60-100'].map((age, i) => {
    return <MenuItem key={i} value={age}>{age}</MenuItem>
});

function InputFilter(props) {
    const {
        title,
        name,
        value,
        onChange,
        datasource,
    } = props;
    const fullWidth = props.fullWidth || false;
    const disabled = props.disabled || false;
    const className = classNames(props.className, props.secondaryClassName);
    return (
        <FormControl fullWidth={fullWidth} className={className} disabled={disabled}>
            <InputLabel htmlFor={name}>{title}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                inputProps={{ name: name, id: name }}
            >
                {datasource}
            </Select>
        </FormControl>
    )
};

class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            availableGraphs: [],
            currentGraph: '',
            disableFilters: true,
            graphData: {
                gender: '',
                location: '',
                age_range: '',
                occupation: [],
            },
        };
    };

    updateGraphData = () => {
        const selectedGraph = this.state.availableGraphs.find(graph => graph.name === this.state.currentGraph);
        const query = {
            graph_id: selectedGraph.id,
            ...this.state.graphData,
        };
        Utils.getGraphData(query)
            .then(graphData => this.props.onChangeData(graphData))
            .catch(this.handleError);
    };

    handleError = (err) => {
        // here you may present a snackBar to tell the user something has gone wrong,
        // but for now just console.log
        console.log(err);
    };

    handleChange = event => {
        const isGraphChange = event.target.name === 'currentGraph';
        var newState = Object.assign({}, this.state);
        if (isGraphChange) {
            newState.currentGraph = event.target.value;
            newState.disableFilters = false;
        } else {
            newState.graphData[event.target.name] = event.target.value;
        }
        this.setState(newState, () => {
            this.updateGraphData();
        });
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
                        <InputFilter
                            title="Choose your graph"
                            name="currentGraph"
                            value={this.state.currentGraph}
                            onChange={this.handleChange}
                            fullWidth={true}
                            className={formControlClassName}
                            datasource={this.state.availableGraphs.map(graph => {
                                return <MenuItem key={graph.id} value={graph.name}>{graph.name}</MenuItem>
                            })}
                        />
                        <FormGroup row>
                            <InputFilter
                                title="Gender"
                                name="gender"
                                value={this.state.graphData.gender}
                                onChange={this.handleChange}
                                className={formControlClassName}
                                secondaryClassName={classes.formControlLeft}
                                disabled={this.state.disableFilters}
                                datasource={genderDatasource}
                            />
                            <InputFilter
                                title="Age"
                                name="age_range"
                                value={this.state.graphData.age_range}
                                onChange={this.handleChange}
                                className={formControlClassName}
                                secondaryClassName={classes.formControlRight}
                                disabled={this.state.disableFilters}
                                datasource={ageDatasource}
                            />
                        </FormGroup>
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