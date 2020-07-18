import React from 'react';
import PopperBtn from './popper_button';
import LoginForm from '../containers/form_login';


export default function PopperLoginForm() {
    return (
        <PopperBtn tooltip="Login" btnName="Login" placement='bottom-end' icon="sign-in-alt" open={false}>
            <div>
                <LoginForm/>
            </div>
        </PopperBtn>
    );
}