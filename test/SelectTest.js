import React from 'react';

import Select from '../src/Select';
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

const PersonSelectPopup = React.createClass({
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

const SelectTest = React.createClass({
    render() {
        return (
            <div className="select-test">
                <h1>Select</h1>
                <div className="select-container">
                    <label>Default</label>
                    <Select
                        dataSource={dataSourceDefault}
                        className="select"
                        defaultTitle="Choose number"
                    >
                    </Select>
                </div>

                <div className="select-container">
                    <label>Custom</label>
                    <Select
                        dataSource={PersonSelectData}
                        className="select person"
                        popupClassName="select-popup person"
                        defaultTitle="Choose person"
                        popup={React.createElement(PersonSelectPopup)}
                    >
                    </Select>
                </div>
            </div>
        );
    }
});

export default SelectTest;
