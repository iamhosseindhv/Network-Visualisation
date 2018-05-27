import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';

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
    //...
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
        const name = event.target.name;
        switch (position) {
            case constants.GRAPH:
                var graph = { ...this.state.graph }
                graph[name] = event.target.checked;
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
    
    /*
    // TODO: modify the function below and replace
    // code in handleChang to avoide code duplication
    updateState = (source, name, event) => {
        var dest = { ...this.state[source] }
        // console.log(dest);
        dest[name] = event.target.checked;
        // console.log(dest);
        console.log(this.state);
        this.setState({ source: dest }, () => {
            console.log(this.state);
            this.formDidChange()
        });
    }*/
    /*
    // or see if you can choose this one
    handleChange = event => { this.setState({ [event.target.name]: event.target.value }) };
    */

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <ListItem>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Configurations" />
                </ListItem>
                <Divider />
                <ListItem >
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
                            label="Render Labels"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked={defaultSetting.staticGraph}
                                    checked={this.state.graph.staticGraph}
                                    onChange={this.handleChange(constants.GRAPH)}
                                    value="staticGraph"
                                    name="staticGraph"
                                    color="primary"
                                />
                            }
                            label="Static Graph"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked={defaultSetting.isDarkTheme}
                                    checked={this.state.isDarkTheme}
                                    onChange={this.handleThemeChange}
                                    value="themeDark"
                                    color="primary"
                                />
                            }
                            label="Dark Theme"
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