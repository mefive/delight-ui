import React, {PropTypes} from 'react';
import ReactDOM, {
    unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
    unmountComponentAtNode,
    findDOMNode
} from 'react-dom';

const Trigger = React.createClass({
    getDefaultProps() {
        return {
            popupMountInside: true,
            activeClass: 'active',
            enterClass: 'enter',
            leaveClass: 'leave',
            enterDuration: 200,
            leaveDuration: 200,
            actions: '',
            onShow: () => {},
            onHide: () => {}
        };
    },

    getInitialState() {
        return {
            aboutToLeave: false,
            visible: false
        };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible != null) {
            this.setState({
                visible: nextProps.visible
            });
        }
    },

    componentWillUpdate(nextProps, nextState) {
        if (this.state.visible === nextState.visible) {
            return;
        }

        if (!this.state.visible && nextState.visible) {
            this.isEntering = true;
        }
        else {
            this.isLeaving = true;
        }
    },

    componentDidMount() {
        this.componentDidUpdate();
    },

    componentWillUnmount() {
        const {popupMountInside, getPopupContainer} = this.props;
        const popupContainer = this.popupContainer;

        if (!popupMountInside) {
            unmountComponentAtNode(popupContainer);
            if (!getPopupContainer) {
                document.body.removeChild(popupContainer);
            }
            else {
                // [TODO] unmount hanlder
            }
        }
    },

    componentDidUpdate(prevProps, prevState) {
        const {activeClass, enterClass, leaveClass, enterDuration, leaveDuration} = this.props;
        let {popup, getPopupContainer} = this.props;
        const {isEntering, isLeaving} = this;
        const {visible} = this.state;

        if (!getPopupContainer) {
            getPopupContainer = this.getPopupContainer;
        }

        let popupProps = {};

        // render popup
        if (this.popupRendered) {
            let className = popup.props.className;

            if (visible || isLeaving) {
                className = `${className} ${activeClass}`;
            }

            if (isEntering) {
                className = `${className} ${enterClass}`;
            }

            if (isLeaving) {
                className = `${className} ${leaveClass}`;
            }

            popupProps
            = {
                className,
                visible
            };

            popup = React.cloneElement(popup, popupProps);

            renderSubtreeIntoContainer(
                this,
                popup,
                getPopupContainer()
            );

            if (isEntering) {
                setTimeout(
                    () => {
                        this.isEntering = false;
                        this.forceUpdate();
                    },
                    enterDuration
                );
            }
            else if (isLeaving) {
                setTimeout(
                    () => {
                        this.isLeaving = false;
                        this.forceUpdate();
                    },
                    leaveDuration
                );
            }
        } 
    },

    getPopupContainer() {
        const {popupMountInside} = this.props;
        let {popupContainer} = this;

        if (popupContainer) {
            return popupContainer;
        }

        popupContainer
        = this.popupContainer 
        = document.createElement('div');

        if (popupMountInside) {
            findDOMNode(this).appendChild(popupContainer);
        }
        else {
            document.body.appendChild(popupContainer);
        }

        return popupContainer;
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

    onFocus() {
        this.show();
    },

    onBlur() {
        this.hide();
    },

    show() {
        if (this.isEntering || this.isLeaving) {
            return;
        }

        this.setState({
            visible: true
        });
        this.props.onShow();
    },

    hide() {
        if (this.isEntering || this.isLeaving) {
            return;
        }

        this.setState({
            visible: false,
            aboutToLeave: false
        });
        this.props.onHide();
    },

    render() {
        const {children, actions, popupMountInside, activeClass} = this.props;
        const {visible} = this.state;

        this.popupRendered = this.popupRendered || visible;

        let triggerProps = {};

        if (actions.indexOf('click') !== -1) {
            triggerProps.onClick = this.onClick;
        }

        if (actions.indexOf('hover') !== -1) {
            triggerProps.onMouseEnter = this.onMouseEnter;
            triggerProps.onMouseLeave = this.onMouseLeave;
        }

        if (actions.indexOf('focus') !== -1) {
            triggerProps.onFocus = this.onFocus;
            triggerProps.onBlur = this.onBlur;
        }

        if (visible) {
            triggerProps.className
            = `${children.props.className} ${activeClass}`;
        }

        return React.cloneElement(children, triggerProps);
    }
});

Trigger.propTypes = {
    actions: PropTypes.string,
    activeClass: PropTypes.string,
    popup: PropTypes.element,
    popupMountInside: PropTypes.bool,
    getPopupContainer: PropTypes.func,
    visible: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func
};

export default Trigger;
