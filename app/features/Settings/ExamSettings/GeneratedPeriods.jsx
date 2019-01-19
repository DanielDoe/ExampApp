import React from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';

export default function GeneratedPeriods(props) {
    const columns: Array<Object> = [
        { title: 'ID', dataIndex: 'pid', key: 'id' },
        { title: 'Session', dataIndex: 'session', key: 'session' },
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
            pid: id + 1,
            key: id,
        };
    });

    return (
        <div className="exams-session">
            <h2 className="session-h2" >Exams Period </h2>
            <div className="exams-container">
                <Table
                    className="exams-list-table"
                    dataSource={dataSource}
                    columns={columns} />
            </div>
        </div>
    );
}

GeneratedPeriods.propTypes = {
    onEditClicked: PropTypes.func.isRequired,
    onDeleteClicked: PropTypes.func.isRequired,

    dataSource: PropTypes.arrayOf(PropTypes.shape())
};

GeneratedPeriods.defaultProps = {
    dataSource: []
};
