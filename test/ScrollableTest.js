import React from 'react';
import Scrollable from '../src/Scrollable';

const ScrollableTest = React.createClass({
    render() {
        return (
            <div className="scrollable-test">
                <h1>Scrollable</h1>
                <div className="scroll-vertical">
                    <Scrollable
                        className="scroll-panel"
                    >
                        <div 
                            className="scroll-content"
                            style={{
                                height: 300
                            }}
                        >
                            I'm a vertical scrollable content.
                        </div>
                    </Scrollable>
                </div>

                <div className="scroll-horizontal">
                    <Scrollable
                        className="scroll-panel"
                        orientation="horizontal"
                    >
                        <div
                            className="scroll-content"
                            style={{
                                width: 600
                            }}
                        >
                            I'm a horizontal scrollable content.
                        </div>
                    </Scrollable>
                </div>
            </div>
        )
    }
});

export default ScrollableTest;