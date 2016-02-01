import React from 'react';
import Tooltip from '../src/Tooltip';

const TooltipTest = React.createClass({
    render() {
        return (
            <div className="tooltip-test">
                <h1>Tooltip</h1>
                <Tooltip title="I'm a tip on Top">
                    <div className="tooltip-trigger">
                        Top
                    </div>
                </Tooltip>

                <Tooltip title="I'm a tip on Bottom" placement="bottom" popupClassName="tooltip-popup bottom">
                    <div className="tooltip-trigger">
                        Bottom
                    </div>
                </Tooltip>

                <Tooltip title="I'm a tip on Top Left" placement="topLeft">
                    <div className="tooltip-trigger">
                        Top Left
                    </div>
                </Tooltip>

                <Tooltip title="I'm a tip on Top Right" placement="topRight">
                    <div className="tooltip-trigger">
                        Top Right
                    </div>
                </Tooltip>

                <Tooltip title="I'm a tip on Bottom Left" placement="bottomLeft" popupClassName="tooltip-popup bottom">
                    <div className="tooltip-trigger">
                        Bottom Left
                    </div>
                </Tooltip>

                <Tooltip title="I'm a tip on Bottom Right" placement="bottomRight" popupClassName="tooltip-popup bottom">
                    <div className="tooltip-trigger">
                        Bottom Right
                    </div>
                </Tooltip>
            </div>
        );
    }
});

export default TooltipTest;
