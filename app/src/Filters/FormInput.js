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
            multiple,
            input,
            renderValue,
            MenuProps,
            className,
            secondaryClassName,
            datasource,
        } = this.props;
        const compoundClassName = classNames(className, secondaryClassName);
        return (
            <FormControl fullWidth={fullWidth} className={compoundClassName} disabled={disabled}>
                <InputLabel htmlFor={name}>{title}</InputLabel>
                <Select
                    multiple={multiple}
                    value={value}
                    input={input}
                    renderValue={renderValue}
                    onChange={onChange}
                    inputProps={{ name: name, id: name }}
                    MenuProps={MenuProps}
                >
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
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    /**
     * function to hanlde input change
     */
    onChange: PropTypes.func.isRequired,
    /**
     * data to be shown as options
     */
    datasource: PropTypes.array.isRequired,
    /**
     * styles
     */
    className: PropTypes.string,
    /**
     * secondary styles (if any)
     */
    secondaryClassName: PropTypes.string,
    /**
     * An Input element; does not have to be a material-ui specific Input.
     */
    input: PropTypes.object,
    /**
     * Properties applied to the Menu element.
     */
    MenuProps: PropTypes.object,
    /**
     * Render the selected value.
     */
    renderValue: PropTypes.func,
    /**
     * input is disables (default to false)
     */
    disabled: PropTypes.bool,
    /**
     * can choose multiple options
     */
    multiple: PropTypes.bool,
    /**
     * input gets the width of its container (defaulted to false)
     */
    fullWidth: PropTypes.bool,
};


export default FormInput;