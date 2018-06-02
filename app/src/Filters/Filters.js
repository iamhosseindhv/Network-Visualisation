import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import FormGroup from '@material-ui/core/FormGroup';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Subheader from '../Subheader/Subheader';
import FormInput from './FormInput';
import { MenuProps, styles } from './Filters.styles';
import Utils from '../utils/communications';
import {
    genderDatasource,
    ageDatasource,
    locationDatasource,
    jobDatasource
} from '../utils/filterDatasources';


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

    handleError = err => {
        // here you may present a snackBar to tell the user something went wrong,
        // but for now just console.log
        console.log(err);
    };

    handleChange = event => {
        const isGraphChange = event.target.name === 'currentGraph';
        let newState = Object.assign({}, this.state);
        if (isGraphChange) {
            newState.currentGraph = event.target.value;
            newState.disableFilters = false;
        } else {
            newState.graphData[event.target.name] = event.target.value;
        }
        this.setState(newState, () => this.updateGraphData());
    };

    handleChipDelete = chip => () => {
        let newState = Object.assign({}, this.state);
        const jobs = [...this.state.graphData.occupation];
        const chipToDelete = jobs.indexOf(chip);
        jobs.splice(chipToDelete, 1);
        newState.graphData.occupation = jobs;
        this.setState(newState);
    };

    handleChipRender = classes => chips => {
        return (
            <div className={classes.chips}>
                {chips.map(item =>
                    <Chip
                        key={item}
                        label={item}
                        className={classes.chip}
                        onDelete={this.handleChipDelete(item)}
                    />)}
            </div>
        );
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
                        <FormInput
                            title="📊 Choose your graph"
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
                            <FormInput
                                title="🚻 Gender"
                                name="gender"
                                value={this.state.graphData.gender}
                                onChange={this.handleChange}
                                className={formControlClassName}
                                secondaryClassName={classes.formControlLeft}
                                disabled={this.state.disableFilters}
                                datasource={genderDatasource}
                            />
                            <FormInput
                                title="🔢 Age"
                                name="age_range"
                                value={this.state.graphData.age_range}
                                onChange={this.handleChange}
                                className={formControlClassName}
                                secondaryClassName={classes.formControlRight}
                                disabled={this.state.disableFilters}
                                datasource={ageDatasource}
                            />
                        </FormGroup>
                        <FormInput
                            title="🌍 Location"
                            name="location"
                            value={this.state.graphData.location}
                            onChange={this.handleChange}
                            fullWidth={true}
                            disabled={this.state.disableFilters}
                            className={formControlClassName}
                            datasource={locationDatasource}
                        />
                        <FormInput
                            title="💼 Job"
                            name="occupation"
                            value={this.state.graphData.occupation}
                            onChange={this.handleChange}
                            fullWidth={true}
                            multiple={true}
                            input={<Input id="occupation" />}
                            MenuProps={MenuProps}
                            className={formControlClassName}
                            disabled={this.state.disableFilters}
                            renderValue={this.handleChipRender(classes)}
                            datasource={jobDatasource.map(job => (
                                <MenuItem key={job} value={job}>
                                    <Checkbox color="primary" checked={this.state.graphData.occupation.indexOf(job) > -1} />
                                    <ListItemText primary={job} />
                                </MenuItem>
                            ))}
                        />
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