import React from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';

export default function AllocationList(props) {
    const columns: Array<Object> = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Course', dataIndex: 'course', key: 'course' },
        { title: 'Class/Classes', dataIndex: 'class', key: 'class' },
        { title: 'Lecturer', dataIndex: 'lecturer', key: 'lecturer' },
        {
            title: ' ',
            render: (text, record) => (
                <div className="action-column grid">
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
        <div className="table-content">
            <h2 className="college-h2" style={{ color: '#767676' }}>Allocations </h2>
            <hr />
            <div className="allocate-container-table">
                <Table
                    className="allocate-list-table"
                    dataSource={dataSource}
                    columns={columns} />
            </div>
        </div>
    );
}

AllocationList.propTypes = {
    onEditClicked: PropTypes.func.isRequired,
    onDeleteClicked: PropTypes.func.isRequired,

    dataSource: PropTypes.arrayOf(PropTypes.shape())
};

AllocationList.defaultProps = {
    dataSource: []
};
