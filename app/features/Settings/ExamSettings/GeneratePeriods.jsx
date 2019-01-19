import React from 'react';
import moment from 'moment';
import { TimePicker, Col, Row, Form, Icon, Input, Button, Table, Popconfirm } from 'antd';

const FormItem = Form.Item;

class GeneratePeriodsForm extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            counter: 1,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    componentWillReceiveProps(nextProps) {
        if (
            Object.keys(nextProps.fieldData).length !== 0 &&
            nextProps.editMode === true &&
            this.state.counter > 0
          ) {
            this.props.form.setFieldsValue({
                session: nextProps.fieldData.session,
                start: moment(nextProps.fieldData.start, 'HH:mm A'),
                end: moment(nextProps.fieldData.end, 'HH:mm A')
            });
            this.setState({ counter: -1 });
          }
    }

    indexError = () => {
        console.log('Error with class name ');
    }  

      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            const id = (this.props.editMode) ? this.props.id : -1;

            let hasError: boolean = false;
            this.props.sessions.forEach((session: Object) => {
                if (
                session.session === fieldsValue.session &&
                this.props.editMode === false
                ) {
                hasError = true;
                }
            });

            if (hasError) {
                this.indexError();
                return;
            }
            // if (err) {
            //     return;
            //   }
            // Should format date value before submit.
            const values = {
                ...fieldsValue,
                'start': fieldsValue['start'].format('HH:mm A'),
                'end': fieldsValue['end'].format('HH:mm A'),
            };
            const session: Object = {
                id: this.props.id,
                session: fieldsValue.session.trim().toUpperCase(),
                start: values['start'],
                end: values['end']
            };
            this.props.onSessionEditted(session);
            console.log(session);
        });
        this.handleReset();
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
        const { getFieldDecorator, getFieldValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const sessionError = isFieldTouched('session') && getFieldError('session');
        const startError = isFieldTouched('start') && getFieldError('start');
        const endError = isFieldTouched('end') && getFieldError('end');

        const session = getFieldValue('session');
        const start = getFieldValue('start');
        const end = getFieldValue('end');

        const isEmpty = !session || !start || !end;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                validateStatus={sessionError ? 'error' : ''}
                                help={sessionError || ''}
                                style={{ marginBottom: '5px' }}
                                >
                                {getFieldDecorator('session', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input className="classTimepicker" placeholder="add session" />  
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                validateStatus={startError ? 'error' : ''}
                                help={startError || ''}
                                style={{ marginBottom: '5px' }}
                                >
                                {getFieldDecorator('start', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TimePicker 
                                        className="classTimepicker"
                                        use12Hours 
                                        placeholder="start"
                                        format="h:mm A"
                                        // onChange={moment => this.fieldChanged(moment, fieldId)}
                                        size="large" />    
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
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
                                    <TimePicker 
                                        className="classTimepicker" 
                                        use12Hours 
                                        format="h:mm A" 
                                        placeholder="end"
                                        // onChange={onChange} 
                                        size="large" />    
                                )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <button 
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
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const GeneratePeriods = Form.create()(GeneratePeriodsForm);
export default GeneratePeriods;

