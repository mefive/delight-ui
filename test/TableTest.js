import React from 'react';
import Table from '../src/Table';

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
                <Table
                    className="table"
                    dataSource={dataSource}
                    colums={colums}
                >
                </Table>
            </div>
        );
    }
});

export default TableTest;
