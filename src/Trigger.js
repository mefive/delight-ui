import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const Trigger = React.createClass({
    getInitialState() {
        return {
            aboutToLeave: false,
            visible: false  
        };
    },

    onClick() {
        const {visible} = this.state;

        this.setState({
            visible: !visible
        });
    },

    onMouseEnter() {

    },

    onMouseLeave() {

    },

    show() {

    },

    hide() {

    },

    render() {
        const {children, className, actions, activeClass} = this.props;

        let {popup} = this.props;
        let popupProps = {};

        const {visible} = this.state;

        let triggerProps = {};

        if (actions.indexOf('click') !== -1) {
            triggerProps.onClick = this.onClick;
        }

        if (actions.indexOf('hover') !== -1) {
            triggerProps.onMouseEnter = this.onMouseEnter;
            triggerProps.onMouseLeave = this.onMouseLeave;
        }
        
        if (visible) {
            popupProps
            = {
                className: (popup.props.className + ' ' + activeClass)
            };
        }

        popup = React.cloneElement(popup, popupProps);

        return (
            <div 
                className={className}
                {...triggerProps}
            >
                {children}
                {popup}
            </div>
        );
    }
});

export default Trigger;
