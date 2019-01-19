import React, { Component } from 'react';
require ('../_shared/services/Report.js');
import { Table, Button, Row, Col } from 'antd';
import { generateInvigilation } from '../_shared/services/dataService';
var conversion = require("phantom-html-to-pdf")();
//import {ViewPDF} from '../_shared/services/pdfGenerator';


const columns: Array<Object> = [
    { title: 'SN', dataIndex: 'pid', key: 'id' },
    // { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Duration', dataIndex: 'hours', key: 'hours' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Rate/Hr', dataIndex: 'rate_hr', key: 'rate_hr' },
    { title: 'Amt(GHC)', dataIndex: 'amount', key: 'amount' },
    { title: 'Tax', dataIndex: 'Tax', key: 'Tax' },
    { title: 'Amt Due (GHC)', dataIndex: 'amount_due', key: 'amount_due' },
];

class Invigilation extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dataSource: [] 
        };  

        this.generatePDF = this.generatePDF.bind(this);
    }

    componentWillMount() {
        const dataSource = generateInvigilation().map((element, id) => {
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

    generatePDF(){
        conversion({ html: "<h1>Hello World</h1>" }, function(err, pdf) {
            var output = fs.createWriteStream('../_shared');
            console.log(pdf.logs);
            console.log(pdf.numberOfPages);
              // since pdf.stream is a node.js stream you can use it
              // to save the pdf to a file (like in this example) or to
              // respond an http request.
            pdf.stream.pipe(output);
          });;
    }

    render() {
        return (
            <div className="table-container">
                <div className="table-generater-container">
                    <Table
                        className="teacher-list-table"
                        dataSource={this.state.dataSource}
                        style={{ margin: '0rem 1rem' }}
                        columns={columns} />
                    </div>
                    <Row style={{ marginTop: '1rem' }}>
                    <Col span={8}>
                    </Col>
                    <Col span={8} />
                    <Col span={8}>
                    <div style={{ float: 'right', marginRight: '1rem' }}>
                        <Button 
                            type="primary" size='large'
                            onClick={() => <ViewPDF />}
                            >
                            Generate</Button>
                    </div>
                    </Col>
                </Row>
                    
            </div>
        );
    }
}

export default Invigilation;

