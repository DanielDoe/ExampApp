import React from 'react';
import { Row, Col, Input, Button, Form, InputNumber } from 'antd';
import { Icon } from 'react-icons-kit';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { buildingO } from 'react-icons-kit/fa/buildingO';
import {ic_add_circle_outline} from 'react-icons-kit/md/ic_add_circle_outline';
import {ic_border_color} from 'react-icons-kit/md/ic_border_color'
import { timesCircle } from 'react-icons-kit/fa/timesCircle';
import Building from '../../_shared/assets/building (3).png'; 
import moneyBag from '../../_shared/assets/money-bag.png';

const size = 'large';
let collegeName = '';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NewCollegeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          college: '',
          status: false,
          counter: 1,
        };
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
                item: nextProps.fieldData.item,
                amount: nextProps.fieldData.amount
            });
            this.setState({ counter: -1 });
          }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const college: Object = {
                item: values.item.trim().toLowerCase(),
                id: this.props.id,
                item_amount: values.amount
            }
            this.props.onCollegeEditted(college);
            // addCashItem(college);

          }
        });
        this.handleReset();
    }

    onChangecollege = (e) => {
        this.setState({ college: e.target.value, status: true });
        collegeName = e.target.value;
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.setState({ counter: 1 }); 
      }

    emitEmpty = () => {
        this.faccultyInput.focus();
        this.setState({ college: '', status: false });
    }

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
        const { college } = this.state;
        const buttonText: string = (this.props.editMode) ? 'Edit' : 'Add';
        const suffix = college ? <Icon icon={timesCircle} onClick={this.emitEmpty} /> : null;
        const itemError = isFieldTouched('item') && getFieldError('item');
        const amountError = isFieldTouched('amount') && getFieldError('amount');

        const itemBool = getFieldValue('item');
        const amountBool = getFieldValue('amount');

        const renderButton = () => {
            if (this.props.editMode === false) {
                return (
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="add-college-button"
                        disabled={hasErrors(getFieldsError()) || !itemBool}
                    >
                        <Icon 
                            icon={ic_add_circle_outline} 
                            size={20} 
                            style={{ marginRight: '1rem' }} />
                        {buttonText}
                    </Button>
                );
            } return (
                <div>
                    <Row>
                        <Col span={12}>
                            <Button
                            type="primary"
                            htmlType="submit"
                            className="edit-college-button"
                            disabled={hasErrors(getFieldsError()) || !itemBool}
                            >
                                <Icon 
                                    icon={ic_border_color} 
                                    size={20} 
                                    style={{ marginRight: '1rem' }} />
                                {buttonText}
                            </Button>
                        </Col>
                        <Col span={12}>
                        <Button
                            type="primary"
                            className="cancel-college-button"
                            // style={{ margin: '0px auto', width: '100%' }}
                            onClick={() => {
                            this.props.onCancel();
                            this.handleReset();
                            }}
                        >
                            Cancel
                        </Button>
                        </Col>
                    </Row>
                </div>
                );
        };

        return (
            <div className="college-container">
                    <div className="college-container-element">
                        <div className="add-college-config">
                            <div className="add-college">
                                <div className="add-college-content">
                                    <div className="icon-container-style">
                                        <img src={moneyBag} alt="add new college" />
                                    </div>
                                    <div className="header-element">
                                        <span className="new-college-name">Manage Cash Allocations</span>
                                    </div>
                                    <div className="text-content">
                                        <Form onSubmit={this.handleSubmit} style={{ width: '70%' }}>
                                            <Row>
                                                <Col span={12}>
                                                    <FormItem
                                                    validateStatus={itemError ? 'warning' : ''}
                                                    help={itemError || ''}
                                                    >
                                                        {getFieldDecorator('item', {
                                                            rules: [{ required: true, message: 'Please add a valid department!' }],
                                                        })(
                                                            <Input 
                                                                // size="large" 
                                                                placeholder="e.g Snacks"
                                                                // suffix={suffix}
                                                                style={{ fontSize: 'large', marginRight: '0.7rem' }}
                                                                onChange={this.onChangecollege}
                                                                ref={node => { this.faccultyInput = node; }}
                                                                className="element-style" />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem
                                                    validateStatus={amountError ? 'warning' : ''}
                                                    help={amountError || ''}
                                                    >
                                                        {getFieldDecorator('amount', {
                                                            rules: [{ required: true, message: 'enter valid number!' }],
                                                        })(
                                                            <InputNumber
                                                                placeholder="e.g 10"
                                                                min={0.00} 
                                                                max={100}
                                                                style={{ fontSize: 'large', marginLeft: '0.7rem' }}
                                                                className="element-style" />
                                                        )}
                                                    </FormItem>        
                                                </Col>
                                            </Row>
                                            {renderButton()}
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

const NewCollege = Form.create()(NewCollegeForm);
export default NewCollege;
