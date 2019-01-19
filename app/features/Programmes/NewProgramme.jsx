import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, InputNumber, Select, Modal, Row, Col, notification } from 'antd';
import { getSelector, getElementId, getNameById } from '../_shared/services/dataService';
import ClassConfig from './ClassConfig';

const FormItem = Form.Item;
const Option = Select.Option;

let department = [];
let departmentId = null;
let modalData = {};
let modalStatus = true;

class NewProgrammeForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 1,
            visible: false,
            loading: false,
            status: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSubmitStatus = this.onSubmitStatus.bind(this);
    }

    componentDidMount() {
		// To disabled submit button at the beginning and checks validations.
        this.props.form.validateFields();
        // console.log(this.onSubmitStatus());
    }
    
    componentWillReceiveProps(nextProps) {
        // console.log(this.onSubmitStatus());
        if (
            Object.keys(nextProps.fieldData).length !== 0 &&
            nextProps.editMode === true &&
            this.state.counter > 0
          ) {
            const department = getNameById(nextProps.fieldData.department, 'department')[0].name;
            // console.log(department);
            this.getDepartmentId(department);
            console.log(console.log(nextProps.fieldData));  
            this.props.form.setFieldsValue({
                name: nextProps.fieldData.name,
                // department: getNameById(1, 'department'),
                department,
                code: nextProps.fieldData.code,
                start: nextProps.start,
                end: nextProps.fieldData.end
            });
            this.setState({ counter: -1 });
          }
    }

    onSubmitStatus = status => {
        // if(Object.keys(status).length !== 0 && this.state.statusCounter > 0){
        //     const result = status.map()
        // }
        console.log(status.splice(-1, 1));
    }

    // 💪 this will return the id of selected department
    getDepartmentId(value){
        departmentId = getElementId(value, 'department')[0].id; 
    }

    // function called when the button is selected    
    handleSubmit = (e) => {
        e.preventDefault();
		this.props.form.validateFields((err, values) => {
            const id = (this.props.editMode) ? this.props.id : -1;
            modalData = values; 
            let hasError: boolean = false;
            this.props.programmes.forEach((programme: Object) => {
                if (
                programme.name === values.name &&
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
                const programme: Object = {
                    id: this.props.id,
                    name: values.name.trim().toUpperCase(),
                    department: departmentId,
                    code: values.code.trim().toUpperCase(),
                    start: values.start,
                    end: values.end
                };
                this.setState({
                    visible: true,
                });
                this.props.onProgrammeEditted(programme);
            }
            this.handleReset();
		});
    }


    // this checks the form validation  
    hasErrors(fieldsError) {
        const fromAnt = (Object.keys(fieldsError).some(field => fieldsError[field]));
        return fromAnt;
    }

    // reset form data when submitted
    handleReset = () => {
        this.props.form.resetFields();
        this.setState({ counter: 1 }); 
    }

    indexError = () => {
        console.log('Error with class name ');
    }
    
    handleOk = (e) => {
        // console.log(e);
        this.setState({
          visible: false,
        });

        this.setState({ loading: true });
        setTimeout(() => {
        this.setState({ loading: false, visible: false });
        }, 1000);

        setTimeout(() => {
            notification['success']({
                message: `${modalData.name} & ${modalData.name} Classes added Successfully`,
                description: `You have successfully added ${modalData.name} and ${modalData.name} classes.`,
              });
          }, 1000);
      }

      handleCancel = (e) => {
        // console.log(e);
        this.setState({
          visible: false,
        });
      }

      
    //   console.log(onSubmitStatus);

    // this will render list of departments
    renderDepartment() {
        const departmentData = getSelector('department').map((element) => {
            return <Option value={element.name} key={element.id}>{element.name}</Option>;
        });

        department = departmentData;

        return departmentData;
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
        const { visible, loading } = this.state;

        // 
        // console.log(onSubmitStatus);
        // This variables are used for the form validations 
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
        const nameError = isFieldTouched('name') && getFieldError('name');   
        const programmeError = isFieldTouched('department') && getFieldError('department');  
        const codeError = isFieldTouched('code') && getFieldError('code');
        const startError = isFieldTouched('start') && getFieldError('start');
        const endError = isFieldTouched('end') && getFieldError('end');  

        const name = getFieldValue('name');
        const depart = getFieldValue('department');
        const code = getFieldValue('code');
        const start = getFieldValue('start');
        const end = getFieldValue('end');

        const isEmpty = !name || !depart || !code || !end || !start;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="new-programme column">
                    <h2>{headerText} Programme</h2>
                    <label htmlFor="new-programme-surname">Programme Name</label>
                    <FormItem 
                        style={{textAlign: '-webkit-center'}}
                        hasFeedback  
                        validateStatus={nameError ? 'error' : ''}
                        help={nameError || ''}
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Programme name??' }],
                        })(
                            <Input  placeholder="e.g. Computer" />
                        )}
                    </FormItem>
                    <label htmlFor="new-programme-surname">Programme code</label>
                    <FormItem 
                        style={{textAlign: '-webkit-center'}}
                        hasFeedback  
                        validateStatus={codeError ? 'error' : ''}
                        help={codeError || ''}
                    >
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: 'Programme code?? ' }],
                        })(
                            <Input  placeholder="e.g. COE" />
                        )}
                    </FormItem>
                    <label htmlFor="new-department-othernames">Associated Department</label>
                    <FormItem 
                        style={{textAlign: '-webkit-center'}}
                        hasFeedback
                        validateStatus={programmeError ? 'error' : ''}
                        help={programmeError || ''}
                    >
                        {getFieldDecorator('department', {
                            rules: [{ required: true, message: 'Associated programme!' }],
                        })(
                            <Select 
                                placeholder="e.g. Computer"
                                onChange={this.getDepartmentId}
                            >
                                {this.renderDepartment()}
                            </Select>
                        )}
                    </FormItem>
                    <label htmlFor="new-programme-surname" style={{paddingBottom: '0.1rem'}}>Programme duration e.g. 1-4years</label>
                    <Row>
                        <Col span={11}>
                            <label htmlFor="new-programme-surname">Start</label>
                            <FormItem 
                                style={{textAlign: '-webkit-center'}}
                                hasFeedback  
                                validateStatus={startError ? 'error' : ''}
                                help={startError || ''}
                            >
                                {getFieldDecorator('start', {
                                    rules: [{ required: true, message: 'Programme start year??!' }],
                                })(
                                    <InputNumber  
                                        placeholder="e.g. COE" 
                                        max={1}
                                        min={1}
                                        style={{ width: '100%' }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <label htmlFor="new-programme-surname">End</label>
                            <FormItem 
                                style={{textAlign: '-webkit-center'}}
                                hasFeedback  
                                validateStatus={endError ? 'error' : ''}
                                help={endError || ''}
                            >
                                {getFieldDecorator('end', {
                                    rules: [{ required: true, message: 'Programme end year??!' }],
                                })(
                                    <InputNumber 
                                        placeholder="e.g. COE"
                                        max={7}
                                        style={{ width: '100%' }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem>
                        <Button 
                            type="primary" 
                            size={'large'} 
                            // className="" 
                            style={{ margin: '20px auto', width: '100%' }}
                            htmlType="submit" 
                            // disabled={this.hasErrors(getFieldsError()) || isEmpty}
                            >{buttonText} programme</Button>
                    </FormItem>
                    {this.renderCancel()}
                </Form>
                <ClassConfig 
                    dataSource={modalData} 
                    visible={this.state.visible} 
                    handleCancel={this.handleCancel}
                    handleOk={this.handleOk}
                    buttonStatus={this.onSubmitStatus} />
                {/* <Modal
                    title={modalData.name}
                    visible={visible}
                    onOk={this.handleOk}
                    okText="Proceed"
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button 
                            key="submit" 
                            type="primary" 
                            // loading={loading} 
                            disabled={this.onSubmitStatus}
                            onClick={this.handleOk}>
                          Submit
                        </Button>,
                      ]}
                    >
                        
                </Modal> */}
            </div>    
        );
    }
}

export const NewProgramme = Form.create()(NewProgrammeForm);

NewProgramme.defaultProps = {
    name: '',
};

NewProgramme.propTypes = {
    // Edit configuration
    editMode: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    surname: PropTypes.string,
    otherNames: PropTypes.string,
    title: PropTypes.string,

    onProgrammeEditted: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
