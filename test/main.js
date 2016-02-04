import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.styl';

import ScrollableTest from './ScrollableTest';
import TriggerTest from './TriggerTest';
import DraggableTest from './DraggableTest';
import TooltipTest from './TooltipTest';
import SliderTest from './SliderTest';
import SelectTest from './SelectTest';
import AutoCompleteTest from './AutoCompleteTest';

const Demo = React.createClass({
    render() {
        return (
            <div className="container">
{/*                <ScrollableTest />
                <TriggerTest />
                <DraggableTest />
                <TooltipTest />
                <SliderTest />
                <SelectTest />*/}
                <AutoCompleteTest />
            </div>
        );
    }
});

ReactDOM.render(<Demo />, document.getElementById('main'));