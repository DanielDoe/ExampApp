import React from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import { Button, Row, Col, Input } from 'antd';

const Search = Input.Search;

export default class ProgrammeList extends React.Component {

    constructor(props) {
        super(props)
        // this.handleSelector = this.handleSelector.bind(this);
        this.state = {
          dataSource: [],
        };

        this.state.dataSource = this.props.dataSource;
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
            s.name.toLowerCase().search(value) !== -1 || 
            s.code.toLowerCase().search(value) !== -1
        )
        this.setState({ dataSource: newData });
    }  
      
    render() {
        const dataSource = this.state.dataSource.map((element, id) => {
            return {
                ...element,
                pid: id + 1,
                key: id,
            };
        });

        const columns: Array<Object> = [
            { title: 'ID', dataIndex: 'pid', key: 'id' },
            { title: 'Programme Name', dataIndex: 'name', key: 'name' },
            { title: 'Department', dataIndex: 'code', key: 'code' },
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
            <div className="programme-list column">
                <div className="list-container">
                    <div>
                        <Row className="filter-options">
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
                                    style={{ width: 250 }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <h2>List of Programmes</h2>
                    <div className="table-container">    
                    <Table
                        className="programme-list-table"
                        // loading
                        dataSource={dataSource}
                        columns={columns} />
                    </div>
                </div>
            </div>
        );
    }
}

ProgrammeList.propTypes = {
    onEditClicked: PropTypes.func.isRequired,
    onDeleteClicked: PropTypes.func.isRequired,

    dataSource: PropTypes.arrayOf(PropTypes.shape())
};

ProgrammeList.defaultProps = {
    dataSource: []
};