import React from 'react';
import Scrollable from '../src/Scrollable';

const ScrollableTest = React.createClass({
    render() {
        return (
            <div className="scrollable-test">
                <div className="scroll-container">
                    <Scrollable
                        className="scroll-panel"
                        panelSize={200}
                    >
                        <div 
                            className="scroll-content"
                            style={{
                                height: 300
                            }}
                        >
                            I'm a scrollable content.
                        </div>
                    </Scrollable>
                </div>
            </div>
        )
    }
});

export default ScrollableTest;