import { ipcRenderer } from 'electron'
import React, { Component } from 'react'
import { PersonalReport } from './personalReport'
import { Table, Button, Row, Col, Select } from 'antd'
import {
  PersonalInvigilation,
  getSelector
} from '../_shared/services/dataService'

const columns: Array<Object> = [
  { title: 'SN', dataIndex: 'pid', key: 'id' },
  // { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Time/mins', dataIndex: 'duration_total', key: 'duration_total' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Rate/Hr', dataIndex: 'rate_hr', key: 'rate_hr' },
  { title: 'Amt(GHC)', dataIndex: 'amount', key: 'amount' },
  { title: 'Tax(GHC)', dataIndex: 'tax', key: 'tax' },
  { title: 'Amt Due(GHC)', dataIndex: 'amount_due', key: 'amount_due' },
  { title: 'Meal (GHC)', dataIndex: 'snack_allowance', key: 'snack_allowance' },
  { title: 'Day-Total(GHC)', dataIndex: 'day_total', key: 'day_total' }
]

const Option = Select.Option
const GENERATION_SUCCESS_CHANNEL_NAME = 'GENERATION_SUCCESS'
const GENERATION_CHANNEL_NAME = 'GENERATION'

class Personal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dataSource: [],
      name: '',
      sem: '',
      year: ''
    }
  }

  renderStaffData = () => {
    const staff = getSelector('personnel').map(element => {
      return (
        <Option value={element.name} key={element.p_id}>
          {element.name}
        </Option>
      )
    })

    return staff
  }

  handleChange (value) {
    // console.log(value);
    this.setState({
      name: value
    })

    // call the db function
    this.showResults(value)
  }

  handleBlur () {
    console.log('blur')
  }

  handleFocus () {
    console.log('focus')
  }

  showResults (name) {
    const dataSource = PersonalInvigilation(name).map((element, id) => {
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

  renderTable () {
    return (
      <div className='table-container'>
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

  handleGeneration = () => {
    let termDetails = {
      year: this.state.year,
      sem: this.state.sem
    }
    ipcRenderer.send(
      GENERATION_CHANNEL_NAME,
      PersonalReport(this.state.dataSource, termDetails)
    )
  }

  render () {
    return (
      <div>
        <div className='search-bar-person'>
          <Row style={{ marginBottom: '1rem' }}>
            <Col span={8}>
              <Select
                showSearch
                style={{ width: '20rem', marginLeft: '1.0rem' }}
                size='large'
                placeholder='Select a person'
                optionFilterProp='children'
                onChange={this.handleChange.bind(this)}
                onFocus={this.handleFocus()}
                onBlur={this.handleBlur()}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.renderStaffData()}
              </Select>
            </Col>
            <Col span={16}>
              <Row style={{ marginBottom: '1rem' }}>
                <Col span={8} style={{ float: 'left' }}>
                  <input
                    className='input-report'
                    value={this.state.sem}
                    onChange={e => {
                      this.setState({ sem: e.target.value })
                    }}
                    placeholder='semester eg. Second'
                    style={{ margin: '0rem 1rem', width: '75%' }}
                  />
                </Col>
                <Col span={8} style={{ textAlign: 'center' }}>
                  <input
                    className='input-report'
                    placeholder='year eg. 2019/2020'
                    value={this.state.year}
                    onChange={e => {
                      this.setState({ year: e.target.value })
                    }}
                    style={{ margin: '0rem 1rem', width: '75%' }}
                  />
                </Col>
                <Col span={8}>
                  <div style={{ float: 'right', marginRight: '1rem' }}>
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
            </Col>
          </Row>
        </div>
        <div>{this.renderTable()}</div>
      </div>
    )
  }
}

export default Personal
