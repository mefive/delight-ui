import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import Trigger from './Trigger';
import {getOffset} from './util';

const Popup = React.createClass({
    getInitialState() {
        return {
            style: {
                left: 0,
                top: 0
            }
        };
    },

    componentDidMount() {
        const style = this.getStyle(this.props);
        this.setState({style});
    },

    getStyle(props) {
        const {triggerOffset, triggerDimension, placement} = props;

        const element = findDOMNode(this);

        const height = element.offsetHeight;
        const width = element.offsetWidth;

        const style = {};

        const center = triggerOffset.left + triggerDimension.width / 2 - width / 2;
        const top = triggerOffset.top - height;
        const bottom = triggerOffset.top + triggerDimension.height;
        const left = triggerOffset.left;
        const right = triggerOffset.left - (width - triggerDimension.width);

        switch (placement) {
            case 'top':
                style.top = top;
                style.left = center;
                break;

            case 'bottom':
                style.top = bottom;
                style.left = center;
                break;

            case 'topLeft':
                style.top = top;
                style.left = left;
                break;

            case 'topRight':
                style.top = top;
                style.left = right;
                break;

            case 'bottomLeft':
                style.top = bottom;
                style.left = left;
                break;

            case 'bottomRight':
                style.top = bottom;
                style.left = right;
                break;
        }

        return style;
    },

    componentDidUpdate(prevProps, prevState) {
        if (prevState.style === this.state.style) {
            const style = this.getStyle(this.props);

            this.setState({ style });
        }
    },

    render() {
        const {className, children} = this.props;
        const {style} = this.state;

        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }
});

Popup.propTypes = {
    className: PropTypes.string,
    triggerOffset: PropTypes.object,
    triggerDimension: PropTypes.object,
    placement: PropTypes.string
};

const Tooltip =  React.createClass({
    getDefaultProps() {
        return {
            className: 'tooltip',
            activeClass: 'active',
            popupClassName: 'tooltip-popup',
            placement: 'top',
            delay: 0,
            holdOn: false
        };
    },

    getInitialState() {
        return {
            offset: {
                left: 0,
                top: 0
            },
            dimension: {
                width: 0,
                height: 0
            }
        };
    },

    componentDidMount() {
        this.sync();
    },

    getOffset() {
        const element = findDOMNode(this)
        return getOffset(element);
    },

    getDimension() {
        const element = findDOMNode(this)
        return {
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    },

    componentWillReceiveProps(nextProps) {
        this.sync();
    },

    sync() {
        const offset = this.getOffset();
        const dimension = this.getDimension();

        this.setState({offset, dimension});
    },

    render() {
        const {className, activeClass, children, popupClassName, title, placement, delay, holdOn} = this.props;
        const {offset, dimension} = this.state;

        const popup = (
            <Popup 
                className={popupClassName}
                triggerOffset={offset}
                triggerDimension={dimension}
                placement={placement}
            >
                {title}
            </Popup>
        );

        return (
            <Trigger
                className={className}
                activeClass={activeClass}
                popup={popup}
                popupMountInside={false}
                delay={delay}
                actions="hover"
                holdOn={holdOn}
            >
                {children}
            </Trigger>
        );
    }
});

Tooltip.propTypes = {
    className: PropTypes.string,
    activeClass: PropTypes.string,
    placement: PropTypes.string, // top bottom topLeft topRight bottomLeft bottomRight
    title: PropTypes.string,
    popupClassName: PropTypes.string,
    delay: PropTypes.number,
    holdOn: PropTypes.bool
};

export default Tooltip;
