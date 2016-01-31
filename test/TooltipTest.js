import React from 'react';
import Tooltip from '../src/Tooltip';

const TooltipTest = React.createClass({
    render() {
        return (
            <div className="tooltip-test">
                <h1>Tooltip</h1>
                <Tooltip title="I'm a tip">
                    Normal
                </Tooltip>
            </div>
        );
    }
});

export default TooltipTest;
