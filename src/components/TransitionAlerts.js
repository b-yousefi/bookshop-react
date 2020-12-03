import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(10),
    },
  },
}));

export default function TransitionAlerts(props) {
  const classes = useStyles();
  const { title, message, severity, open, onClick } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClick();
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
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
          <AlertTitle>
            <strong>{title}</strong>
          </AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
