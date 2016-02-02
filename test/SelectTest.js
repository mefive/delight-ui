import React from 'react';

import Select from '../src/Select';

const data = [
    { value: '1', title: '一' },
    { value: '2', title: '二' },
    { value: '3', title: '三' },
    { value: '4', title: '四' },
    { value: '5', title: '五' },
    { value: '6', title: '六' },
    { value: '7', title: '七' },
];

const SelectTest = React.createClass({
    render() {
        return (
            <div className="select-test">
                <h1>Select</h1>
                <Select
                    data={data}
                    className="select"
                    defaultTitle="Click to select"
                >
                </Select>
            </div>
        );
    }
});

export default SelectTest;
