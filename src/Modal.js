import React, {PropTypes} from 'react';
import ReactDOM, {
    unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
    unmountComponentAtNode,
    findDOMNode
} from 'react-dom';

const PinCenter = React.createClass({
    getInitialState() {
        return {
            marginLeft: 0,
            marginTop: 0  
        };
    },

    componentDidMount() {
        this.componentDidUpdate();
    },

    componentDidUpdate(prevProps, prevState) {
        const element = findDOMNode(this);

        const marginLeft = -(element.offsetWidth / 2);
        const marginTop = -(element.offsetHeight / 2);

        if (!prevState
            || (marginTop !== prevState.marginTop
            || marginLeft !== prevState.marginLeft)
        ) {
            this.setState({
                marginLeft,
                marginTop
            });
        }
    },

    render() {
        const {children} = this.props;
        const {marginLeft, marginTop} = this.state;

        let style = children.props.style;

        style = {
            ...style,
            marginLeft,
            marginTop
        };
        
        return React.cloneElement(this.props.children, { style });
    }
});

const Modal = React.createClass({
    getDefaultProps() {
        return {
            visible: false,
            maskClassName: 'modal-mask',
            getModalContainer: null,
            activeClass: 'active'
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
        const {children, activeClass, maskClassName} = this.props;
        let {getModalContainer} = this.props;

        getModalContainer = getModalContainer || this.getModalContainer;        

        if (this.modalRendered) {
            let className = children.props.className;

            if (visible) {
                className = `${className} ${activeClass}`;
            }

            const modal = React.cloneElement(children, { className });

            renderSubtreeIntoContainer(
                this,
                (
                    <div>
                        <PinCenter>
                            {modal}
                        </PinCenter>
                        {visible ? <div className={maskClassName}></div> : null}
                    </div>
                ),
                getModalContainer()
            );
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
