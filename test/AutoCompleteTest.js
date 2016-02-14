import React from 'react';
import AutoComplete from '../src/AutoComplete';

import selectPopupMixin from '../src/selectPopupMixin';

const dataSourceDefault = [
    { value: '1', title: '一' },
    { value: '2', title: '二' },
    { value: '3', title: '三' },
    { value: '4', title: '四' },
    { value: '5', title: '五' },
    { value: '6', title: '六' },
    { value: '7', title: '七' },
];

const PersonSelectData = [
    { value: '1', title: '秃尾巴老刘', avatar: 'http://tp2.sinaimg.cn/1556196533/180/40011054673/1' },
    { value: '2', title: 'Trek崔克中国', avatar: 'http://tp4.sinaimg.cn/1740322751/50/5748394898/1' },
    { value: '3', title: '胖叔叔的游戏生涯', avatar: 'http://tp2.sinaimg.cn/5837196929/50/5748853870/1' }
];

const PersonAutoCompletePopup = React.createClass({
    mixins: [selectPopupMixin],

    render() {
        const {dataSource, value, className, itemClassName, activeClass, onClick} = this.props;
        const {width, top, left} = this.state;

        const style = {
            left: left,
            top: top
        };

        if (width) {
            style.width = width;
        }

        return (
            <div 
                className={className}
                style={style}
            >
            {(() => {
                const list 
                = dataSource.map(item => {
                    let className = itemClassName;

                    if (item.value === value) {
                        className = `${className} ${activeClass}`;
                    }

                    return (
                        <div 
                            className={className}
                            key={item.value}
                            onClick={e => onClick(e, item.value)}
                        >
                            <img className="avatar" src={item.avatar} />
                            {item.title}
                        </div>
                    );
                });

                return list;        
            })()}
            </div>
        );
    }
});

const Default = React.createClass({
    getInitialState() {
        return {
            dataSource: []  
        };
    },

    fetchData(value) {
        const dataSource = dataSourceDefault.filter(item => value.indexOf(item.value) !== -1);

        this.setState({ dataSource });
    },

    render() {
        const {dataSource} = this.state;

        return(
            <AutoComplete
                getDataSource={this.fetchData}
                dataSource={dataSource}
            >
            </AutoComplete>
        );
    }
});

const Custom = React.createClass({
    getInitialState() {
        return {
            dataSource: []  
        };
    },

    fetchData(value) {
        const dataSource = PersonSelectData.filter(item => value.indexOf(item.value) !== -1);

        this.setState({ dataSource });
    },

    render() {
        const {dataSource} = this.state;

        return(
            <AutoComplete
                popupClassName="select-popup person"
                getDataSource={this.fetchData}
                dataSource={dataSource}
                popup={React.createElement(PersonAutoCompletePopup)}
            >
            </AutoComplete>
        );
    }
});

const AutoCompleteTest = React.createClass({
    render() {
        return(
            <div className="auto-complete-test">
                <h1>AutoComplete</h1>
                <div className="auto-complete-container">
                    <label>Default</label>
                    <Default />
                </div>
                <div className="auto-complete-container">
                    <label>Custom</label>
                    <Custom />
                </div>
            </div>
        );
    }
});

export default AutoCompleteTest;
