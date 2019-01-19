import React, { Component } from 'react';
import { SnackCalculation } from '../_shared/services/dataService';
import { Table, Button, Select, Row, Col } from 'antd';

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

const columns: Array<Object> = [
    { title: 'SN', dataIndex: 'pid', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Sessions', dataIndex: 'sessions', key: 'sessions' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    
];


class Snack extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [] 
        };  
    }

    componentWillMount() {
        const dataSource = SnackCalculation().map((element, id) => {
            return {
                ...element,
                pid: id + 1,
                key: id
            };
        });

        this.setState({
            dataSource
        });

        console.log(this.state.dataSource);
    }
    
    render() {
        return (
            <div className="table-container">
                <Row style={{ marginBottom: '1rem' }}>
                    <Col span={8}>
                    </Col>
                    <Col span={8} />
                    <Col span={8}>
                    <div style={{ float: 'right', marginRight: '1rem' }}>
                        <Button 
                            type="primary" size='large'>
                            Generate</Button>
                    </div>
                    </Col>
                </Row>
                <div className="table-generater-container">
                    <Table
                        className="teacher-list-table"
                        dataSource={this.state.dataSource}
                        style={{ margin: '0rem 1rem' }}
                        columns={columns} />
                </div>
            </div>
        );
    }
}

export default Snack;

