import React, {PropTypes} from 'react';
import {getOffset} from './util';

const Draggable = React.createClass({
    getInitialState() {
        return {
            elementTop: 0,
            elementLeft: 0
        };
    },

    componentWillReceiveProps(nextProps) {
        const {style} = nextProps;

        if (style) {
            const {top, height, left, width} = style;
            const {state} = this;

            if (top != null) {
                state.elementTop = top;
            }
            else {
                state.elementLeft = left;
            }
        }
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
            const {onDrag} = this.props;

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

            onDrag && onDrag(offset);
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
        const {className, children} = this.props;
        const {style} = this.props;
        const {elementTop, elementLeft} = this.state;
        const newStyle = {...style};
console.log('style', style)
        if (!isNaN(elementLeft)) {
            newStyle.left = elementLeft;
        }

        if (!isNaN(elementTop)) {
            newStyle.top = elementTop;
        }
console.log('newStyle', newStyle)
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
    range: PropTypes.object
};

export default Draggable;
