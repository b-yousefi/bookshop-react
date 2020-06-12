import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

export default function PasswordField(props) {
    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const classes = useStyles();
    return (
        <FormControl className={clsx(classes.margin, classes.textField)} >
            <InputLabel htmlFor="standard-adornment-password" shrink={true} >Password</InputLabel>
            <Input
                id="password"
                placeholder="password"
                type={values.showPassword ? 'text' : 'password'}
                value={props.value}
                onChange={props.onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {values.showPassword ? <FontAwesomeIcon icon="eye" /> : <FontAwesomeIcon icon="eye-slash" />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}