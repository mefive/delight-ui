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

        if (visible) {
            this.hide();
        }
        else {
            this.show();
        }
    },

    onMouseEnter() {
        const {aboutToLeave} = this.state;

        if (aboutToLeave) {
            this.state.aboutToLeave = false;
        }
        else {
            this.show();
        }
    },

    onMouseLeave() {
        const {delay} = this.props;
        const {state} = this;

        if (!delay) {
            this.hide();
        }
        else {
            setTimeout(
                () => {
                    if (state.aboutToLeave) {
                        this.hide();
                    }
                },
                delay
            );

            state.aboutToLeave = true;
        }
    },

    show() {
        this.setState({
            visible: true
        });
    },

    hide() {
        this.setState({
            visible: false,
            aboutToLeave: false
        });
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
