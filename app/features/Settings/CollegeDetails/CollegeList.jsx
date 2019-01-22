import React from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';

export default function CollegeList(props) {
    const columns: Array<Object> = [
        // { title: 'ID', dataIndex: 'pid', key: 'id' },
        { title: 'Name', dataIndex: 'item', key: 'item' },
        { title: 'Amount', dataIndex: 'item_amount', key: 'item_amount' },
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
            pid: id + 1,
            key: id,
        };
    });

    return (
        <div className="modify-college">
            <h2 className="college-h2" >Available cash allocations </h2>
            <hr />
            <div className="college-container">
                <Table
                    className="course-list-table"
                    dataSource={dataSource}
                    columns={columns} />
            </div>
        </div>
    );
}

CollegeList.propTypes = {
    onEditClicked: PropTypes.func.isRequired,
    onDeleteClicked: PropTypes.func.isRequired,

    dataSource: PropTypes.arrayOf(PropTypes.shape())
};

CollegeList.defaultProps = {
    dataSource: []
};
