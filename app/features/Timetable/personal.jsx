import React, { Component } from 'react';
import { Table, Button, Row, Col, Select  } from 'antd';
import { PersonalInvigilation, getSelector } from '../_shared/services/dataService';
// var conversion = require("phantom-html-to-pdf")();
//import {ViewPDF} from '../_shared/services/pdfGenerator';


const columns: Array<Object> = [
    { title: 'SN', dataIndex: 'pid', key: 'id' },
    // { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Hours', dataIndex: 'hours', key: 'hours' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Rate/Hr', dataIndex: 'rate_hr', key: 'rate_hr' },
    { title: 'Amt(GHC)', dataIndex: 'amount', key: 'amount' },
    { title: 'Tax(GHC)', dataIndex: 'Tax', key: 'Tax' },
    { title: 'Amt Due(GHC)', dataIndex: 'amount_due', key: 'amount_due' },
    { title: 'Snack(GHC)', dataIndex: 'snack_allowance', key: 'snack_allowance' },
    { title: 'Day-Total(GHC)', dataIndex: 'day_total', key: 'day_total' }
];

const Option = Select.Option;
// var dataSource = [];



class Personal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dataSource: [],
            name: "" 
        };  

        // this.handleChange = this.handleChange.bind(this);
        // this.handleFocus = this.handleFocus.bind(this);
        // this.handleBlur = this.handleBlur.bind(this);
    }

    // handleChange(value) {
    //     console.log(`selected ${value}`);
    //     // this.setState({
    //     //     name: value
    //     // })
    //   }
      
    // handleBlur() {
    // console.log('blur');
    // }
    
    // handleFocus() {
    // console.log('focus');
    // }

    renderStaffData = () => {
    const staff = getSelector('personnel').map((element) => {
        // console.log(element.name);
        return <Option value={element.name} key={element.p_id}>{element.name}</Option>;
    });

    return staff;
    } 

    handleChange(value){
        // console.log(value);
        this.setState({
            name : value
        });

        //call the db function
        this.showResults(value);
    }
  
    handleBlur(){
        console.log('blur');
    }
    
    handleFocus(){
        console.log('focus');
    }

    showResults(name){
        const dataSource = PersonalInvigilation(name).map((element, id) => {
            return {
                ...element,
                pid: id + 1,
                key: id
            };
        });
        this.setState({
            dataSource
        });
    }

    renderTable(){
        return (
            <div className="table-container">
                <div className="table-generater-container"> 
                    <Table
                        className="teacher-list-table"
                        dataSource={this.state.dataSource}
                        style={{ margin: '0rem 1rem' }}
                        columns={columns} />
                </div>      
            </div>
        )
    }

    
    render() {
        return (
            <div>
                <div className="search-bar-person">
                    <Row style={{ marginBottom: '1rem' }}>
                        <Col span={8}>
                        <Select
                            showSearch
                            style={{ width: '20rem', marginLeft: '1.0rem' }}
                            size="large"
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.handleChange.bind(this)}
                            onFocus={this.handleFocus()}
                            onBlur={this.handleBlur()}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.renderStaffData()}
                        </Select>
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
                    
                </div>
                <div>
                    {this.renderTable()}
                </div>
            </div>
        );
    }
}

export default Personal;

