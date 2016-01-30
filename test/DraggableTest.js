import React from 'react';
import Draggable from '../src/Draggable';
import {getOffset} from '../src/util';

const DraggableTest = React.createClass({
    getInitialState() {
        return {
            range: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        };
    },

    componentDidMount() {
        const {playground} = this.refs;
        const offset = getOffset(playground);

        const range = {
            left: offset.left,
            top: offset.top,
            width: playground.clientWidth,
            height: playground.clientHeight
        };

        this.setState({ range });
    },

    render() {
        const {range} = this.state;

        const {left, top, width, height} = range;

        return (
            <div className="draggable-test">
                <h1>Draggable</h1>
                <div 
                    className="draggable-playground"
                    ref="playground"
                >
                    <Draggable
                        className="free-style"
                        range={range}
                    >
                        I'm a free style
                    </Draggable>

                    <Draggable
                        className="vertical-style"
                        range={{top, height}}
                        left={200}
                    >
                        I can vertical
                    </Draggable>

                    <Draggable
                        className="horizontal-style"
                        range={{left, width}}
                        top={140}
                    >
                        I can horizontal
                    </Draggable>
                </div>
            </div>
        );
    }
});

export default DraggableTest;
