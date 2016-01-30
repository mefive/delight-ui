import React, {PropTypes} from 'react';
import classNames from 'classnames';

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
            panelSize: 0,
            thumbSize: 0,
            thumbOffset: 0,
            ratio: 1
        };
    },

    componentDidMount() {
        this.syncThumbSize();

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
            panelSize: size
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

    startDragThumb(e) {
        const {track, thumb} = this.refs;
        const {ratio} = this.state;
        const {orientation} = this.props;

        const trackOffsetWindow = getOffset(track);
        const thumbOffsetWindow = getOffset(thumb);

        const max 
        = isVeritical(orientation)
        ? track.clientHeight - thumb.offsetHeight
        : track.clientWidth - thumb.offsetWidth;

        const {clientY, clientX} = e;

        const mouseOffset 
        = isVeritical(orientation)
        ? clientY - thumbOffsetWindow.top
        : clientX - thumbOffsetWindow.left;

        document.onselectstart = () => false;

        const onMove = (e) => {
            const {clientY, clientX} = e;
            let offset 
            = isVeritical(orientation)
            ? clientY - trackOffsetWindow.top - mouseOffset
            : clientX - trackOffsetWindow.left - mouseOffset;

            offset = Math.max(0, offset);
            offset = Math.min(max, offset);

            this.setState({thumbOffset: offset});

            this.scrollPanel(offset / ratio);
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
        const {className, children, orientation} = this.props;
        let {panelSize} = this.props;
        const {showBar, thumbSize, thumbOffset} = this.state;

        if (panelSize == null) {
            panelSize = '100%';
        }

        const panelStyle
        = isVeritical(orientation)
        ? { height: panelSize } : { width: panelSize };

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
                    <i
                        className="scroll-thumb"
                        ref="thumb"
                        style={thumbStyle}
                        onMouseDown={this.startDragThumb}
                    ></i>
                </div>
            </div>
        )
    }
});

Scrollable.propTypes = {
    scrollSize: PropTypes.number,
    panelSize: PropTypes.number,
    className: PropTypes.string,
    orientation: PropTypes.string // horizontal vertical
};

export default Scrollable;
