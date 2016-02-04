import React from 'react';
import {findDOMNode} from 'react-dom';
import {getOffset} from './util';

import Trigger from './Trigger';
import SelectPopup from './SelectPopup';

const ARROW_UP = 38;
const ARROW_DOWN = 40;
const ENTER = 13;

const AutoComplete = React.createClass({
    getDefaultProps() {
        return {
            value: null,
            popupClassName: 'select-popup',
            itemClassName: 'select-item',
            activeClass: 'active',
            onChange: () => {},
            getData: () => {},
            data: [],
            popup: null
        };
    },

    getInitialState() {
        return {
            select: null,
            offset: null,
            dimension: null,
            visible: false,
            inputValue: ''
        };
    },

    componentWillReceiveProps(nextProps) {
        const {data} = nextProps;
        const {state} = this;

        const visible = data && data.length > 0;

        if (visible && !state.visible) {
            state.visible = visible;
            state.select = null;
            this.onShow();
        }
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

    getPopup() {
        const {popupClassName, itemClassName, value, activeClass, popup, data} = this.props;
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

    onClick(e, value) {
        const {data} = this.props;
        const {input} = this.refs;

        const select = data.find(item => item.value === value);

        this.changeValue(select);
    },

    changeValue(select) {
        this.setState({
            inputValue: select.title
        });
    },

    onFocus(e) {
        e.preventDefault();
        this.updateData();
    },

    onInput() {
        this.updateData();
    },

    updateData() {
        const {getData} = this.props;
        const {input} = this.refs;

        this.state.inputValue = input.value;
        getData(input.value);
    },

    onShow() {
        document.addEventListener('click', this.hide);
    },

    hide(e) {
        const {input} = this.refs;

        if (!e || !input.contains(e.target)) {
            this.setState({
                visible: false
            });
            this.onHide();
        }
    },

    onHide() {
        document.removeEventListener('click', this.hide);
    },

    componentWillUnmount() {
        document.removeEventListener('click', this.hide);
    },

    onKeyDown(e) {
        const {which} = e;
        const {data} = this.props;
        let {select} = this.state;

        let index = data.indexOf(select);

        if ([ARROW_UP, ARROW_DOWN, ENTER].indexOf(which) !== -1) {
            e.preventDefault();
        }

        switch (which) {
            case ARROW_DOWN:
                if (index === data.length - 1) {
                    index = -1;
                }
                select = data[index + 1];
                break;

            case ARROW_UP:
                if (index === 0) {
                    index = data.length;
                }
                select = data[index - 1];
                break;

            case ENTER:
                this.changeValue(select);
                this.hide();
                return;
        }

        this.setState({ select });
    },

    render() {
        const {data} = this.props
        let {visible, inputValue} = this.state;

        return (
            <Trigger
                popup={this.getPopup()}
                popupMountInside={false}
                visible={visible}
                onShow={this.onShow}
                onHide={this.onHide}
            >
                <input 
                    type="text" 
                    className="auto-complete" 
                    onFocus={this.onFocus}
                    onInput={this.onInput}
                    ref="input"
                    value={inputValue}
                    onKeyDown={this.onKeyDown}
                />
            </Trigger>
        );
    }
});

export default AutoComplete;