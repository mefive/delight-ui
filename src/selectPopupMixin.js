import {findDOMNode} from 'react-dom';

const selectPopupMixin = {
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
        if ((!prevProps.visible && this.props.visible)
            || (prevProps.dataSource !== this.props.dataSource)
        ) {
            const style = this.getStyle();
            this.setState({...style});
        }
    }
};

export default selectPopupMixin;
