import React from 'react';
import Trigger from '../src/Trigger';

const TriggerTest = React.createClass({
    render() {
        const popup = (
            <div className="popup">
                Zan <br />! Zan zan zan 
            </div>
        );

        return (
            <div className="trigger-test">
                <Trigger 
                    className="trigger"
                    actions="click"
                    popup={popup}
                    activeClass="active"
                    delay={100}
                >
                    Click
                </Trigger>

                <Trigger 
                    className="trigger"
                    actions="hover"
                    popup={popup}
                    activeClass="active"
                    delay={100}
                >
                    Hover
                </Trigger>

                <Trigger 
                    className="trigger"
                    actions="click,hover"
                    popup={popup}
                    activeClass="active"
                    delay={100}
                >
                    Click Hover
                </Trigger>
            </div>
        )
    }
});

export default TriggerTest;
