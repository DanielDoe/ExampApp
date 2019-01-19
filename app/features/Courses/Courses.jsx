import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon } from 'antd';
import { getSelector, addAllocations, addInvigilationAllawa, deleteAllocation } from '../_shared/services/dataService';

import './courses.css';
import CourseList from './CourseList';
import { NewCourse } from './NewCourse';
import * as Actions from './courseActions';

const DEFAULT_EDIT_CONFIG = {
    // Edit configuration
    editMode: false,    // Flag to indicate whether we are editting or adding
    editID: -1,
};

const confirm = Modal.confirm;

class Courses extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...DEFAULT_EDIT_CONFIG,
            field: {},
            visible: false,
            selected_course: []
        };

        this.cancelEditMode = this.cancelEditMode.bind(this);
        this.courseEditted = this.courseEditted.bind(this);
        this.courseRemoved = this.courseRemoved.bind(this);
        this.triggerEditMode = this.triggerEditMode.bind(this);

    }

    componentWillMount() {
        document.title = 'Exam Config';

        // Check if the redux store is empty. If so, check in the database for data
        let { courses } = this.props;

        if (courses.length === 0) {
            this.props.coursesLoaded();
        }
    }

    // Return from the Edit mode to the Add mode
    cancelEditMode() {
        this.setState({
            ...DEFAULT_EDIT_CONFIG,
            editMode: false
        });
    }

    // Edit (or add) a course
    courseEditted(course: Object) {
        if (this.state.editMode === true && course.id !== -1) {
            // We are in edit mode. Find the course and splice the list
            // const doEditing = (array: Array<Object>) => {
            //     return array.map(element => (element.id === course.id) ? course : element);
            // };

            this.props.courseEditted(course);
            // updateCourse(course);
            // const course_id = getElementId(course.code, 'course');
            // console.log(course.programs.map(element => addProgramHasCourse(element, course_id)));
            // courseQuery('update', course);
            this.cancelEditMode();

        } else {
            this.props.courseAdded(course);
            addAllocations(course);
            addInvigilationAllawa(course);
            // courseQuery('add', course);
            // addCourse(course);
            // const course_id = getElementId(course.name, 'course');
            // console.log(course_id);
            // course.programs.map(element => addProgramHasCourse(element, getElementId(course.name, 'course')[0].id));
        }

        this.cancelEditMode();
    }

    handleOk = () => {
        this.setState({
            visible: false,
          });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    /**
     * Remove a course object from the list.
     * Called by clicking the delete button inside a course list
     *
     * @param {Object} course The object to remove
     */

      courseRemoved(course: Object) {
        return (
            confirm({
                title: `Do you want to delete ${course.p_id} allocation?`,
                content: `When the Yes button is clicked, ${course.p_id} allocation will be 
                deleted permanently with all data related to it.
                Please proceed with caution`,
                okText: 'Yes',
                visible: this.state.visible,
                okType: 'danger',
                cancelText: 'No',
                onOk: () => { this.props.courseRemoved(course); this.handleOk(); this.deleteAllocation(course)},
                onCancel: () => this.handleCancel  
              })
        );
    }


    /**
     * 
     * Change the right panel from add to edit (Trigger the Edit mode)
     * Or Change the object being editted (in case a course object is already editting)
     *
     * @param {Object} course The course object to be editted
     */
    triggerEditMode(course: Object) {
        this.setState({
            editID: course.id,
            editMode: true,
            field: course
        });
    }

    render() {
        return (
            <div id="courses" className="grid">
                <CourseList
                    onEditClicked={this.triggerEditMode}
                    onDeleteClicked={this.courseRemoved}
                    dataSource={this.props.courses} 
                    />

                <NewCourse
                    editMode={this.state.editMode}
                    id={this.state.editID}
                    fieldData={this.state.field}
                    courses={this.props.courses}
                    onCourseEditted={this.courseEditted}
                    onCancel={this.cancelEditMode} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        courses: state.courses
    };
};

export default connect(mapStateToProps, { ...Actions })(Courses);
