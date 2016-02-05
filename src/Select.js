import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import Trigger from './Trigger';
import SelectPopup from './SelectPopup';
import {getOffset} from './util';

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
            select: null,
            offset: null,
            dimension: null
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
                <SelectPopup {...popupProps}>
                </SelectPopup>
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

    componentWillUnmount() {
        document.removeEventListener('click', this.hide);
    },

    render() {
        const {children, defaultTitle, activeClass} = this.props;
        let {className} = this.props;
        const {select, visible} = this.state;

        return (
            <Trigger
                popup={this.getPopup()}
                popupMountInside={false}
                actions="click"
                visible={visible}
                onShow={this.onShow}
                onHide={this.onHide}
                activeClass={activeClass}
                enterDuration={400}
                leaveDuration={400}
            >
                <div className={className}>
                    {select ? select.title : defaultTitle}
                    <i className="icon icon-circle-down"></i>
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
