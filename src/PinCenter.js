import React from 'react';
import {findDOMNode} from 'react-dom';

const PinCenter = React.createClass({
    getInitialState() {
        return {
            marginLeft: 0,
            marginTop: 0 
        };
    },

    componentDidMount() {
        this.componentDidUpdate();
    },

    componentDidUpdate(prevProps, prevState) {
        const element = findDOMNode(this);

        const marginLeft = -(element.offsetWidth / 2);
        const marginTop = -(element.offsetHeight / 2);

        if (!prevState
            || (marginTop !== prevState.marginTop
            || marginLeft !== prevState.marginLeft)
        ) {
            this.setState({
                marginLeft,
                marginTop
            });
        }
    },

    render() {
        const {children} = this.props;
        const {marginLeft, marginTop} = this.state;

        let style = children.props.style;

        style = {
            ...style,
            marginLeft,
            marginTop
        };
        
        return React.cloneElement(this.props.children, { style });
    }
});

export default PinCenter;
