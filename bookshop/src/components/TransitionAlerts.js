import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function TransitionAlerts(props) {
    const classes = useStyles();
    const { title, message, severity, open, onClick } = props;

    return (
        <div className={classes.root} >
            <Collapse in={open}>
                <Alert
                    variant="filled"
                    severity={severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={onClick}
                        >
                            <FontAwesomeIcon icon="times" />
                        </IconButton>
                    }
                >
                    <AlertTitle><strong>{title}</strong></AlertTitle>
                    {message}
                </Alert>
            </Collapse>
        </div>
    );
}
