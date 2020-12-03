import React, {useEffect} from 'react';
import {Dialog, DialogTitle,} from '@material-ui/core';
import LoginForm from "../containers/form_login";

export default function SignInAlertDialog(props) {
    const [open, setOpen] = React.useState(props.open);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"You must login first"}</DialogTitle>
                <LoginForm/>
            </Dialog>
        </div>
    );
}