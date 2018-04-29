import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Divider from 'material-ui/Divider';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const styles = theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
})

const defaultSetting = {
    renderLabel: true,
    staticGraph: false,
}

const constants = {
    GRAPH: 0,
    NODE: 1,
    LINK: 2,
}


class Form extends Component {
    constructor() {
        super()
        this.state = {
            graph: {
                staticGraph: defaultSetting.staticGraph,
            },
            node: {
                renderLabel: defaultSetting.renderLabel,
            },
            link: {},
        }
    }

    componentWillMount = () => { this.formDidChange() }

    formDidChange = () => { this.props.onChange(this.state); }

    handleChange = (position, name) => event => {
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
        }
    };

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

    render() {
        const {
            classes,
            theme,
            open,
            onToggleOpen,
        } = this.props;

        return (
            <div>
                <div className={classes.toolbar}>
                    <IconButton onClick={onToggleOpen}>
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
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
                                    onChange={this.handleChange(constants.NODE, 'renderLabel')}
                                    value="renderLabel"
                                />
                            }
                            label="Render Labels"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked={defaultSetting.staticGraph}
                                    checked={this.state.graph.staticGraph}
                                    onChange={this.handleChange(constants.GRAPH, 'staticGraph')}
                                    value="staticGraph"
                                />
                            }
                            label="Static Graph"
                        />
                    </FormGroup>
                </ListItem>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Form);