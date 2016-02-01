import React from 'react';
import Slider from '../src/Slider';

const SliderTest = React.createClass({
    render() {
        return (
            <div className="slider-test">
                <h1>Slider</h1>
                <Slider value={80} />
            </div>
        );
    }
});

export default SliderTest;
