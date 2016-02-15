import React from 'react';
import Table from '../src/Table';
import Scrollable from '../src/Scrollable';

const colums = [
    { key: 'id', title: 'Id' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'gender', title: 'Gender' }
];

const dataSource = [
    { id: 1, name: 'Mark', age: 30, gender: 'male' },
    { id: 2, name: 'mefive', age: 30, gender: 'male' },
    { id: 3, name: 'lalasheep', age: 29, gender: 'female' }
];

const TableTest = React.createClass({
    render() {
        return (
            <div className="table-test">
                <h1>Table</h1>
                <div className="table-container">
                    <Scrollable
                        className="table-scroll-panel"
                        orientation="horizontal"
                    >
                        <Table
                            className="table"
                            dataSource={dataSource}
                            colums={colums}
                        >
                        </Table>
                    </Scrollable>
                </div>

                <h1>Table Resizable</h1>
                <div className="table-container resizable">
                    <Table
                        className="table"
                        dataSource={dataSource}
                        colums={colums}
                        resizable={true}
                    >
                    </Table>
                </div>
            </div>
        );
    }
});

export default TableTest;
