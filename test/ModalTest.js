import React from 'react';
import Modal from '../src/Modal';

const ModalTest = React.createClass({
    getInitialState() {
        return {
            visible: false  
        };
    },

    open() {
        this.setState({
            visible: true
        });
    },

    close() {
        this.setState({
            visible: false
        });
    },

    render() {
        const {visible} = this.state;

        return (
            <div className="modal-test">
                <h1>Modal</h1>
                <div 
                    className="modal-trigger"
                    onClick={this.open}
                >
                    Show Modal
                </div>
                <Modal
                    visible={visible}
                >
                    <div className="modal-dialog">
                        <div className="modal-header">
                            Tips
                            <i 
                                className="icon icon-times"
                                onClick={this.close}
                            >
                            </i>
                        </div>
                        <div className="modal-body">
                            <h2>Have a nice day, man</h2>
                            <div 
                                className="close"
                                onClick={this.close}
                            >
                                Close
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
});

export default ModalTest;
