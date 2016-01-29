import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.styl';

import ScrollableTest from './ScrollableTest';

const Demo = React.createClass({
    render() {
        return (
            <div className="container">
                <ScrollableTest />
            </div>
        );
    }
});

ReactDOM.render(<Demo />, document.getElementById('main'));