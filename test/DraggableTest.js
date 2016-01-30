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
            right: offset.left + playground.clientWidth,
            bottom: offset.top + playground.clientHeight
        };

        this.setState({ range });
    },

    render() {
        const {range} = this.state;

        return (
            <div className="draggable-test">
                <h1>Draggable</h1>
                <div 
                    className="draggable-playground"
                    ref="playground"
                >
                    <Draggable
                        className="free-style"
                        {...range}
                    >
                        I'm a free style
                    </Draggable>
                </div>
            </div>
        );
    }
});

export default DraggableTest;
