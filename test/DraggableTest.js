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
                        range={range}
                    >
                        <div className="free-style">
                            I'm a free style
                        </div>
                    </Draggable>

                    <Draggable
                        range={{top, height}}
                        style={{ left: 200 }}
                    >
                        <div className="vertical-style">
                            I can vertical
                        </div>
                    </Draggable>

                    <Draggable
                        range={{left, width}}
                        style={{ top: 140 }}
                    >
                        <div className="horizontal-style">
                            I can horizontal
                        </div>
                    </Draggable>
                </div>
            </div>
        );
    }
});

export default DraggableTest;
