import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import Trigger from './Trigger';
import selectPopupMixin from './selectPopupMixin';
import {getOffset} from './util';

const Popup = React.createClass({
    mixins: [selectPopupMixin],

    render() {
        const {data, value, className, itemClassName, activeClass, onClick} = this.props;
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
            value: null,
            popupClassName: 'select-popup',
            itemClassName: 'select-item',
            activeClass: 'active',
            onChange: () => {},
            popup: null
        };
    },

    getInitialState() {
        return {
            popupWidth: 0,
            popupTop: 0,
            popupLeft: 0,
            popupBottom: 0,
            select: null
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
        const {data, onChange} = this.props;
        const select = data.find(item => item.value === value);

        this.setState({ 
            select,
            visible: false
        });

        this.onHide();
        onChange(select);
    },

    getPopup() {
        const {popupClassName, itemClassName, data, value, activeClass, popup} = this.props;
        const {offset, dimension, select} = this.state;

        const popupProps = {
            className: popupClassName,
            activeClass: activeClass,
            itemClassName: itemClassName,
            data: data,
            value: select ? select.value : value,
            triggerOffset: offset,
            triggerDimension: dimension,
            onClick: this.onClick
        };

        if (popup) {
            return React.createElement(popup, popupProps);
        }
        else {
            return (
                <Popup {...popupProps}>
                </Popup>
            );
        }
    },

    onShow() {
        document.addEventListener('click', this.hide);
    },

    hide() {
        this.setState({
            visible: false
        });
        this.onHide();
    },

    onHide() {
        document.removeEventListener('click', this.hide);
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
                onShow={this.onShow}
                onHide={this.onHide}
            >
                <div className={className}>
                    {select ? select.title : defaultTitle}
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
    popup: PropTypes.func,
    popupClassName: PropTypes.string,
    itemClassName: PropTypes.string,
    activeClass: PropTypes.string,
    onChange: PropTypes.func
};

export default Select;
