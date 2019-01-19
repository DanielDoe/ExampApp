import React from 'react';
import { DatePicker, Col, Row, Form, Icon, Input, Button, Table, notification } from 'antd';
import { addExamPeriod, getSelector } from '../../_shared/services/dataService';
import moment from 'moment';

const FormItem = Form.Item;

class GenerateDurationForm extends React.Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            start: moment(getSelector('exam_period')[0].start, 'MM/DD/YYYY'),
            end: moment(getSelector('exam_period')[0].end, 'MM/DD/YYYY')
        }
        // this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        console.log(getSelector('exam_period')[0]);
        this.props.form.validateFields();
        this.props.form.setFieldsValue({
            start: this.state.start,
            end: this.state.end
        });
    }

    openNotificationWithIcon(type, text) {
        notification[type]({
          message: `Duration ${text} successfully`,
          description: `Your exams duration has been ${text} successfully.`,
        });
      }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            
            // if (err) {
            //     return;
            //   }
            // Should format date value before submit.
            // const values = {
            //     ...fieldsValue,
            //     'start': fieldsValue['start'].format('l'),
            //     'end': fieldsValue['end'].format('l'),
            // };
            const duration: Object = {
                id: this.props.id,
                start: moment(fieldsValue.start).format('MM/DD/YYYY'),
                end: moment(fieldsValue.end).format('MM/DD/YYYY')
            };
            // this.props.onSessionEditted(session);
            if (getSelector('exam_period').length !== 0) {
                 addExamPeriod(duration, 'update');
                 notification['success']({
                    message: `Duration updated successfully`,
                    description: `Your exams duration has been updated successfully.`,
                  });
                //  this.openNotificationWithIcon('Success', 'updated');
            } else {
                addExamPeriod(duration, 'add');
                notification['success']({
                    message: `Duration added successfully`,
                    description: `Your exams duration has been added successfully.`,
                  });
                // this.openNotificationWithIcon('Success', 'added');
            }
        });
    }


    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    

    // reset form data when submitted
    handleReset = () => {
        this.props.form.resetFields();
        this.setState({ counter: 1 });
    }
    
    render(){
        const { 
            getFieldDecorator, 
            getFieldsError, 
            getFieldError, 
            getFieldValue,
            isFieldTouched } = this.props.form;

        const startError = isFieldTouched('start') && getFieldError('start');
        const endError = isFieldTouched('end') && getFieldError('end');

        const start = getFieldValue('start');
        const end = getFieldValue('end');    

        const isEmpty = !start || !end;

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={4} className="classCol">
                            <p className="classPickerText">Exam Duration</p>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                validateStatus={startError ? 'error' : ''}
                                help={startError || ''}
                                style={{ marginBottom: '5px' }}
                                >
                                {getFieldDecorator('start', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <DatePicker 
                                        className="classTimepicker"   
                                        format="MMMM Do YYYY"
                                        // onChange={moment => this.fieldChanged(moment, fieldId)}
                                        size="large" />    
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                validateStatus={endError ? 'error' : ''}
                                help={endError || ''}
                                style={{ marginBottom: '5px' }}
                                // validateStatus={userNameError ? 'error' : ''}
                                // help={userNameError || ''}
                                >
                                {getFieldDecorator('end', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <DatePicker 
                                        className="classTimepicker"
                                        format="MMMM Do YYYY" 
                                        // onChange={onChange} 
                                        size="large" />    
                                )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem
                                style={{ marginBottom: '5px' }}
                                // validateStatus={userNameError ? 'error' : ''}
                                // help={userNameError || ''}
                                >
                                <button 
                                // className={(this.hasErrors(getFieldsError()) || isEmpty) ? "exams-button-disable" : "exams-button-enable"}
                                className={(this.hasErrors(getFieldsError()) || isEmpty) ? "exams-button-disable" : "exams-button-enable"}
                                // style={{ width: '80%', margin: '5px 0px', height: 32 }}
                                // htmlType="submit" 
                                disabled={this.hasErrors(getFieldsError()) || isEmpty}
                                size="large">
                                <Icon
                                    // className="dynamic-delete-button"
                                    type="plus-circle-o"
                                    // disabled={keys.length === 1}
                                    // onClick={() => this.remove(k)}
                                    /> Add
                            </button> 
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const GenerateDuration = Form.create()(GenerateDurationForm);
export default GenerateDuration;
