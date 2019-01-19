import React from 'react';
import { Form, Button, TimePicker, Select, Row, Col, DatePicker } from 'antd';
import { Constants } from '../_helpers/constants';

const FormItem = Form.Item;
const Option = Select.Option;

class NoExamsForm extends React.Component {

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // To disabled submit button at the beginning and checks validations.
        this.props.form.validateFields();
    }


    handleSubmit = (e) => {
        e.preventDefault();
    
        this.props.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
    
          // Should format date value before submit.
          const values = {
            ...fieldsValue,
            'date-picker': fieldsValue['date'].format('YYYY-MM-DD'),
            'start-picker': fieldsValue['start'].format('HH:mm A'),
            'end-picker': fieldsValue['end'].format('HH:mm A'),
          };
          const examexception: Object = {
            date: values['date-picker'],
            start: values['start-picker'],
            end: values['end-picker']
        };
        this.props.onExceptionEditted(examexception);
        });

        this.handleReset();
      }

    // reset form data when submitted
    handleReset = () => {
        this.props.form.resetFields();
    }  

    // this checks the form validation  
    hasErrors(fieldsError) {
        const fromAnt = (Object.keys(fieldsError).some(field => fieldsError[field]));
        return fromAnt;
    }

    // No reference to the state, thus, we will not bind to this
    renderCancel() {
        return (this.props.editMode === false) ? null :
            <button type="button" onClick={this.props.onCancel}>Cancel</button>;
    }

    renderDays() {
        return Constants.days.map(day => {
            return <Option value={day} key={`title-${day}`}>{day}</Option>;
        });
    }

  render() {
    const headerText: string = (this.props.editMode) ? 'Edit' : 'New';
    const buttonText: string = (this.props.editMode) ? 'Edit' : 'Add';  
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;

    const daysError = isFieldTouched('date') && getFieldError('date');   
    const startError = isFieldTouched('start') && getFieldError('start');   
    const endError = isFieldTouched('end') && getFieldError('end');  
    
    const day = getFieldValue('date');
    const start = getFieldValue('start');
    const end = getFieldValue('end');

    const isEmpty = !day || !start || !end;
    return (
        <div style={{ margin: '5px' }}>
            <Form onSubmit={this.handleSubmit} className="modifyExcept">
            <h2 className="exceptionh2">{headerText} Exception</h2>
                <div className="form-content">
                    <FormItem
                        hasFeedback  
                        validateStatus={daysError ? 'error' : ''}
                        help={daysError || ''}
                        >
                            {getFieldDecorator('date', {
                                rules: [
                                    { required: true, message: 'Please select a valid day' },
                                ],
                            })(
                                <DatePicker style={{ width: '100%' }} />
                            )}
                        </FormItem>
                    <FormItem
                        hasFeedback  
                        validateStatus={startError ? 'error' : ''}
                        help={startError || ''}
                        >
                            {getFieldDecorator('start', {
                                rules: [
                                    { required: true, message: 'Please select a valid title' },
                                ],
                            })(
                            <TimePicker className="exceptionTimepicker" use12Hours format="h:mm A" size="large" />
                            )}
                    </FormItem>
                    <FormItem
                        hasFeedback
                        validateStatus={endError ? 'error' : ''}
                        help={endError || ''}
                        >
                            {getFieldDecorator('end', {
                                rules: [
                                    { required: true, message: 'Please select a valid end' },
                                ],
                            })(
                            <TimePicker className="exceptionTimepicker" use12Hours format="h:mm A" size="large" />
                            )}
                    </FormItem>
                    <FormItem>
                        <Button 
                            type="primary" 
                            size={'large'} 
                            className="add-exception-button"
                            htmlType="submit" 
                            disabled={this.hasErrors(getFieldsError()) || isEmpty}>
                            {buttonText} Exception
                        </Button>
                    </FormItem>
                </div>
            </Form>
        </div>
    );
  }
}

const NoExams = Form.create()(NoExamsForm);
export default NoExams;
