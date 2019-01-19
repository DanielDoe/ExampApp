import React from 'react';
import {Form, Table, InputNumber, Input, Icon, Button, Row, Col, Modal} from 'antd';
// import EditableCell from './EditableCell';

const FormItem = Form.Item;
// let boolValues = true;
// let status = []; 
// let name = [];
// let bool = null;

function onChange(time, timeString) {
    console.log(time, timeString);
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class ClassConfigForm extends React.Component {
    constructor(props){
    super(props)
        // this.handleSelector = this.handleSelector.bind(this);
        this.state = {
          dataSource: [],
          status: true,
          visible: this.props.visible
        };

        this.state.dataSource = this.props.dataSource;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.dataSource
        });
    }

    fieldChanged(timestring, field) {
		const { setFieldsValue } = this.props.form;
		const fieldSplit = field.split('-');
		const element = Number.parseInt(fieldSplit[1], 10);
		if (element === 0) {
			// Element is default. Apply to all in the selected value 😎
			for (let i = element + 1; i < 3; i += 1) {
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
          console.log(fieldsValue);
          // Should format date value before submit.
          
        // this.props.onExceptionEditted(exception);
        });

        // this.handleReset();
      }

    handleCancel = (e) => {
    // console.log(e);
    this.setState({
        visible: false,
    });
    }

    handleOk = (e) => {
        // console.log(e);
        this.setState({
          visible: false,
        });
      }


    // this checks the form validation  
    hasErrors(fieldsError) {
        const fromAnt = (Object.keys(fieldsError).some(field => fieldsError[field]));
        return fromAnt;
    }

    render() {
        const { getFieldDecorator, getFieldsValue, getFieldValue} = this.props.form;
        let boolValues = false;
        let name = [];

        const renderPeriods = () => {
            for (let index = 0; index < this.state.dataSource.end; index++){
                name.push(`${this.state.dataSource.name}${index + 1}`);
                // console.log(name);
            }   

            return name.map((element, id) => {
                const key: string = `title-${id}`;
                const fieldId: string = `field${id}`;

                return (
                    <div key={key}>
                        <Row>
                            <Col span={12} className="classCol">
                                <p className="classPickerText">{element}</p>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    hasFeedback  
                                    // validateStatus={studentError ? 'error' : ''}
                                    // help={studentError || ''}
                                    style={{ marginBottom: '3px' }}
                                    >
                                    {getFieldDecorator(fieldId, {
                                        rules: [{ required: true, message: 'Please enter a valid number!' }],
                                    })(
                                           <InputNumber 
                                                placeholder="e.g. 100" 
                                                style={{ width: '100%' }} 
                                                // onChange={}
                                                />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                );
            });
        }

        const bool = Object.keys(getFieldsValue());
        // console.log(bool);
        bool.forEach((key, i) => {
            if (i === 0){
                boolValues = Boolean(getFieldValue(key));
            }else{
                boolValues = boolValues && Boolean(getFieldValue(key));
            }
        });
        
        const renderContent = () => { 
            return (
            <div className="class-container">
                <div className="class-period-container">
                    <div className="period-container">
                        <Form onSubmit={this.handleSubmit}>                            
                        {/* <div className="savedButton">
                        <Button 
                            type="primary" 
                            size={'large'}  
                            style={{width: '150px', marginBottom: '10px'}}
                            onClick={() => this.props.buttonStatus(true)}
                            htmlType="submit" 
                            disabled={status}
                            >Save</Button>
                        </div>     */}
                            <Modal
                            title={`Number of students for ${this.props.dataSource.name} classes`}
                            visible={this.props.visible}
                            // onOk={this.handleOk}
                            // okText="Proceed"
                            // onCancel={this.handleCancel}
                            footer={[
                                <Button
                                     key="back" 
                                     onClick={this.props.handleCancel}
                                     >Return</Button>,
                                <Button 
                                    key="submit" 
                                    type="primary" 
                                    // loading={loading} 
                                    disabled={!boolValues}
                                    onClick={this.props.handleOk}
                                    >
                                Submit
                                </Button>
                            ]}
                            >
                                {renderPeriods()}
                        </Modal>
                        </Form>
                    </div>
                </div>  
            </div>
        );
     }

        return renderContent();
    
    }
}

const ClassConfig = Form.create()(ClassConfigForm);
export default ClassConfig;
