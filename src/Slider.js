import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import Draggable from './Draggable';
import Tooltip from './Tooltip';
import {getOffset, plus, minus, multiply, divide} from './util';

function isVeritical(orientation) {
    return orientation === 'vertical';
}

const Slider = React.createClass({
    getInitialState() {
        return {
            offset: {
                left: 0,
                top: 0
            },
            range: {
                left: 0,
                width: 0,
                top: 0,
                height: 0
            },
            shift: {
                min: 0,
                max: 0 
            },
            unit: 0,
            holdOn: false
        };
    },

    getDefaultProps() {
        return {
            value: 0,
            max: 100,
            className: 'slider',
            trackClassName: 'slider-track',
            handleClassName: 'slider-handle',
            stepClassName: 'slider-step',
            onChange: () => {},
            onDrop: () => {},
            onClick: () => {},
            orientation: 'horizontal' // horizontal vertical
        };
    },

    componentWillReceiveProps(nextProps) {
        const {value} = nextProps;
        this.state.offset = this.getOffset(value);
    },

    componentDidMount() {
        const {max, value, orientation} = this.props;
        const {step, handle} = this.refs;
        const {state} = this;

        const halfHandleDimension = {
            width: divide(handle.offsetWidth, 2),
            height: divide(handle.offsetHeight, 2)
        };

        const shift = {
            min: isVeritical(orientation)
            ? -(halfHandleDimension.height) : -(halfHandleDimension.width),
            max: isVeritical(orientation) 
            ? halfHandleDimension.height : halfHandleDimension.width
        };

        if (isVeritical(orientation)) {
            const top = getOffset(step).top;
            const height = plus(step.clientHeight, shift.max);
            state.range = { top, height };
        }
        else {
            const left = getOffset(step).left;
            const width = plus(step.clientWidth, shift.max);
            state.range = { left, width };
        }

        if (max > 0) {
            state.unit = this.getUnit(max)
        }

        state.shift = shift;

        this.setState({
            offset: this.getOffset(value)
        });
    },

    componentDidUpdate(prevProps, prevState) {
        const {max, value} = this.props;

        if (prevProps.max !== max) {
            if (max > 0) {
                this.state.unit = this.getUnit(max);

                this.setState({
                    offset: this.getOffset(value)
                });
            }
        }
    },

    getUnit(max) {
        const {orientation} = this.props;
        const {step} = this.refs;

        if (isVeritical(orientation)) {
            return divide(step.clientHeight, max);
        }
        else {
            return divide(step.clientWidth, max);
        }
    },

    getOffset(value) {
        const {orientation, max} = this.props;
        const {unit, shift, range} = this.state;
        const offset 
        = isVeritical(orientation)
        ? plus(multiply(minus(max, value), unit), shift.min)
        : (value * unit) + shift.min;

        if (isVeritical(orientation)) {
            return {
                top: offset
            };
        }

        return {
            left: offset
        };
    },

    getValue(offset) {
        const {orientation, max} = this.props;
        const {unit, shift} = this.state;

        const value = isVeritical(orientation)
        ? Math.round(minus(max, divide(minus(offset.top, shift.min), unit)))
        : Math.round(divide(minus(offset.left, shift.min), unit));

        return value;
    },

    onDrag(offset) {
        const {onChange, orientation, max} = this.props;

        this.setState({
            offset,
            holdOn: true
        });

        onChange(this.getValue(offset));
    },

    onStopDrag() {
        const {onDrop} = this.props;
        const {offset} = this.state;

        this.setState({
            holdOn: false
        });

        onDrop(this.getValue(offset));
    },

    onClick(e) {
        const {orientation, onClick} = this.props;
        const {range, shift} = this.state;

        let {offset} = this.state;
        let {left, top} = offset;

        if (isVeritical(orientation)) {
            top = e.clientY - range.top;
        }
        else {
            left = e.clientX - range.left + shift.min;
        }

        offset = {left, top};

        this.setState({offset});

        onClick(this.getValue(offset));
    },

    render() {
        const {className, trackClassName, handleClassName, stepClassName, orientation} = this.props;
        const {offset, range, shift, holdOn} = this.state;
        const trackStyle
        = isVeritical(orientation)
        ? { height: plus(minus(range.height, offset.top), shift.min) }
        : { width: minus(offset.left, shift.min) };

        const handleStyle
        = isVeritical(orientation)
        ? { top: offset.top }
        : { left: offset.left };

        return (
            <div className={className}>
                <div
                    className={trackClassName}
                    style={trackStyle}
                    onClick={this.onClick}
                ></div>
                <Draggable 
                    style={handleStyle}
                    range={range}
                    onDrag={this.onDrag}
                    onStopDrag={this.onStopDrag}
                    minShiftX={shift.min}
                    minShiftY={shift.min}
                >
                    <div className={handleClassName} ref="handle">
                        <Tooltip 
                            title={this.getValue(offset) + ''}
                            delay={500}
                            holdOn={holdOn}
                        >
                            <div className="tooltip-trigger"></div>
                        </Tooltip>
                    </div>
                </Draggable>
                <div 
                    className={stepClassName}
                    ref="step"
                    onClick={this.onClick}
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
    stepClassName: PropTypes.string,
    onChange: PropTypes.func,
    onDrop: PropTypes.func,
    onClick: PropTypes.func,
    orientation: PropTypes.string // horizontal vertical
}

export default Slider;
