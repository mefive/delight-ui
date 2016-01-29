import React from 'react';
import Trigger from '../src/Trigger';

const TriggerTest = React.createClass({
    render() {
        const popup = (
            <div className="popup">
                Zan !
            </div>
        );

        return (
            <div className="trigger-test">
                <Trigger 
                    className="trigger"
                    actions="click"
                    popup={popup}
                    activeClass="active"
                >
                    Trigger
                </Trigger>
            </div>
        )
    }
});

export default TriggerTest;
