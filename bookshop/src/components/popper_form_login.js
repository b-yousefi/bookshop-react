import React, {Component} from 'react';
import PopperBtn from './popper_button';
import LoginForm from '../containers/form_login';


export default class PopperLoginForm extends Component {
    state = {
        popper_open: false
    }
    onClick = () => {
        this.setState({popper_open: false});
    }

    render() {
        //React.forwardRef
        const FancyButton = React.forwardRef((props, ref) => (
            <PopperBtn tooltip="Login" btnName="Login" placement='bottom-end' icon="sign-in-alt"
                       open={this.state.popper_open}>
                {props.children}
            </PopperBtn>
        ));
        const ref = React.createRef();
        return (
            <FancyButton ref={ref}>
                <div>
                    <LoginForm onClick={this.onClick}/>
                </div>
            </FancyButton>
        );
    }
}