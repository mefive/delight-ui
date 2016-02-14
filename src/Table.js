import React, {PropTypes} from 'react';
import * as util from './util';

const Table = React.createClass({
    getDefaultProps() {
        return {
            className: 'table',
            dataSource: [],
            colums: [],
            sortByClass: 'sort'
        };
    },

    getInitialState() {
        return {
            sortBy: 'age',
            order: 'desc'
        };
    },

    componentWillMount() {
        this.state.dataSource = this.props.dataSource;
        this.sort();
    },

    componentWillReceiveProps(nextProps) {
        this.state.dataSource = nextProps.dataSource;
        this.sort();
    },

    sort() {
       const {sortBy, order} = this.state;
       let {dataSource} = this.state;

        if (sortBy) {
            dataSource = util.sortBy(dataSource, sortBy, order);
        }

        this.state.dataSource = dataSource; 
    },

    onClick(key) {
        const {state} = this;
        let {sortBy, order} = state;

        order
        = sortBy === key && order === 'desc'
        ? 'asc' : 'desc';

        state.order = order;
        state.sortBy = key;

        this.sort();
        this.forceUpdate();
    },

    render() {
        const {className, colums, sortByClass} = this.props;
        const {dataSource, sortBy, order} = this.state;

        return (
            <table
                className={className}
            >
                <thead>
                    <tr>
                    {colums.map(colume => {
                        const {key, title} = colume;

                        return (
                            <th 
                                key={key}
                                onClick={e => this.onClick(key)}
                                className={key === sortBy ? `${sortByClass} ${order}` : ''}
                            >
                                {title}
                                <div 
                                    className="resizer"
                                ></div>
                            </th>
                        );
                    })}
                    </tr>
                </thead>
                <tbody>
                {dataSource.map((row, index) => (
                    <tr key={index}>
                    {Object.keys(row).map(key => (
                        <td key={key}>
                            {row[key]}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
});

Table.propTypes = {
    className: PropTypes.string,
    dataSource: PropTypes.array,
    colums: PropTypes.array
};

export default Table;
