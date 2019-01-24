import { ipcRenderer } from 'electron'
import React, { Component } from 'react'
import { Table, Button, Row, Col, Icon } from 'antd'
import { generateInvigilation } from '../_shared/services/dataService'
import { InvigilationReport } from './invigilationReport'
import '../Teachers/teachers'
// import {ViewPDF} from '../_shared/services/pdfGenerator';

const columns: Array<Object> = [
  { title: 'SN', dataIndex: 'pid', key: 'id' },
  // { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Time/mins', dataIndex: 'duration_total', key: 'duration_total' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Rate/Hr', dataIndex: 'rate_hr', key: 'rate_hr' },
  { title: 'Amt(GHC)', dataIndex: 'amount', key: 'amount' },
  { title: 'Tax', dataIndex: 'tax', key: 'tax' },
  { title: 'Amt Due (GHC)', dataIndex: 'amount_due', key: 'amount_due' }
]

const GENERATION_SUCCESS_CHANNEL_NAME = 'GENERATION_SUCCESS'
const GENERATION_CHANNEL_NAME = 'GENERATION'

class Invigilation extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dataSource: [],
      sem : '',
      year: ''
    }
  }

  componentDidMount () {
    ipcRenderer.on(GENERATION_SUCCESS_CHANNEL_NAME, () => {
      console.log('Rendering complete')
    })
  }

  componentWillMount () {
    const dataSource = generateInvigilation().map((element, id) => {
      return {
        ...element,
        pid: id + 1,
        key: id
      }
    })

    this.setState({
      dataSource
    })
  }

  handleGeneration = () => {
    let termDetails = {
      year: this.state.year,
      sem: this.state.sem
    }
  
    ipcRenderer.send(GENERATION_CHANNEL_NAME, InvigilationReport(this.state.dataSource, termDetails))
  }




  render () {
    return (
      <div className='table-container'>
        <div className='table-generater-container'>
          <Row style={{ marginBottom: '1rem' }}>
            <Col span={8} style={{float: 'left'}}>
              <div>
              <p style={{ margin: '0rem 5rem'}} className="report-termdetails"><Icon type="edit" style={{paddingRight: '0.5rem'}}/>Enter Semester</p>
              <input 
                className="input-report" 
                value={ this.state.sem }
                onChange={ (e) => { this.setState({ sem: e.target.value }) }}
                placeholder="eg. Second" 
                style={{margin: '0rem 1rem', width: '65%'}}/>
              </div>
            </Col>
            <Col span={8} style={{textAlign: 'center'}}>
            <div>
            <p style={{ margin: '0rem 5rem'}} className="report-termdetails"><Icon type="edit" style={{paddingRight: '0.5rem'}}/>Enter Academic year</p>
              <input 
                className="input-report" 
                placeholder="eg. 2019/2020" 
                value={ this.state.year }
                onChange={ (e) => { this.setState({ year: e.target.value }) }}
                style={{margin: '0rem 1rem', width: '65%'}}/>
            </div> 
            </Col>
            <Col span={8}>
              <div style={{ float: 'right', marginRight: '1rem', paddingTop: '1.3rem' }}>
                <Button
                  type='primary'
                  size='large'
                  onClick={this.handleGeneration}
                  disabled={!this.state.year && !this.state.year}
                >
                  Generate Report
                </Button>
              </div>
            </Col>
          </Row>
          <Table
            className='teacher-list-table'
            dataSource={this.state.dataSource}
            style={{ margin: '0rem 1rem' }}
            columns={columns}
          />
        </div>
      </div>
    )
  }

  // componentWillUnmount () {
  //   ipcRenderer.removeListener(GENERATION_SUCCESS_CHANNEL_NAME)
  // }
}

export default Invigilation
