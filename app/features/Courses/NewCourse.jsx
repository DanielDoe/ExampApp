import React from 'react';
import PropTypes from 'prop-types';
import { getSelector, getElementId, getNameById } from '../_shared/services/dataService';
import { Form, Icon, Input, Button, Select, InputNumber, Row, Col, DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

let lecturerId = [];
let programId = null;

function onChange(date, dateString) {
    // console.log(date, dateString);
}

function handleChange(value) {
    // console.log(`selected ${value}`);
  }
  
  function handleBlur() {
    // console.log('blur');
  }
  
  function handleFocus() {
    // console.log('focus');
  }

class NewCourseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 1,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
		// To disabled submit button at the beginning and checks validations.
        this.props.form.validateFields();
    }
    
    componentWillReceiveProps(nextProps) {
        if (
            Object.keys(nextProps.fieldData).length !== 0 &&
            nextProps.editMode === true &&
            this.state.counter > 0
          ) {
            const data = nextProps.fieldData.program;  
            this.props.form.setFieldsValue({
                staff: nextProps.fieldData.p_id,
                period: nextProps.fieldData.period,
                start: moment(nextProps.fieldData.start, 'HH:mm A'),
                end: moment(nextProps.fieldData.end, 'HH:mm A'),
                date: moment(nextProps.fieldData.date, 'LL')
            });
            this.setState({ counter: -1 });
          }
    }

    // reset form data when submitted
    handleReset = () => {
        this.props.form.resetFields();
    }

    indexError = () => {
        console.log('Error with class name ');
    }
    // this checks the form validation  
    hasErrors(fieldsError) {
        const fromAnt = (Object.keys(fieldsError).some(field => fieldsError[field]));
        return fromAnt;
    }

    
    // function called when the button is selected    
    handleSubmit = (e) => {
        e.preventDefault();
		this.props.form.validateFields((err, fieldsValue) => {
            const id = (this.props.editMode) ? this.props.id : -1;

            let hasError: boolean = false;
            this.props.courses.forEach((course: Object) => {
                if (
                course.staff === fieldsValue.staff &&
                course.period === fieldsValue.period &&
                this.props.editMode === false
                ) {
                hasError = true;
                }
            });

            if (hasError) {
                this.indexError();
                return;
            }

            const values = {
                ...fieldsValue,
                'date': fieldsValue['date'].format('LL'),
                'start': fieldsValue['start'].format('HH:mm A'),
                'end': fieldsValue['end'].format('HH:mm A'),
            };

            const start = moment(values['start'], "HH:mm A");
            const end = moment(values['end'], "HH:mm A");

            const minutes = moment.duration(end.diff(start)).asMinutes();

			if (!err) {
                const course: Object = {
                    session_id: values.session_id,
                    date: values['date'],
                    // name: getElementId(fieldsValue.name, 'personnel'),
                    p_id: getElementId(fieldsValue.staff, 'personnel')[0].p_id,
                    // code: values.code.trim().toUpperCase(),
                    // hasLab: (values.hasLab === 'yes') ? 1 : 0,
                    start: values['start'],
                    end: values['end'],
                    period: values.period,
                    duration_mins: minutes
                };
                this.props.onCourseEditted(course);
            }

            // const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
            this.handleReset();
		});
    }  
    
    // No reference to the state, thus, we will not bind to this
    renderCancel() {
        return this.props.editMode === false ? null : (
          <button
            type="button"
            style={{ margin: '20px auto', width: '100%' }}
            onClick={() => {
              this.props.onCancel();
              this.handleReset();
            }}
          >
            Cancel
          </button>
        );
    } 

    renderStaffData = () => {
        const staff = getSelector('personnel').map((element) => {
            // console.log(element.name);
            return <Option value={element.name} key={element.p_id}>{element.name}</Option>;
        });

        return staff;
    }

    render() {
        const headerText: string = (this.props.editMode) ? 'Edit' : 'New';
        const buttonText: string = (this.props.editMode) ? 'Edit' : 'Add';

        // This variables are used for the form validations 
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
        const dateError = isFieldTouched('date') && getFieldError('date');
        const nameError = isFieldTouched('staff') && getFieldError('staff');
        const startError = isFieldTouched('start') && getFieldError('start');
        const endError = isFieldTouched('end') && getFieldError('end');
        const periodError = isFieldTouched('period') && getFieldError('period'); 

        const date = getFieldValue('date');
        const name = getFieldValue('staff');
        const start = getFieldValue('start');
        const end = getFieldValue('end');
        const period = getFieldValue('period');

        const isEmpty = !name || !date || !start || !end || !period;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="new-course column">
                    <h2>{headerText} Allocation</h2>
                    <label htmlFor="new-course-surname">Date</label>
                        <FormItem 
                            style={{ textAlign: '-webkit-center' }}
                            hasFeedback  
                            className="date-element"
                            validateStatus={dateError ? 'error' : ''}
                            help={dateError || ''}
                        >
                            {getFieldDecorator('date', {
                                rules: [{ required: true, message: 'select date!' }],
                            })(
                                <DatePicker onChange={onChange} />
                            )}
                        </FormItem>
                        <label htmlFor="new-course-othernames">Staff member</label>
                        <FormItem 
                            style={{textAlign: '-webkit-center'}}
                            hasFeedback
                            validateStatus={nameError ? 'error' : ''}
                            help={nameError || ''}
                        >
                            {getFieldDecorator('staff', {
                                rules: [{ required: true, message: 'select name!' }],
                            })(
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {this.renderStaffData()}
                                </Select>,
                            )}
                        </FormItem>
                        <Row className="time-element">
                            <Col span={12}>
                                <label htmlFor="new-course-othernames">Start</label>
                                <FormItem 
                                    style={{textAlign: '-webkit-center', marginRight: '0.5rem'}}
                                    hasFeedback
                                    validateStatus={startError ? 'error' : ''}
                                    help={startError || ''}
                                >
                                    {getFieldDecorator('start', {
                                        rules: [{ required: true, message: 'start??' }],
                                    })(
                                        <TimePicker 
                                            // onChange={onChange} 
                                            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <label htmlFor="new-course-othernames">End</label>
                                <FormItem 
                                    style={{textAlign: '-webkit-center', marginLeft: '0.5rem'}}
                                    hasFeedback
                                    validateStatus={endError ? 'error' : ''}
                                    help={endError || ''}
                                >
                                    {getFieldDecorator('end', {
                                        rules: [{ required: true, message: 'end??' }],
                                    })(
                                        <TimePicker 
                                        // onChange={onChange} 
                                        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                                    )}
                                </FormItem>        
                            </Col>
                        </Row>
                        <label htmlFor="new-course-othernames">Session</label>
                        <FormItem
                            hasFeedback
                            validateStatus={periodError ? 'error' : ''}
                            help={periodError || ''}
                        >
                            {getFieldDecorator('period', {
                                rules: [
                                    { required: true, message: 'session?' },
                                ],
                            })(
                                <Select
                                    // className="form-input"
                                    placeholder="e.g. Morning"
                                >
                                    <Option value="morning">Morning</Option>
                                    <Option value="afternoon">Afternoon</Option>
                                    <Option value="evening">Evening</Option>
                                </Select>
                            )}
                        </FormItem>
                    <FormItem>
                        <Button 
                            type="primary" 
                            size={'large'} 
                            // className="" 
                            style={{ margin: '20px auto', width: '100%' }}
                            htmlType="submit" 
                            disabled={this.hasErrors(getFieldsError()) || isEmpty}
                            >
                                {buttonText} allocation
                            </Button>
                    </FormItem>
                    {this.renderCancel()}
                </Form>
            </div>    
        );
    }
}

export const NewCourse = Form.create()(NewCourseForm);

NewCourse.defaultProps = {
    id: -1,
    
};

NewCourse.propTypes = {
    // Edit configuration
    editMode: PropTypes.bool.isRequired,
    id: PropTypes.number,
    name: PropTypes.string,
    department: PropTypes.string,
    lecturer: PropTypes.string,

    onCourseEditted: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
