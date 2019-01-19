import React from 'react';
import { Alert, Row, Col, List, Select, Form, Icon, Input, Button } from 'antd';
import RenderList from './RenderList';
import { getSelector } from '../_shared/services/dataService';
import AllocationList from './AllocationList';

const Option = Select.Option;
const FormItem = Form.Item;

let course = null;
const defaultSource = ['No data Selected'];

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

class AllocationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            course: [],
            classe: [],
            lecturer: []

        };

        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.handleLecturerChange = this.handleLecturerChange.bind(this);
        this.handleClasseChange = this.handleClasseChange.bind(this);
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
      }
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

      handleCourseChange(value) {
        course = value;
        this.setState({
            course: [value],
        });
      }

      handleLecturerChange(value) {
        this.setState({
            lecturer: value
        });

      }

      handleClasseChange(value) {
        this.setState({
            classe: value,
        });
      }

      renderlecturer() {
        const lecturerData = getSelector('lecturer').map((element, id) => {
            return <Option value={`${element.title} ${element.surname} ${element.othername}`} key={element.id}>{element.title} {element.surname} {element.othername}</Option>;
        });
        return lecturerData;
      }

      renderCourse() {
        const courseData = getSelector('course').map((element) => {
            return <Option value={element.name} key={element.id}>{element.name}</Option>;
        });
        return courseData;
      }

      renderClasses(){
        const courseData = getSelector('class_course_group').map((element) => {
            return <Option value={element.name} key={element.id}>{element.name}</Option>;
        });
        return courseData;
      }

        // this checks the form validation  
        hasErrors(fieldsError) {
            const fromAnt = (Object.keys(fieldsError).some(field => fieldsError[field]));
            return fromAnt;
        }

      render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;

        // Only show error after a field is touched.
        const courseError = isFieldTouched('course') && getFieldError('course');
        const lecturerError = isFieldTouched('lecturer') && getFieldError('lecturer');
        const classesError = isFieldTouched('classes') && getFieldError('classes');

        const courseBool = getFieldValue('course');
        const lecturer = getFieldValue('lecturer');
        const classes = getFieldValue('lecturer');

        const isEmpty = !courseBool || !lecturer || !classes;

        return (
            <Form layout="inline" onSubmit={this.handleSubmit} className="allocation-content-container">
                <Row className="container-content">
                    <Col span={24} className="container-content">    
                        <div className="allocation-header-element">
                            <Row>
                                <Col span={24}>
                                    <h2 className="college-h2" style={{ color: '#767676' }}>Course, Class & Teacher Allocation</h2> 
                                    <hr style={{ margin: '0.5rem 1.2rem 1.5rem 1.2rem' }} />
                                </Col>
                            </Row>
                        </div>
                        <div className="" style={{ height: '70%' }}>
                            <Row className="" style={{ height: '100%' }}>
                                <Col span={8} className="container-column">
                                    <div className="allocate-image-container">
                                        {/* <img src={Courses} alt="lecturer" style={{ margin: '2rem auto' }} /> */}
                                        <div className="course-allocate-image-container">
                                            <p>
                                                course to allocate
                                            </p>
                                        </div>
                                        <div className="course-content">
                                            <div>
                                                <Row className="selector-container">
                                                    <FormItem
                                                        className="form-item-container"
                                                        validateStatus={courseError ? 'error' : ''}
                                                        help={courseError || ''}
                                                        >
                                                        {getFieldDecorator('course', {
                                                            rules: [{ required: true, message: 'Please input your username!' }],
                                                        })(
                                                            // <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                                            <Select 
                                                                className="select-style" 
                                                                onChange={this.handleCourseChange}
                                                                style={{ width: '100%' }}
                                                            >
                                                                {this.renderCourse()}
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Row>
                                                <Row className="display-container">
                                                    <div>
                                                        <RenderList dataSource={(this.state.course.length === 0) ? defaultSource : this.state.course} />
                                                    </div>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8} className="container-column">
                                    <div className="allocate-image-container">
                                        {/* <img src={Lecturer} alt="lecturer" style={{ margin: '2rem auto' }} /> */}
                                        <div className="teachers-allocate-image-container">
                                            <p>
                                                course lecturer
                                            </p>
                                        </div>
                                            <div className="course-content">
                                            <Row className="selector-container">
                                                <FormItem
                                                    className="form-item-container"
                                                    validateStatus={lecturerError ? 'error' : ''}
                                                    help={lecturerError || ''}
                                                    >
                                                    {getFieldDecorator('lecturer', {
                                                        rules: [{ required: true, message: 'Please input your username!' }],
                                                    })(
                                                        // <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                                        <Select 
                                                            className="select-style" 
                                                            multiple
                                                            onChange={this.handleLecturerChange}
                                                            style={{ width: '100%' }}
                                                        >
                                                            {this.renderlecturer()}
                                                        </Select>
                                                    )}
                                                </FormItem>
                                            </Row>
                                            <Row className="display-container">
                                                <div>
                                                    <RenderList dataSource={(this.state.lecturer.length === 0) ? defaultSource : this.state.lecturer} />
                                                </div>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8} className="container-column" >
                                    <div className="allocate-image-container">
                                        {/* <img src={Lecturer} alt="lecturer" style={{ margin: '2rem auto' }} /> */}
                                        <div className="classes-allocate-image-container">
                                            <p>
                                                course classes
                                            </p>
                                        </div>
                                            <div className="course-content">
                                            <div>
                                                <Row className="selector-container">
                                                    <FormItem
                                                        className="form-item-container"
                                                        validateStatus={classesError ? 'error' : ''}
                                                        help={classesError || ''}
                                                        >
                                                        {getFieldDecorator('classes', {
                                                            rules: [{ required: true, message: 'Please input your username!' }],
                                                        })(
                                                            <Select 
                                                                className="select-style" 
                                                                multiple
                                                                onChange={this.handleClasseChange}
                                                                style={{ width: '100%' }}
                                                            >
                                                            
                                                                <Option value="jack">Jack</Option>
                                                                <Option value="lucy">Lucy</Option>
                                                                <Option value="disabled" disabled>Disabled</Option>
                                                                <Option value="Yiminghe">yiminghe</Option>
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Row>
                                            </div>
                                            <Row className="display-container">
                                                <div>
                                                    <RenderList 
                                                        dataSource={(this.state.classe.length === 0) ? defaultSource : this.state.classe} />
                                                </div>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} />
                                <Col span={8} style={{ textAlign: 'center' }}>
                                    {/* <FormItem style={{ width: '100%' }}> */}
                                        <button 
                                            // type="primary" 
                                            // size={'large'} 
                                            className="allocate-button"
                                            // style={{ margin: '0rem auto', width: '50%', bac }}
                                            // htmlType="submit" 
                                            disabled={this.hasErrors(getFieldsError()) || isEmpty}
                                            >Allocate</button>
                                    {/* </FormItem> */}
                                </Col>
                                <Col span={8} />
                            </Row>
                        </div>
                    </Col>
                </Row>    
            </Form>
        );
    }
}  

const Allocations = Form.create()(AllocationForm);
export default Allocations;