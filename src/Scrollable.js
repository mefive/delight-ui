import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Scrollable = React.createClass({
    getInitialState() {
        return {
            showBar: false,
            panelHeight: 0,
            thumbHeight: 0,
            thumbTop: 0,
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

        this.setState({
            panelHeight: panel.clientHeight
        });
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    },

    componentDidUpdate(prevProps, prevState) {
        const {scrollHeight} = this.props;
        const {panelHeight} = this.state;

        if (scrollHeight !== prevProps.scrollHeight
            || panelHeight !== prevState.panelHeight
        ) {
            this.syncThumbSize();
        }
    },

    syncThumbSize() {
        const {panel} = this.refs;
        const {clientHeight, scrollHeight} = panel;

        const ratio = clientHeight / scrollHeight;

        const thumbHeight = Math.round(clientHeight * ratio);

        const state = {};

        if (thumbHeight === thumbHeight
            && ratio !== 1
        ) {
            state.thumbHeight = thumbHeight;
            state.showBar = true;
        }
        else {
            state.showBar = false;
        }

        state.ratio = ratio;
        state.panelHeight = clientHeight;

        this.setState(state);
    },

    onWheel(e) {
        const {panel} = this.refs;
        const {scrollTop} = panel;
        const {ratio} = this.state;
        const {deltaY} = e;

        this.scrollPanel(scrollTop + deltaY);

        this.setState({
            thumbTop: (panel.scrollTop * ratio)
        });
    },

    scrollPanel(top) {
        const {panel} = this.refs;

        panel.scrollTop = top;
    },

    startDragThumb(e) {
        const {track, thumb} = this.refs;
        const {ratio} = this.state;

        const bodyScrollTop = document.body.scrollTop;

        const trackOffsetTop = track.getBoundingClientRect().top + bodyScrollTop;
        const thumbOffsetTop = thumb.getBoundingClientRect().top + bodyScrollTop;

        const maxTop = track.clientHeight - thumb.offsetHeight;

        const {clientY} = e;

        const mouseOffset = clientY - thumbOffsetTop;

        document.onselectstart = () => false;

        const onMove = (e) => {
            const {clientY} = e;
            let top = clientY - trackOffsetTop - mouseOffset;

            top = Math.max(0, top);
            top = Math.min(maxTop, top);

            this.setState({thumbTop: top});

            this.scrollPanel(top / ratio);
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
        let {panelHeight} = this.props;
        const {showBar, thumbHeight, thumbTop} = this.state;

        if (panelHeight == null) {
            panelHeight = '100%';
        }

        return (
            <div 
                className={className}
                style={{
                    height: panelHeight
                }}
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
                        style={{
                            height: thumbHeight,
                            top: thumbTop
                        }}
                        onMouseDown={this.startDragThumb}
                    ></i>
                </div>
            </div>
        )
    }
});

Scrollable.propTypes = {
    scrollHeight: PropTypes.number,
    panelHeight: PropTypes.number,
    className: PropTypes.string
};

export default Scrollable;
