import React, { Component } from 'react';
import { Button, Popper, Paper, ClickAwayListener } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PopperBtn extends Component {
    constructor(props) {
        super(props);
        this.anchorRef = React.createRef();
    }

    state = {
        open: this.props.open
    }

    handleClose = (event) => {
        if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    handleToggle = (event) => {
        this.anchorRef.current = event.currentTarget;
        this.setState({ open: !this.state.open });

    };

    render() {
        return (
            <React.Fragment>
                <Button
                    aria-label={this.props.btnName}
                    id={this.props.btnName}
                    aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={this.handleToggle}
                    startIcon={this.props.icon ? <FontAwesomeIcon icon={this.props.icon} /> : ''}
                    size="large"
                >
                    {this.props.icon ? '' : this.props.btnName}
                </Button>
                <Popper open={this.state.open} anchorEl={this.anchorRef.current} placement={this.props.placement} disablePortal>
                    <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            {this.props.children}
                        </ClickAwayListener>
                    </Paper>
                </Popper>
            </React.Fragment>

        );
    }
}

export default PopperBtn;