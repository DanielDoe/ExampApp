import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon } from 'antd';

import './classes.css';
import { addPackage, updatePackage, deletePackage } from '../_shared/services/dataService';
import { NewClassroom } from './NewClassroom';
import ClassroomList from './ClassroomList';
import * as Actions from './classActions';


const DEFAULT_EDIT_CONFIG = {
    // Edit configuration
    editMode: false,   // Flag to indicate whether we are editting or adding
    editID: -1
};

const confirm = Modal.confirm;

class Classes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...DEFAULT_EDIT_CONFIG, 
            field: {},
            selected_class: [],
            visible: false
        };

        this.classEditted = this.classEditted.bind(this);
        this.cancelEditMode = this.cancelEditMode.bind(this);
        this.classRemoved = this.classRemoved.bind(this);
        this.triggerEditMode = this.triggerEditMode.bind(this);
    }

    componentWillMount() {
        document.title = 'Classrooms / Lecture rooms - Tertiary Timetable';
 
        const { classes } = this.props;

        // check redux for data else use database data

        if (classes.length === 0) {
            this.props.classesLoaded();
        }
    }

    // Return from the Edit mode to the Add mode
    cancelEditMode() {
        this.setState({
            ...DEFAULT_EDIT_CONFIG,
            editMode: false
        });
    }


    classEditted(classDetail: Object) {
        if (this.state.editMode === true && classDetail.id !== -1) {
            // We are in edit mode. Find the teacher and splice the list
            // const doEditing = (array: Array<Object>) => {
            //     return array.map(element => (element.id === teacher.id) ? teacher : element);
            // };

            this.props.classEditted(classDetail);
            // updateVenue(classDetail);
            updatePackage(classDetail);
            this.cancelEditMode();

        } else {
            this.props.classAdded(classDetail);
            // addVenue(classDetail);
            addPackage(classDetail);
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

    classRemoved(classDetail: Object) {
        return (
            confirm({
                title: `Do you want to delete package with ${classDetail.session_count} session?`,
                content: `When the Yes button is clicked, ${classDetail.session_count} session will be 
                deleted permanently with all data related to it.
                Please proceed with caution`,
                okText: 'Yes',
                visible: this.state.visible,
                okType: 'danger',
                cancelText: 'No',
                onOk: () => { this.props.classRemoved(classDetail); this.handleOk(); deletePackage(classDetail); },
                onCancel: () => this.handleCancel  
              })
        );
    }

    triggerEditMode(classDetail: Object) {
        // eslint-disable-next-line
        this.setState({
            // the -1 is because we added +1 when rendering the table
            editID: classDetail.id,
            editMode: true,
            field: classDetail
        });
    }

    render() {
        return (
            <div id="classroom" className="grid">
                <ClassroomList
                    onEditClicked={this.triggerEditMode}
                    onDeleteClicked={this.classRemoved}
                    dataSource={this.props.classes} />

                <NewClassroom
                    editMode={this.state.editMode}
                    id={this.state.editID}
                    fieldData={this.state.field}
                    classes={this.props.classes}
                    onCancel={this.cancelEditMode}
                    onClassEditted={this.classEditted} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        classes: state.classes
    };
};

export default connect(mapStateToProps, { ...Actions })(Classes);
