/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props) {

    return (
        <Autocomplete
            multiple
            name={props.name}
            disableCloseOnSelect
            options={props.options}
            groupBy={props.groupBy}
            getOptionLabel={props.getOptionLabel}
            value={props.value}
            onChange={
                (event, newValue) => {
                    //setValue(newValue);
                    props.onChange(props.name, newValue)
                }
            }
            getOptionSelected={props.getOptionSelected}

            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option[props.itemValue]}
                </React.Fragment>
            )}
            style={{ width: props.width }}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label={props.label} placeholder={props.placeholder} />
            )}
        />
    );
}
