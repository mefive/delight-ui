import React, {PropTypes} from 'react';
import classNames from 'classnames';

import Draggable from './Draggable';
import {getOffset} from './util';

function isVeritical(orientation) {
    return orientation === 'vertical';
}

const Scrollable = React.createClass({
    getDefaultProps() {
        return {
            orientation: 'vertical'
        };
    },

    getInitialState() {
        return {
            showBar: false,
            panelOffset: 0,
            panelSize: 0,
            thumbSize: 0,
            thumbOffset: 0,
            ratio: 1
        };
    },

    componentDidMount() {
        this.syncThumbSize();

        this.onResize();

        window.addEventListener(
            'resize',
            this.onResize
        );
    },

    onResize() {
        const {panel} = this.refs;
        const size
        = isVeritical(this.props.orientation)
        ? panel.clientHeight
        : panel.clientWidth;

        this.setState({
            panelSize: size,
            panelOffset: getOffset(panel)
        });
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    },

    componentDidUpdate(prevProps, prevState) {
        const {scrollSize} = this.props;
        const {panelSize} = this.state;

        if (scrollSize !== prevProps.scrollSize
            || panelSize !== prevState.panelSize
        ) {
            this.syncThumbSize();
        }
    },

    syncThumbSize() {
        const {panel} = this.refs;
        const {clientHeight, scrollHeight, clientWidth, scrollWidth} = panel;
        const {orientation} = this.props;

        const ratio 
        = isVeritical(orientation)
        ? clientHeight / scrollHeight
        : clientWidth / scrollWidth;

        const size
        = isVeritical(orientation)
        ? clientHeight : clientWidth;

        const thumbSize = Math.round(size * ratio);

        const state = {};

        if (thumbSize === thumbSize
            && ratio !== 1
        ) {
            state.thumbSize = thumbSize;
            state.showBar = true;
        }
        else {
            state.showBar = false;
        }

        state.ratio = ratio;
        state.panelSize 
        = isVeritical(orientation)
        ? clientHeight : clientWidth

        this.setState(state);
    },

    onWheel(e) {
        const {panel} = this.refs;
        const {scrollTop, scrollLeft} = panel;
        const {ratio} = this.state;
        const {deltaY, deltaX} = e;
        const {orientation} = this.props;

        e.preventDefault();

        const offset
        = isVeritical(orientation)
        ? scrollTop + deltaY
        : scrollLeft + deltaX;

        this.scrollPanel(offset);

        const realOffset
        = isVeritical(orientation)
        ? panel.scrollTop
        : panel.scrollLeft;
        
        this.setState({
            thumbOffset: (realOffset * ratio)
        });
    },

    scrollPanel(offset) {
        const {panel} = this.refs;

        if (isVeritical(this.props.orientation)) {
            panel.scrollTop = offset;
        }
        else {
            panel.scrollLeft = offset;
        }
    },

    syncScroll(offsetObject) {
        const {ratio} = this.state;
        let offset;

        if (isVeritical(this.props.orientation)) {
            offset = offsetObject.top / ratio;
        }
        else {
            offset = offsetObject.left / ratio;
        }

        this.scrollPanel(offset);
    },

    render() {
        const {className, children, orientation} = this.props;
        let {panelSize} = this.state;
        const {showBar, thumbSize, thumbOffset, panelOffset} = this.state;

        const panelStyle
        = isVeritical(orientation)
        ? { height: panelSize || '100%' } : { width: panelSize || '100%' };

        const thumbStyle
        = isVeritical(orientation)
        ? { height: thumbSize, top: thumbOffset }
        : { width: thumbSize, left: thumbOffset };

        return (
            <div 
                className={className}
                style={panelStyle}
                ref="panel"
                onWheel={this.onWheel}
            >
                {children}
                <div 
                    className="scroll-track"
                    style={{
                        display: (showBar
                            ? 'block'
                            : 'none'
                        )
                    }}
                    ref="track"
                >

                    <Draggable
                        range={
                            isVeritical(orientation)
                            ? {
                                top: panelOffset.top,
                                height: panelSize
                            }
                            : {
                                left: panelOffset.left,
                                width: panelSize
                            }
                        }
                        style={thumbStyle}
                        onDrag={this.syncScroll}
                    >
                        <div className="scroll-thumb">
                        </div>
                    </Draggable>
                </div>
            </div>
        )
    }
});

Scrollable.propTypes = {
    scrollSize: PropTypes.number,
    className: PropTypes.string,
    orientation: PropTypes.string // horizontal vertical
};

export default Scrollable;
