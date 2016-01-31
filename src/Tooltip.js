import React from 'react';

const Tooltip =  React.createClass({
    getDefaultProps() {
        return {
            className: 'tooltip',
            popupClassName: 'tooltip-popup'
        };
    },

    render() {
        const {className} = this.props;

        return (
            <div className={className}>
            </div>
        );
    }
});

export default Tooltip;
