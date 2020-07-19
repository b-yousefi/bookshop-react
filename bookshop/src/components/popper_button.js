import React, {Component} from 'react';
import {Badge, Button, ClickAwayListener, IconButton, Paper, Popper, Tooltip} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SvgIcon from "@material-ui/core/SvgIcon";

class PopperBtn extends Component {
    state = {
        open: this.props.open
    }

    constructor(props) {
        super(props);
        this.anchorRef = React.createRef();
    }

    handleClose = (event) => {
        if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
            return;
        }

        this.setState({open: false});
    };

    handleToggle = (event) => {
        this.anchorRef.current = event.currentTarget;
        this.setState({open: !this.state.open});
        if (this.state.open) {

        }
    };

    render() {
        return (
            <React.Fragment>
                <Tooltip title={this.props.tooltip ? this.props.tooltip : ""}>
                    {this.props.icon_path ?
                        <IconButton aria-label={this.props.btnName}
                                    id={this.props.btnName}
                                    aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={this.handleToggle}
                        >
                            <Badge badgeContent={this.props.badgeContent} color="secondary">
                                <SvgIcon>
                                    <path
                                        d={this.props.icon_path}/>
                                </SvgIcon>
                            </Badge>
                        </IconButton>
                        :
                        <Button
                            aria-label={this.props.btnName}
                            id={this.props.btnName}
                            aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={this.handleToggle}
                            startIcon={this.props.icon ? <FontAwesomeIcon icon={this.props.icon}/> : ''}
                            size="large"
                        >
                            {this.props.icon ? '' : this.props.btnName}
                        </Button>
                    }
                </Tooltip>
                <Popper open={this.state.open} anchorEl={this.anchorRef.current} placement={this.props.placement}
                        disablePortal>
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