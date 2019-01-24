import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import { SnackReport } from './snackReport'
import { SnackCalculation } from '../_shared/services/dataService'
import { Table, Button, Select, Row, Col, Icon } from 'antd'
import '../Teachers/teachers'

const Option = Select.Option

function handleChange (value) {
  console.log(`selected ${value}`)
}

function handleBlur () {
  console.log('blur')
}

function handleFocus () {
  console.log('focus')
}

const columns: Array<Object> = [
  { title: 'SN', dataIndex: 'pid', key: 'id' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Sessions', dataIndex: 'sessions', key: 'sessions' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' }
]

const GENERATION_SUCCESS_CHANNEL_NAME = 'GENERATION_SUCCESS'
const GENERATION_CHANNEL_NAME = 'GENERATION'

class Snack extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      sem : '',
      year: ''
    }
  }

  componentWillMount () {
    const dataSource = SnackCalculation().map((element, id) => {
      return {
        ...element,
        pid: id + 1,
        key: id
      }
    })

    this.setState({
      dataSource
    })

    console.log(this.state.dataSource)
  }

  handleGeneration = () => {
    let termDetails = {
        year: this.state.year,
        sem: this.state.sem
      }
    ipcRenderer.send(
      GENERATION_CHANNEL_NAME,
      SnackReport(this.state.dataSource, termDetails)
    )
  }

  render () {
    return (
      <div className='table-container'>
        <Row style={{ marginBottom: '1rem' }}>
          <Col span={8} style={{ float: 'left' }}>
          <div>
              <p style={{ margin: '0rem 5rem'}} className="report-termdetails"><Icon type="edit" style={{paddingRight: '0.5rem'}}/>Enter Semester</p>
            <input
              className='input-report'
              value={this.state.sem}
              onChange={e => {
                this.setState({ sem: e.target.value })
              }}
              placeholder='eg. Second'
              style={{ margin: '0rem 1rem', width: '65%' }}
            />
            </div>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
          <div>
              <p style={{ margin: '0rem 5rem'}} className="report-termdetails"><Icon type="edit" style={{paddingRight: '0.5rem'}}/>Enter Semester</p>
            <input
              className='input-report'
              placeholder='eg. 2019/2020'
              value={this.state.year}
              onChange={e => {
                this.setState({ year: e.target.value })
              }}
              style={{ margin: '0rem 1rem', width: '65%' }}
            />
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
        <div className='table-generater-container'>
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
}

export default Snack
