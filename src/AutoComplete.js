import React from 'react';
import {findDOMNode} from 'react-dom';
import {getOffset} from './util';

import Trigger from './Trigger';
import SelectPopup from './SelectPopup';

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
            visible: false
        };
    },

    componentWillReceiveProps(nextProps) {
        const {data} = nextProps;

        this.state.visible = data && data.length > 0;
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

    onFocus() {
        this.updateData();
    },

    onBlur() {
       this.hide();
    },

    hide() {
        this.setState({
            visible: false
        }); 
    },

    onInput() {
        this.updateData();
    },

    updateData() {
        const {getData} = this.props;
        const {input} = this.refs;

        getData(input.value);
    },

    render() {
        const {data} = this.props
        let {visible} = this.state;

        return (
            <Trigger
                popup={this.getPopup()}
                popupMountInside={false}
                visible={visible}
            >
                <input 
                    type="text" 
                    className="auto-complete" 
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onInput={this.onInput}
                    ref="input"
                />
            </Trigger>
        );
    }
});

export default AutoComplete;