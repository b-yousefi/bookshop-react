import React, {Component} from 'react';
import PopperBtn from "../components/popper_button";
import ShoppingCart from "../containers/shopping_cart";


export default class PopperShoppingCart extends Component {
    state = {
        popper_open: false
    }
    onClick = () => {
        this.setState({popper_open: false});
    }

    render() {
        //React.forwardRef
        const FancyButton = React.forwardRef((props, ref) => (
            <PopperBtn tooltip="ShoppingCart" btnName="ShoppingCart" placement='bottom-end'
                       badgeContent={this.props.badgeContent}
                       icon_path="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                       open={this.state.popper_open} disable={this.props.badgeContent === 0}>
                {props.children}
            </PopperBtn>
        ));
        const ref = React.createRef();
        return (
            <FancyButton ref={ref}>
                <div>
                    <ShoppingCart show_order_button={true} onClick={this.onClick}/>
                </div>
            </FancyButton>
        );
    }
}
