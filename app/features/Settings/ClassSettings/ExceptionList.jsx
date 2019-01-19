import React from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';

export default function ExceptionList(props) {
    const columns: Array<Object> = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Day', dataIndex: 'date', key: 'date' },
        { title: 'Start', dataIndex: 'start', key: 'start' },
        { title: 'End', dataIndex: 'end', key: 'end' },
        {
            title: ' ',
            render: (text, record) => (
                <div className="action-column grid">
                    <button
                        className="edit column"
                        onClick={() => props.onEditClicked(record)}>
                        Edit
                    </button>

                    <button
                        className="delete column"
                        onClick={() => props.onDeleteClicked(record)}>
                        Delete
                    </button>
                </div>
            )
        }
    ];

    const dataSource = props.dataSource.map((element, id) => {
        return {
            ...element,
            id: id + 1,
            key: id,
        };
    });

    return (
        <div className="modifyExcept">
            <h2 className="exceptionh2" >Lecture Period </h2>
            <div className="exception-container">
                <Table
                    className="programme-list-table"
                    dataSource={dataSource}
                    columns={columns} />
            </div>
        </div>
    );
}

ExceptionList.propTypes = {
    onEditClicked: PropTypes.func.isRequired,
    onDeleteClicked: PropTypes.func.isRequired,

    dataSource: PropTypes.arrayOf(PropTypes.shape())
};

ExceptionList.defaultProps = {
    dataSource: []
};
