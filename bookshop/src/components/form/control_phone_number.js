import React from 'react';
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css';
import '../../styles/phone_number.css'


export default function PhoneNumberControl(props) {

    const { name, required, value, onChange } = props;

    return (

        <div>
            <ReactPhoneInput
                inputExtraProps={{
                    name: "phone",
                    required: required,
                    autoFocus: true,
                    error: true
                }}
                masks={{ ir: '(...) ...-..-..' }}
                placeholder="+98 (935) 123-45-67"
                country="ir"
                name={name}
                value={value}
                onChange={onChange}
                style={{ marginTop: 20 }}
            />
        </div>
    );
}
