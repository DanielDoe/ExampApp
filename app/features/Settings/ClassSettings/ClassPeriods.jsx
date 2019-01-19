import React from 'react';
import { TimePicker, Col, Row, Form, Icon, Input, Button } from 'antd';
import { Constants } from '../_helpers/constants';
import moment from 'moment';
import '../settings.css';
import { getSelector } from '../../_shared/services/dataService';

const FormItem = Form.Item;

function onChange(time, timeString) {
    console.log(time, timeString);
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ClassSettingsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            field: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { setFieldsValue } = this.props.form;
        getSelector('class_period').map((element, id) => {
            const fieldId = `start-${id}`;
            const endId = `end-${id}`;
            setFieldsValue({
                [`start-${id}`]: moment(element.start, 'HH:mm A'),
                [`end-${id}`]: moment(element.end, 'HH:mm A')
            });
        });
    }

    fieldChanged(timestring, field) {
		const { setFieldsValue } = this.props.form;
		const fieldSplit = field.split('-');
		const element = Number.parseInt(fieldSplit[1], 10);
		if (element === 0) {
			// Element is default. Apply to all in the selected value 😎
			for (let i = element + 1; i < Constants.days.length; i += 1) {
				setFieldsValue({
					[`${fieldSplit[0]}-${i}`]: timestring
				});
			}
		} else {
			// Set that particular field only
			setFieldsValue({ [field]: timestring });
		}
	}
    
    handleSubmit = (e) => {
        e.preventDefault();
    
        this.props.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
            let elements = [];
            const result = Object.entries(fieldsValue).forEach(([key, value], id) => { elements.push({ name: key.split('-')[0], value: moment(value).format('HH:mm A') })});
            const start = elements.filter(element => element.name === 'start');
            const end = elements.filter(element => element.name === 'end');

          const duration: Object = {
            // date: values['date-picker'],
            days: Constants.days,
            start: start.map(elem => elem.value),
            end: end.map(elem => elem.value)
        };
        this.props.onPeriodsAdded(duration);
        });
      }

    // this checks the form validation  
    hasErrors(fieldsError) {
        const fromAnt = (Object.keys(fieldsError).some(field => fieldsError[field]));
        return fromAnt;
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue, setFieldsValue} = this.props.form;

        const renderPeriods = () => {
            return Constants.days.map((element, id) => {
                const key: string = `title-${id}`;
                const fieldId: string = `start-${id}`;
                const endId: string = `end-${id}`;

                return (
                    <div key={key}>
                        <Row>
                            <Col span={8} className="classCol">
                                <p className="classPickerText">{element}</p>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    style={{ marginBottom: '5px' }}
                                    >
                                    {getFieldDecorator(fieldId, {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <TimePicker 
                                            className="classTimepicker"
                                            use12Hours 
                                            format="h:mm A"
                                            onChange={moment => this.fieldChanged(moment, fieldId)}
                                            size="large" />    
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    style={{ marginBottom: '5px' }}
                                    // validateStatus={userNameError ? 'error' : ''}
                                    // help={userNameError || ''}
                                    >
                                    {getFieldDecorator(endId, {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <TimePicker 
                                            className="classTimepicker" 
                                            use12Hours 
                                            format="h:mm A" 
                                            onChange={moment => this.fieldChanged(moment, endId)}
                                            size="large" />    
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                );
            });
        }

        return (
            <div className="class-container">
                <div className="class-period-container">
                    <div className="period-container">
                        <Form onSubmit={this.handleSubmit}>
                            <p className="labelText">What time do Lectures start and end?</p>
                            <hr />
                                {renderPeriods()}
                            <div className="savedButton">
                            <Button 
                                type="primary" 
                                size={'large'}  
                                style={{width: '150px', marginBottom: '10px'}}
                                htmlType="submit" 
                                disabled={this.hasErrors(getFieldsError())}
                                >Save</Button>
                            </div>  
                        </Form>  
                    </div>
                </div>  
            </div>
        );
    }
}

const ClassPeriods = Form.create()(ClassSettingsForm);
export default ClassPeriods;