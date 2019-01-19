import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Select, Row, Col } from 'antd';
import { getSelector, getProgramByDepartment, getElementId, getNameById } from '../_shared/services/dataService';

const FormItem = Form.Item;
const Option = Select.Option;


let department = null;
let departmentId = null;
let courseId


class NewTeacherForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 1,
            departmentid: null,
            member: null,
            program: null,
            department: null,

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.getDepartmentId = this.getDepartmentId.bind(this);
        // this.getProgramId = this.getProgramId.bind(this);
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
                name: nextProps.fieldData.name,
                member: nextProps.fieldData.member,
                status: nextProps.fieldData.status,
                // program: getNameById(nextProps.fieldData.program, 'program')[0].name,
                // department: getNameById(nextProps.fieldData.department, 'department')[0].name
            });
            this.setState({ counter: -1 });
          }
    }


    // 💪 this will return the id of selected department
    // getDepartmentId(value){
    //     this.setState({
    //         departmentid: getElementId(value, 'department')[0].id,
    //         department: value
    //     });
    // }

    // // 💪 this will return the id of selected department
    // getProgramId(value){
    //     // departmentId = getElementId(value, 'program')[0].id;
    //     this.setState({
    //         program: getElementId(value, 'program')[0].id
    //     }); 
    // }

    // reset form data when submitted
    handleReset = () => {
        this.props.form.resetFields();
        this.setState({ counter: 1 });
    }
    
    handleChange(value) {
        this.setState({ member: value });
      }

    // this checks the form validation  
    hasErrors(fieldsError) {
        const fromAnt = (Object.keys(fieldsError).some(field => fieldsError[field]));
        return fromAnt;
    }

    
    // return something when the same lecturer is added
    indexError = () => {
        console.log('Error with Lecturer name ');
    }

    // function called when the button is selected    
    handleSubmit = (e) => {
        e.preventDefault();
		this.props.form.validateFields((err, values) => {
            const id = (this.props.editMode) ? this.props.id : -1;
            // console.log(values);
            let hasError: boolean = false;
            this.props.teachers.forEach((teacher: Object) => {
                if (
                teacher.name === values.name &&
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
                const teacher: Object = {
                    id: this.props.id,
                    name: values.name,
                    member: values.member,
                    status: values.status,
                    // member: this.state.member,
                    // status: this.state.status
                };
                console.log(teacher);
                this.props.onTeacherEditted(teacher);
            }
            this.handleReset();
		});
    }

    // this will render list of departments
    renderDepartment() {
        const departmentData = getSelector('department').map((element) => {
            return <Option value={element.name} key={element.id}>{element.name}</Option>;
        });

        // department = departmentData;

        return departmentData;
      }

    renderprogram(){
        // console.log(this.state.departmentid);
        if (this.state.department !== null) {
        const programData = (getProgramByDepartment(getElementId(this.state.department, 'department')[0].id)).map(element => element.name);
        return programData.map(element => { 
            return <Option value={element} key={element}>{element}</Option>;
        });
        }
        return null;
    }  

    // This will render the list of titles to be displayed 
    renderTitles(){
        const titles = ['Dr', 'Mr', 'Mrs', 'Miss', 'Prof', 'Rev'];
        return titles.map((title) => {
            return <Option value={title} key={`title-${title}`}>{title}</Option>;
        });
    } 

    // This will display the list of members
    renderMembers(){
        const memTypes = ['Invigilator', 'Coordinator', 'Security', 'Nurse', 'Support Team'];
        return memTypes.map((member) => {
            return <Option value={member} key={`title-${member}`}>{member}</Option>;
        });
    }

    renderStatus(){
        const memTypes = ['Non-senior member', 'Senior member'];
        return memTypes.map((member) => {
            return <Option value={member} key={`title-${member}`}>{member}</Option>;
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

    render() {
        const headerText: string = (this.props.editMode) ? 'Edit' : 'New';
        const buttonText: string = (this.props.editMode) ? 'Edit' : 'Add';

        // This variables are used for the form validations 
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const nameError = isFieldTouched('name') && getFieldError('name');
        // const staffIDError = isFieldTouched('staff') && getFieldError('staff'); 
        const memTyError = isFieldTouched('member') && getFieldError('member'); 
        // const titleError = isFieldTouched('title') && getFieldError('title');
        const statusError = isFieldTouched('status') && getFieldError('status');   

        const name = getFieldValue('name');
        // const otherNames = getFieldValue('othername');
        const depart = getFieldValue('member');
        const status = getFieldValue('status');
        // const title = getFieldValue('title');

        const isEmpty = !name || !status || !depart;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="new-teacher column">
                    <h2>{headerText} staff members</h2>
                    {/* <label htmlFor="new-teacher-title">Title</label> */}
                    {/* <FormItem
                        hasFeedback
                        validateStatus={titleError ? 'error' : ''}
                        help={titleError || ''}
                    >
                        {getFieldDecorator('title', {
                            rules: [
                                { required: true, message: 'Please select a valid title' },
                            ],
                        })(
                            <Select
                                placeholder="e.g. Mr."
                            >
                                {this.renderTitles()}
                            </Select>
                        )}
                    </FormItem>
                    <label htmlFor="new-teacher-othernames">Staff ID</label>
                    <FormItem 
                        style={{textAlign: '-webkit-center'}}
                        hasFeedback
                        // label="Username"
                        validateStatus={staffIDError ? 'error' : ''}
                        help={staffIDError || ''}
                    >
                        {getFieldDecorator('staff', {
                            rules: [{ required: true, message: 'Please input your other names!' }],
                        })(
                            <Input placeholder="Doe" />
                        )}
                    </FormItem> */}
                    <label htmlFor="new-teacher-surname">Staff name</label>
                    <FormItem 
                        style={{textAlign: '-webkit-center'}}
                        hasFeedback  
                        validateStatus={nameError ? 'error' : ''}
                        help={nameError || ''}
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your surname!' }],
                        })(
                            <Input placeholder="Dr. D. John" />
                        )}
                    </FormItem>
                    <Row>
                        <Col span={12}>
                        <label htmlFor="new-teacher-othernames">Member Type</label>
                        <FormItem 
                            style={{textAlign: '-webkit-center', marginRight: '0.5rem'}}
                            hasFeedback
                            // label="Username"
                            validateStatus={memTyError ? 'error' : ''}
                            help={memTyError || ''}
                        >
                            {getFieldDecorator('member', {
                                rules: [{ required: true, message: 'Please input your other names!' }],
                            })(
                                <Select
                                    // className="form-input"
                                    onChange={this.handleChange}
                                    placeholder="Invigilator"
                                >
                                    {this.renderMembers()}
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                        <Col span={12}>
                        <label htmlFor="new-teacher-othernames">status</label>
                        <FormItem 
                            style={{textAlign: '-webkit-center', marginLeft: '0.5rem'}}
                            hasFeedback
                            // label="Username"
                            validateStatus={statusError ? 'error' : ''}
                            help={statusError || ''}
                        >
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: 'Please input your other names!' }],
                            })(
                                <Select
                                    // className="form-input"
                                    onChange={this.getProgramId}
                                    placeholder="Senior"
                                >
                                    {this.renderStatus()}
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                    </Row>
                    <FormItem>
                        <Button 
                            type="primary" 
                            size={'large'} 
                            style={{ margin: '20px auto', width: '100%' }}
                            htmlType="submit" 
                            disabled={this.hasErrors(getFieldsError()) || isEmpty}>{buttonText} member</Button>
                    </FormItem>
                    <FormItem>
                        <Button 
                            type="primary" 
                            size={'large'} 
                            style={{ margin: '20px auto', width: '100%' }}
                            htmlType="submit" 
                            onClick={() => this.props.onListUpload(this.state.member)}
                            disabled={!depart}
                            > Import</Button>
                    </FormItem>
                    {this.renderCancel()}
                </Form>
            </div>    
        );
    }
}

export const NewTeacher = Form.create()(NewTeacherForm);

NewTeacher.defaultProps = {
    id: -1,
};

NewTeacher.propTypes = {
    // Edit configuration
    editMode: PropTypes.bool.isRequired,
    id: PropTypes.number,
    surname: PropTypes.string,
    otherNames: PropTypes.string,
    title: PropTypes.string,

    onTeacherEditted: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func,
    getFieldsError: PropTypes.func,
    getFieldError: PropTypes.func,
    isFieldTouched: PropTypes.func,
    getFieldValue: PropTypes.func

};
