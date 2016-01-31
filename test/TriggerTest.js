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
                <h1>Trigger</h1>
                <Trigger 
                    actions="click"
                    popup={popup}
                    activeClass="active"
                    delay={100}
                >
                    <div className="trigger">
                        Click
                    </div>
                </Trigger>

                <Trigger 
                    actions="hover"
                    popup={popup}
                    activeClass="active"
                    delay={100}
                >
                    <div className="trigger">
                        Hover
                    </div>
                </Trigger>

                <Trigger 
                    actions="click,hover"
                    popup={popup}
                    activeClass="active"
                    delay={100}
                >
                    <div className="trigger">
                        Click Hover
                    </div>
                </Trigger>

                <Trigger 
                    actions="hover"
                    popup={popup}
                    activeClass="active"
                >
                    <div className="trigger">
                        Hover no delay
                    </div>
                </Trigger>
            </div>
        )
    }
});

export default TriggerTest;
