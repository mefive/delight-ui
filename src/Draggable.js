import React, {PropTypes} from 'react';
import {getOffset} from './util';

const Draggable = React.createClass({
    getDefaultProps() {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
    },

    getInitialState() {
        const {left, top} = this.props;

        return {
            elementTop: top === null ? 0 : top,
            elementLeft: left == null ? 0 : left
        };
    },

    startDragging(e) {
        const {range} = this.props;
        const {left, top, width, height} = range;
        const {element} = this.refs;
        const {clientY, clientX} = e;
        const elementOffset = getOffset(element);
        const {offsetHeight, offsetWidth} = element;

        const mouseOffset = {
            top: clientY - elementOffset.top,
            left: clientX - elementOffset.left
        };

        document.onselectstart = () => false;

        const onMove = (e) => {
            const {clientY, clientX} = e;

            let offset 
            = {
                top: clientY - top - mouseOffset.top,
                left: clientX - left - mouseOffset.left
            };

            offset = {
                top: Math.max(0, offset.top),
                left: Math.max(0, offset.left)
            };

            offset = {
                top: Math.min(height - offsetHeight, offset.top),
                left: Math.min(width - offsetWidth, offset.left)
            };

            this.setState({
                elementTop: offset.top,
                elementLeft: offset.left
            });
        };

        const endMove = (e) => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', endMove);
            document.onselectstart = null;
        }

        document
            .addEventListener('mousemove', onMove);

        document
            .addEventListener('mouseup', endMove);
    },

    render() {
        const {className, children, style} = this.props;
        const {elementTop, elementLeft} = this.state;

        const newStyle = {
            ...style,
            left: elementLeft,
            top: elementTop
        };

        return (
            <div 
                className={className}
                onMouseDown={this.startDragging}
                ref="element"
                style={newStyle}
            >
                {children}
            </div>
        );
    }
});

Draggable.propTypes = {
    range: PropTypes.object,
    left: PropTypes.number,
    top: PropTypes.number
};

export default Draggable;
