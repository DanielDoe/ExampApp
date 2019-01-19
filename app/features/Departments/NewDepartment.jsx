import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd';
import { getCollege, getSelector, getElementId, getNameById } from '../_shared/services/dataService';

const FormItem = Form.Item;
const Option = Select.Option;
let colleges = [];
let collegeId = null;

class NewDepartmentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 1,
            college_id: null,
            colleges: []
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
            const college = getNameById(nextProps.fieldData.college_id, 'college')[0].name;
            this.getCollegeId(college);
            this.props.form.setFieldsValue({
                name: nextProps.fieldData.name,
                college 
            });
            this.setState({ counter: -1 });
          }
    }

    // reset form data when submitted
    handleReset = () => {
        this.props.form.resetFields();
        this.setState({ counter: 1 })
    }

    indexError = () => {
        console.log('Error with class name ');
    }

    // department generator
    // This will render the list of college to be displayed 
    renderCollege(){
        const collegeData = getSelector('college').map((element) => {
            return <Option value={element.name} key={element.id}>{element.name}</Option>;
        });

        colleges = collegeData;

        return collegeData;
    }

    getCollegeId(value){
        collegeId = getElementId(value, 'college')[0].id; 
        console.log(collegeId);
    }


    // function called when the button is selected    
    handleSubmit = (e) => {
        e.preventDefault();
		this.props.form.validateFields((err, values) => {
            const id = (this.props.editMode) ? this.props.id : -1;

            let hasError: boolean = false;
            this.props.departments.forEach((department: Object) => {
                if (
                department.name === values.name &&
                this.props.editMode === false
                ) {
                hasError = true;
                }
            });

            if (hasError) {
                this.indexError();
                return;
            }

			if (!err) {
                const Department: Object = {
                    id: this.props.id,
                    name: values.name.trim().toUpperCase(),
                    college_id: collegeId
                };
                this.props.onDepartmentEditted(Department);
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

    render() {
        const headerText: string = (this.props.editMode) ? 'Edit' : 'New';
        const buttonText: string = (this.props.editMode) ? 'Edit' : 'Add';

        // This variables are used for the form validations 
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
        const nameError = isFieldTouched('name') && getFieldError('name');    
        const collegeError = isFieldTouched('college') && getFieldError('college');

        const name = getFieldValue('name');
        const college = getFieldValue('college');

        const isEmpty = !name || !college;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="new-department column">
                    <h2>{headerText} Department</h2>
                    <label htmlFor="new-department-surname">College</label>
                    <FormItem 
                        style={{textAlign: '-webkit-center'}}
                        hasFeedback  
                        validateStatus={nameError ? 'error' : ''}
                        help={nameError || ''}
                    >
                        {getFieldDecorator('college', {
                            rules: [{ required: true, message: 'Please input your surname!' }],
                        })(
                            <Select
                                // className="form-input"
                                placeholder="e.g. Engineering"
                                onChange={this.getCollegeId}
                            >
                                {this.renderCollege()}
                            </Select>
                        )}
                    </FormItem>
                    <label htmlFor="new-department-surname">Department Name</label>
                    <FormItem 
                        style={{textAlign: '-webkit-center'}}
                        hasFeedback  
                        validateStatus={nameError ? 'error' : ''}
                        help={nameError || ''}
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your surname!' }],
                        })(
                            <Input placeholder="e.g. Computer" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button 
                            type="primary" 
                            size={'large'} 
                            style={{ margin: '2rem auto 0rem auto', width: '100%' }}
                            htmlType="submit" 
                            disabled={this.hasErrors(getFieldsError()) || isEmpty}>{buttonText} Department</Button>
                    </FormItem>
                    {this.renderCancel()}
                    <FormItem>
                        <Button 
                            type="primary" 
                            size={'large'} 
                            style={{ margin: '1rem auto 0rem auto', width: '100%' }}
                            // htmlType="submit" 
                            disabled={this.hasErrors(getFieldsError()) || isEmpty}>Import Department</Button>
                    </FormItem>
                </Form>
            </div>    
        );
    }
}

export const NewDepartment = Form.create()(NewDepartmentForm);

NewDepartment.defaultProps = {
    id: -1
};

NewDepartment.propTypes = {
    // Edit configuration
    editMode: PropTypes.bool.isRequired,
    id: PropTypes.number,
    surname: PropTypes.string,
    otherNames: PropTypes.string,
    title: PropTypes.string,

    onDepartmentEditted: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
