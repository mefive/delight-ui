import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import Trigger from './Trigger';
import {getOffset} from './util';

const Popup = React.createClass({
    getInitialState() {
        return {
            width: 0,
            left: 0,
            to: 0           
        };
    },

    componentDidMount() {
        const {triggerOffset, triggerDimension} = this.props;
        const element = findDOMNode(this);

        this.setState({
            top: triggerOffset.top - element.offsetHeight,
            left: triggerOffset.left,
            width: triggerDimension.width
        });
    },

    render() {
        const {data, value, className, itemClassName, activeClass, onClick} = this.props;
        const {width, top, left} = this.state;

        return (
            <div 
                className={className}
                style={{
                    width: width,
                    left: left,
                    top: top
                }}
            >
            {(() => {
                const list 
                = data.map(item => {
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

const Select = React.createClass({
    getDefaultProps() {
        return {
            data: [],
            value: '2',
            popupClassName: 'select-popup',
            itemClassName: 'select-item',
            activeClass: 'active'
        };
    },

    getInitialState() {
        return {
            popupWidth: 0,
            popupTop: 0,
            popupLeft: 0,
            popupBottom: 0,
            select: {}
        };
    },

    componentDidMount() {
        const element = findDOMNode(this);
        const offset = getOffset(element);
        const dimension = {
            height: element.offsetHeight,
            width: element.offsetWidth
        };

        this.setState({
            offset,
            dimension
        });
    },

    onClick(e, value) {
        const {data} = this.props;

        this.setState({ 
            select: data.find(item => item.value === value),
            visible: false
        });
    },

    getPopup() {
        const {popupClassName, itemClassName, data, value, activeClass} = this.props;
        const {offset, dimension} = this.state;

        return (
            <Popup
                className={popupClassName}
                activeClass={activeClass}
                itemClassName={itemClassName}
                data={data}
                value={value}
                triggerOffset={offset}
                triggerDimension={dimension}
                onClick={this.onClick}
            >
            </Popup>
        );
    },

    render() {
        const {children, className, defaultTitle} = this.props;
        const {select, visible} = this.state;

        return (
            <Trigger
                popup={this.getPopup()}
                popupMountInside={false}
                actions="click"
                visible={visible}
            >
                <div className={className}>
                    {select.title || defaultTitle}
                </div>
            </Trigger>
        );
    }
});

Select.propTypes = {
    className: PropTypes.string,
    defaultTitle: PropTypes.string,
    data: PropTypes.array,
    value: PropTypes.string,
    popup: PropTypes.node,
    popupClassName: PropTypes.string,
    itemClassName: PropTypes.string,
    activeClass: PropTypes.string
};

export default Select;
