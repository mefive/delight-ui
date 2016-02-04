import React from 'react';
import AutoComplete from '../src/AutoComplete';

const data = [
    { value: '1', title: '一' },
    { value: '2', title: '二' },
    { value: '3', title: '三' },
    { value: '4', title: '四' },
    { value: '5', title: '五' },
    { value: '6', title: '六' },
    { value: '7', title: '七' },
];

const AutoCompleteTest = React.createClass({
    render() {
        return(
            <div className="auto-complete-test">
                <h1>AutoComplete</h1>
                <div className="auto-complete-container">
                    <label>Default</label>
                    <AutoComplete
                        getData={(value = '') => {
                            return data.filter(item => value.indexOf(item.value) !== -1);
                        }}
                    >
                    </AutoComplete>
                </div>
            </div>
        );
    }
});

export default AutoCompleteTest;
