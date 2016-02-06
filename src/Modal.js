import React, {PropTypes} from 'react';
import ReactDOM, {
    unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
    unmountComponentAtNode
} from 'react-dom';
import PinCenter from './PinCenter';

const Modal = React.createClass({
    getDefaultProps() {
        return {
            visible: false,
            maskClassName: 'modal-mask',
            getModalContainer: null,
            activeClass: 'active',
            enterClass: 'enter',
            leaveClass: 'leave',
            enterDuration: 200,
            leaveDuration: 200,
        };
    },

    getInitialState() {
        return {
            visible: false  
        };
    },

    componentWillReceiveProps(nextProps) {
        const {visible} = nextProps;

        if (visible != null) {
            this.setState({
                visible
            });
        }
    },

    componentDidMount() {
        this.componentDidUpdate()
    },

    componentDidUpdate(prevProps, prevState) {
        const {visible} = this.state;

        const {
            children,
            activeClass, 
            maskClassName, 
            enterClass, 
            leaveClass, 
            enterDuration, 
            leaveDuration
        } = this.props;

        const {isEntering, isLeaving} = this;

        let {getModalContainer} = this.props;

        getModalContainer = getModalContainer || this.getModalContainer;        

        if (this.modalRendered) {
            let className = children.props.className;

            if (visible || isLeaving) {
                className = `${className} ${activeClass}`;
            }

            if (isEntering) {
                className = `${className} ${enterClass}`;
            }

            if (isLeaving) {
                className = `${className} ${leaveClass}`;
            }

            const modal = React.cloneElement(children, { className });

            renderSubtreeIntoContainer(
                this,
                (
                    <div>
                        <PinCenter>
                            {modal}
                        </PinCenter>
                        {visible || isLeaving ? <div className={maskClassName}></div> : null}
                    </div>
                ),
                getModalContainer()
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

    getModalContainer() {
        let {popupContainer} = this;

        if (popupContainer) {
            return popupContainer;
        }

        popupContainer
        = this.popupContainer 
        = document.createElement('div');

        document.body.appendChild(popupContainer);

        return popupContainer;
    },

    render() {
        const {visible} = this.state;

        this.modalRendered = this.modalRendered || visible;

        return (
            <noscript />
        );
    }
});

Modal.propTypes = {
    visible: PropTypes.bool,
    maskClassName: PropTypes.string,
    getModalContainer: PropTypes.func,
    activeClass: PropTypes.string
};

export default Modal;
