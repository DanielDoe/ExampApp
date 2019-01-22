import React from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import { Input, Row, Col } from 'antd';

const Search = Input.Search;

export default class TeacherList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          dataSource: []
        };

        this.state.dataSource = this.props.dataSource

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.dataSource
        });
      
    }

    onSearch = e => {
        const value = e.target.value.toLowerCase()
        const newData = this.props.dataSource.filter(
          s =>
            s.name.toLowerCase().search(value) !== -1  
            // s.department.toLowerCase().search(value) !== -1
        );
        this.setState({ dataSource: newData });
    }

    render(){
        const dataSource = this.state.dataSource.map((element, id) => {
            return {
                ...element,
                pid: id + 1,
                key: id,
            };
        });

        const columns: Array<Object> = [
            { title: 'ID', dataIndex: 'pid', key: 'id' },
            // { title: 'Title', dataIndex: 'title', key: 'title' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            // { title: 'staffID', dataIndex: 'staff', key: 'staff' },
            { title: 'Member Type', dataIndex: 'member', key: 'member' },
            { title: 'Status', dataIndex: 'status', key: 'status' },
            {
                title: ' ',
                render: (text, record) => (
                    <div className="action-column grid">
                        <button
                            className="edit column"
                            onClick={() => this.props.onEditClicked(record)}>
                            Edit
                        </button>
    
                        <button
                            className="delete column"
                            onClick={() => this.props.onDeleteClicked(record)}>
                            Delete
                        </button>
                    </div>
                )
            }
        ];

        return (
            <div className="teacher-list column">
                <div className="list-container">
                    <div>
                        <Row className="teacher-filter-option">
                            <Col span={8}>
                                <div className="filter-container-elements" />
                            </Col>
                            <Col span={8}>
                                <div className="filter-container-elements" />            
                            </Col>
                            <Col span={8}>
                                <div className="search-container-elements">
                                <Search
                                    placeholder="input search text"
                                    size="large"
                                    onChange={this.onSearch}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <h2>List of staff members</h2>
                    <div className="table-container">
                        <Table
                            className="teacher-list-table"
                            pagination={{ pageSize: 10 }}
                            //scroll={{ y: 200 }}
                            dataSource={dataSource}
                            columns={columns} />
                    </div>
                </div>
            </div>
        );
    }
}

TeacherList.propTypes = {
    onEditClicked: PropTypes.func.isRequired,
    onDeleteClicked: PropTypes.func.isRequired,

    dataSource: PropTypes.arrayOf(PropTypes.shape())
};

TeacherList.defaultProps = {
    dataSource: []
};
