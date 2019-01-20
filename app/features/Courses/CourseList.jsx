import React from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import { getNameById } from '../_shared/services/dataService';
import { Row, Col, Input, Select, Tag } from 'antd';

const Search = Input.Search;
const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
  }
  
  function handleBlur() {
    console.log('blur');
  }
  
  function handleFocus() {
    console.log('focus');
  }

export default class CourseList extends React.Component {
    constructor(props) {
        super(props);
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
            s.period.toLowerCase().search(value) !== -1
        )
        this.setState({ dataSource: newData });
    }

    renderSession = period => {
        // console.log(period);
        if (period === 'morning') {
            return (
                <div className="action-column grid">
                    <Tag color="#87d068">{period}</Tag>
                </div>
            )
        }
        if (period === 'afternoon') {
            return (
                <div className="action-column grid">
                    <Tag color="#2db7f5">{period}</Tag>
                </div>
            )
        } if (period === 'evening') {
            return (
                <div className="action-column grid">
                    <Tag color="#00bcd4">{period}</Tag>
                </div>
            )
        }
    }

    render(){
        const dataSource = this.state.dataSource.map((element, id) => {
            return {
                ...element,
                pid: id + 1,
                key: id,
                p_id: getNameById(element.p_id, 'personnel')[0].name 
            };
        });

        const columns: Array<Object> = [
            { title: 'ID', dataIndex: 'pid', key: 'pid' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Start', dataIndex: 'start', key: 'start' },
            { title: 'End', dataIndex: 'end', key: 'end' },
            { title: 'Minutes', dataIndex: 'duration_mins', key: 'duration_mins' },
            {
                title: 'Session',
                render: (text, record) => (
                     this.renderSession(text.period)
                )
            },
            {
                title: ' ',
                render: (text, record) => (
                    <div className="action-column grid">
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
        <div className="course-list column">
            {/* <h2>List of Courses</h2>
            <div className="table-container">
                <Table
                    className="course-list-table"
                    dataSource={dataSource}
                    columns={columns} />
            </div> */}
            <div className="list-container">
                <div>
                    <Row className="filter-options">
                        <Col span={8}>
                            <div className="filter-container-elements">
                                {/* <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a date"
                                    optionFilterProp="children"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    size="large"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select> */}
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="filter-container-elements">
                                {/* <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a session"
                                    optionFilterProp="children"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    size="large"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select> */}

                            </div>            
                        </Col>
                        <Col span={8}>
                            <div className="course-search-container">
                            <Search
                                placeholder="input search text"
                                size="large"
                                onChange={this.onSearch}
                                // style={{ width: 250 }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
                <h2>List of Allocations</h2>
                <div className="table-container">
                    <Table
                        className="course-list-table"
                        // loading
                        dataSource={dataSource}
                        columns={columns} />
                </div>
            </div>
        </div>
    );

}
}

CourseList.propTypes = {
    onEditClicked: PropTypes.func.isRequired,
    onDeleteClicked: PropTypes.func.isRequired,

    dataSource: PropTypes.arrayOf(PropTypes.shape())
};

CourseList.defaultProps = {
    dataSource: []
};
