import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Subheader from '../Subheader/Subheader';

const defaultSetting = {
    renderLabel: true,
    staticGraph: false,
    isDarkTheme: false,
};

const constants = {
    GRAPH: 0,
    NODE: 1,
    LINK: 2,
};

const styles = theme => ({
    iconGroup: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        fontSize: '50px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        border: '1px solid ' + theme.palette.divider,
    },
});

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            graph: {
                staticGraph: defaultSetting.staticGraph,
            },
            node: {
                renderLabel: defaultSetting.renderLabel,
            },
            link: {},
            isDarkTheme: defaultSetting.isDarkTheme,
        }
    }

    componentDidMount = () => { this.formDidChange() };

    formDidChange = () => { this.props.onChange(this.state) };

    handleChange = position => event => {
        const name = event.currentTarget.name;
        switch (position) {
            case constants.GRAPH:
                var graph = { ...this.state.graph }
                graph[name] = !graph[name];
                this.setState({ graph }, () => this.formDidChange());
                break;
            case constants.NODE:
                var node = { ...this.state.node }
                node[name] = event.target.checked;
                this.setState({ node }, () => this.formDidChange());
                break;
            case constants.LINK:
                var link = { ...this.state.link }
                link[name] = event.target.checked;
                this.setState({ link }, () => this.formDidChange());
                break;
            default:
                break;
        }
    }

    handleThemeChange = () => {
        this.setState({ isDarkTheme: !this.state.isDarkTheme }, () => this.formDidChange());
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Subheader id="graph-setting" title="Graph setting" icon={<SettingsIcon />} />
                <ListItem>
                    <div className={classes.iconGroup}>
                        <Tooltip id="tooltip-reset" title="Reset">
                            <IconButton className={classes.icon} onClick={this.handleDrawerToggle}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip id="tooltip-static" title={this.state.graph.staticGraph ? 'Dynamic' : 'Static'}>
                            <IconButton className={classes.icon} name="staticGraph" onClick={this.handleChange(constants.GRAPH)}>
                                {this.state.graph.staticGraph ? <PlayArrowIcon /> : <PauseIcon />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip id="tooltip-dark" title={this.state.isDarkTheme ? 'Light Mode' : 'Dark Mode'}>
                            <IconButton className={classes.icon} onClick={this.handleThemeChange}>
                                {this.state.isDarkTheme ? <Brightness5Icon /> : <Brightness2Icon />}
                            </IconButton>
                        </Tooltip>
                    </div>
                </ListItem>
                <ListItem>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked={defaultSetting.renderLabel}
                                    checked={this.state.node.renderLabel}
                                    onChange={this.handleChange(constants.NODE)}
                                    value="renderLabel"
                                    name="renderLabel"
                                    color="primary"
                                />
                            }
                            label="Node Labels"
                        />
                    </FormGroup>
                </ListItem>
            </Fragment>
        );
    }
}

Form.propTypes = {
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
    onChange: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Form);