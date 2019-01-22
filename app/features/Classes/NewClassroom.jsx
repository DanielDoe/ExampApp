import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Select, InputNumber, Row, Col } from 'antd';
import { getSelector } from '../_shared/services/dataService';


const FormItem = Form.Item;
const Option = Select.Option;

class NewClassroomForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 1
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
            this.props.form.setFieldsValue({
                session: nextProps.fieldData.session_count,
                snack: nextProps.fieldData.snack_count,
                // lunch: nextProps.fieldData.lunch_count
            });
            this.setState({ counter: -1 });
          }
    }

    // reset form data when submitted
    handleReset = () => {
        this.props.form.resetFields();
        this.setState({ counter: 1 });   
    }

    indexError = () => {
        console.log('Error with class name ');
    }

    // function called when the button is selected    
    handleSubmit = (e) => {
        e.preventDefault();
		this.props.form.validateFields((err, values) => {
            const id = (this.props.editMode) ? this.props.id : -1;

            let hasError: boolean = false;
            this.props.classes.forEach((classroom: Object) => {
                if (
                classroom.session_count === values.session &&
                this.props.editMode === false
                ) {
                hasError = true;
                }
            });

            if (hasError) {
                this.indexError();
                return;
            }

            const cashItem = getSelector('cash_item');
            console.log(cashItem);
            const snackPrice = cashItem.filter(item => item.item === "Snack")[0].item_amount;
            // const lunchPrice = cashItem.filter(item => item.item === "Lunch")[0].item_amount;

			if (!err) {
                const classDetail: Object = {
                    id: this.props.id,
                    session_count: values.session,
                    snack_count: values.snack,
                    amount: values.snack * snackPrice,
                    // lunch_count: values.lunch
                };
                // console.log(classDetail);
                this.props.onClassEditted(classDetail);
            }

            // const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
            this.handleReset();
		});
    }


    // this checks the form validation  
    hasErrors(fieldsError) {
        const fromAnt = (Object.keys(fieldsError).some(field => fieldsError[field]));
        return fromAnt;
    }

    renderCancel() {
        return this.props.editMode === false ? null : (
          <button
            type="button"
            style={{ margin: '0px auto', width: '100%' }}
            onClick={() => {
              this.props.onCancel();
              this.handleReset();
            }}
          >
            Cancel
          </button>
        );
    }

    render() {
        const header: string = (this.props.editMode) ? 'Edit' : 'New';
        const buttonText: string = (this.props.editMode) ? 'Edit' : 'Add';

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const classNameError = isFieldTouched('session') && getFieldError('session');
        const classSizeError = isFieldTouched('snack') && getFieldError('snack'); 
        // const examsError = isFieldTouched('lunch') && getFieldError('lunch');
        // const othersError = getFieldError('otherSize');   

        const className = getFieldValue('session');
        const classSize = getFieldValue('snack');
        // const examSize = getFieldValue('lunch');

        // const isEmpty = !className || !classSize || examSize;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="column new-classroom">
                <h2>{header} Meals config</h2>
                    <label htmlFor="new-classroom-name">Session</label>
                    <FormItem 
                        style={{textAlign: '-webkit-center'}}
                        hasFeedback  
                        // label="Username"
                        validateStatus={classNameError ? 'error' : ''}
                        help={classNameError || ''}
                    >
                        {getFieldDecorator('session', {
                            rules: [{ required: true,  type: 'number', message: 'enter session!' }],
                        })(
                            <InputNumber min={1} max={5} style={{ width: '100%' }} placeholder="e.g. " />
                        )}
                    </FormItem>
                        <label htmlFor="new-classroom-std-cap">Amount</label>
                            <FormItem 
                                // style={{textAlign: '-webkit-center'}}
                                hasFeedback
                                validateStatus={classSizeError ? 'error' : ''}
                                help={classSizeError || ''}
                            >
                                {getFieldDecorator('snack', {
                                    rules: [{
                                        required: true, type: 'number', message: 'snack amount!',
                                    }],
                                })(
                                    <InputNumber min={0} max={5} style={{ width: '100%', marginRight:'0.5rem' }} placeholder="e.g. 50" />
                                )}
                            </FormItem>   
                    <FormItem>
                        <Button 
                            type="primary" 
                            size={'large'} 
                            // className="" 
                            style={{ margin: '20px auto', width: '100%', backgroundColor: '' }}
                            htmlType="submit" 
                            disabled={this.hasErrors(getFieldsError())}>{buttonText} meal amount</Button>
                    </FormItem>
                    {this.renderCancel()}
                </Form>
            </div> 
        );
    }
}

export const NewClassroom = Form.create()(NewClassroomForm);

NewClassroom.defaultProps = {
    id: -1,
    name: '',
    classSize: '',
    otherSize: ''
};

NewClassroom.propTypes = {
    // Edit configuration
    editMode: PropTypes.bool.isRequired,
    id: PropTypes.number,
    name: PropTypes.string,
    classSize: PropTypes.string,
    otherSize: PropTypes.string,

    onClassEditted: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};