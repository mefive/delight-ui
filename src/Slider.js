import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import Draggable from './Draggable';
import {getOffset, plus, minus, multiply, divide} from './util';

const Slider = React.createClass({
    getInitialState() {
        return {
            offset: {
                left: 0,
                top: 0
            },
            range: {
                left: 0,
                width: 0
            },
            shift: {
                min: 0,
                max: 0 
            },
            unit: 0
        };
    },

    getDefaultProps() {
        return {
            value: 0,
            max: 100,
            className: 'slider',
            trackClassName: 'slider-track',
            handleClassName: 'slider-handle',
            stepClassName: 'slider-step'
        };
    },

    componentWillReceiveProps(nextProps) {
        const {value} = nextProps;

        this.state.offset = this.getOffset(value);
    },

    componentDidMount() {
        const {max, value} = this.props;
        const {step} = this.refs;
        const {state} = this;
        const handle = findDOMNode(this.refs.handle);

        const halfHandleDimension = {
            width: divide(handle.offsetWidth, 2),
            height: divide(handle.offsetHeight, 2)
        };

        const shift = {
            min: -(halfHandleDimension.width),
            max: halfHandleDimension.width
        }

        const left = getOffset(step).left;
        const width = plus(step.clientWidth, shift.max);

        state.unit = divide(step.clientWidth, max);
        state.range = { left, width };
        state.shift = shift;

        this.setState({
            offset: this.getOffset(value)
        });
    },

    getOffset(value) {
        const {unit, shift} = this.state;

        return {
            left: (value * unit) + shift.min
        }
    },

    onDrag(offset) {
        this.setState({offset});

        const {unit, shift} = this.state;
        console.log('value', divide(minus(offset.left, shift.min), unit));
    },

    render() {
        const {className, trackClassName, handleClassName, stepClassName} = this.props;
        const {offset, range, shift} = this.state;

        return (
            <div className={className}>
                <div 
                    className={trackClassName}
                    style={{
                        width: minus(offset.left, shift.min)
                    }}
                ></div>
                <Draggable 
                    className={handleClassName}
                    style={{
                        left: offset.left
                    }}
                    range={range}
                    onDrag={this.onDrag}
                    ref="handle"
                    minShiftX={shift.min}
                >
                </Draggable>
                <div 
                    className={stepClassName}
                    ref="step"
                ></div>
            </div>
        );
    }
});

Slider.propTypes = {
    value: PropTypes.number,
    max: PropTypes.number,
    className: PropTypes.string,
    trackClassName: PropTypes.string,
    handleClassName: PropTypes.string,
    stepClassName: PropTypes.string
}

export default Slider;
