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
        return {
            elementTop: 0,
            elementLeft: 0
        };
    },

    startDragging(e) {
        const {top, right, bottom, left} = this.props;
        const {element} = this.refs;
        const {clientY, clientX} = e;
        const elementOffset = getOffset(element);

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
                top: Math.min(top, offset.top),
                left: Math.min(left, offset.left)
            };

            this.setState({
                elementLeft: offset.left,
                elementTop: offset.top
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
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
};

export default Draggable;
