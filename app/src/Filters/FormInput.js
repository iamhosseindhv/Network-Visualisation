import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


class FormInput extends Component {
    render() {
        const {
            title,
            name,
            value,
            onChange,
            fullWidth,
            disabled,
            className,
            secondaryClassName,
            datasource,
        } = this.props;
        const compoundClassName = classNames(className, secondaryClassName);
        return (
            <FormControl fullWidth={fullWidth} className={compoundClassName} disabled={disabled}>
                <InputLabel htmlFor={name}>{title}</InputLabel>
                <Select value={value} onChange={onChange} inputProps={{ name: name, id: name }}>
                    {datasource}
                </Select>
            </FormControl>
        )
    }
}

FormInput.propTypes = {
    /**
     * title of the input field 
     */
    title: PropTypes.string.isRequired,
    /**
     * name/value of the input field
     */
    name: PropTypes.string.isRequired,
    /**
     * name/value of the input field
     */
    value: PropTypes.string.isRequired,
    /**
     * function to hanlde input change
     */
    onChange: PropTypes.func.isRequired,
    /**
     * styles
     */
    className: PropTypes.string.isRequired,
    /**
     * data to be shown as options
     */
    datasource: PropTypes.array.isRequired,
    /**
     * secondary styles (if any)
     */
    secondaryClassName: PropTypes.string,
    /**
     * input is disables (default to false)
     */
    disabled: PropTypes.bool,
    /**
     * input gets the width of its container (defaulted to false)
     */
    fullWidth: PropTypes.bool,
};

FormInput.defaultProps = {
    secondaryClassName: null,
    disabled: false,
    fullWidth: false,
};

export default FormInput;