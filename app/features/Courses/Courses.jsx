import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon } from 'antd';
import { getSelector, addAllocations, addInvigilationAllawa, deleteAllocation, updateAllocation } from '../_shared/services/dataService';

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
        this.deleteAllocation = deleteAllocation.bind(this)

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
        if (this.state.editMode === true && course.session_id !== -1) {
            const e_course = {
                ...course,
                session_id : this.state.field.session_id
            }
            console.log(e_course);
            updateAllocation(e_course);
            this.props.courseEditted(e_course);
            this.cancelEditMode();

        } else {
            let session_id_from_db = addAllocations(course);
            addInvigilationAllawa(course);
            course.session_id = session_id_from_db;
            this.props.courseAdded(course);
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
        console.log(course);
        return (
            confirm({
                title: `Do you want to delete ${course.name}'s allocation?`,
                content: `When the Yes button is clicked, ${course.name}'s allocation will be 
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
        console.log(course);
        this.setState({
            editID: course.session_id,
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
