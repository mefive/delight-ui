import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.styl';

import ScrollableTest from './ScrollableTest';
import TriggerTest from './TriggerTest';
import DraggableTest from './DraggableTest';

const Demo = React.createClass({
    render() {
        return (
            <div className="container">
                <ScrollableTest />
                <TriggerTest />
                <DraggableTest />
            </div>
        );
    }
});

ReactDOM.render(<Demo />, document.getElementById('main'));