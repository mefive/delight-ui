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
        const style = this.getStyle();
        this.setState({...style});
    },

    getStyle() {
        const {triggerOffset, triggerDimension} = this.props;
        const element = findDOMNode(this);

        const showOnTop
        = window.innerHeight + window.scrollY - (triggerOffset.top + triggerDimension.height) 
        < element.offsetHeight;

        return {
            top: showOnTop
            ? triggerOffset.top - element.offsetHeight
            : triggerOffset.top + triggerDimension.height,
            left: triggerOffset.left,
            width: triggerDimension.width
        }
    },

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.visible && this.props.visible) {
            const style = this.getStyle();
            this.setState({...style});
        }
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
            activeClass: 'active',
            onChange: () => {}
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
    activeClass: PropTypes.string,
    onChange: PropTypes.func
};

export default Select;
