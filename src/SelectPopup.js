import React from 'react';
import selectPopupMixin from './selectPopupMixin';

const SelectPopup = React.createClass({
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
                            onClick={e => { onClick(e, item.value); }}
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

export default SelectPopup;
