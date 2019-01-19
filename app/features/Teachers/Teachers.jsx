import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon } from 'antd';
import XLSX from 'xlsx';

import './teachers.css';
import TeacherList from './TeacherList';
import { NewTeacher } from './NewTeacher';
import { addStaff, updateStaff, deleteStaff } from '../_shared/services/dataService';
import * as Actions from './teacherActions';

const DEFAULT_EDIT_CONFIG = {
    // Edit configuration
    editMode: false,    // Flag to indicate whether we are editting or adding
    editID: -1,
};

const confirm = Modal.confirm;
const Dialog = require('electron').remote.dialog;

class Teachers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...DEFAULT_EDIT_CONFIG,
            teacherData: [],
            field: {},
            selected_lecturer: [],
            visible: false

        };

        this.cancelEditMode = this.cancelEditMode.bind(this);
        this.teacherEditted = this.teacherEditted.bind(this);
        this.teacherRemoved = this.teacherRemoved.bind(this);
        this.triggerEditMode = this.triggerEditMode.bind(this);
    }

    componentWillMount() {
        document.title = 'Staff management';

        // Check if the redux store is empty. If so, check in the database for data
        let { teachers } = this.props;

        if (teachers.length === 0) {
            this.props.teachersLoaded();
        }
    }

    // Return from the Edit mode to the Add mode
    cancelEditMode() {
        this.setState({
            ...DEFAULT_EDIT_CONFIG,
            editMode: false
        });
    }

    // Edit (or add) a teacher
    teacherEditted(teacher: Object) {
        if (this.state.editMode === true && teacher.id !== -1) {
            // We are in edit mode. Find the teacher and splice the list
            // const doEditing = (array: Array<Object>) => {
            //     return array.map(element => (element.id === teacher.id) ? teacher : element);
            // };

            this.props.teacherEditted(teacher);
            updateStaff(teacher);
            this.cancelEditMode();

        } else {
            this.props.teacherAdded(teacher);
            addStaff(teacher);
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
     * Remove a teacher object from the list.
     * Called by clicking the delete button inside a teacher list
     *
     * @param {Object} teacher The object to remove
     */
    teacherRemoved(lecturer: Object) {
        return (
            confirm({
                title: `Do you want to delete ${lecturer.name}?`,
                content: `When clicked the OK button, ${lecturer.name} will be 
                deleted permanently with all data related to it.
                Please proceed with caution`,
                okText: 'Yes',
                visible: this.state.visible,
                okType: 'danger',
                cancelText: 'No',
                onOk: () => { this.props.teacherRemoved(lecturer); this.handleOk(); deleteStaff(lecturer); },
                onCancel: () => this.handleCancel  
              })
        );
    }

    /**
     * Change the right panel from add to edit (Trigger the Edit mode)
     * Or Change the object being editted (in case a teacher object is already editting)
     *
     * @param {Object} teacher The teacher object to be editted
     */
    triggerEditMode(teacher: Object) {
        this.setState({
            editID: teacher.id,
            editMode: true,
            field: teacher
        });
    }

    openFileDialog = member => {
        console.log(member);
        const o = Dialog.showOpenDialog({ properties: ['openFile'] });
        const workbook = XLSX.readFile(o[0]);
    
        const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

        const newData = data
          .filter((array, i) => array.length > 0 && i > 0)
          .map(element => {
            const newname = element[1];
            addStaff('add', {
              name: element[1],
              member,
              status: element[2],
            });
            return this.props.teacherAdded({
                name: element[1],
                member,
                status: element[2],
            });
          });
    
        this.forceUpdate();
      }

    render() {
        return (
            <div id="teachers" className="grid">
                <TeacherList
                    onEditClicked={this.triggerEditMode}
                    onDeleteClicked={this.teacherRemoved}
                    dataSource={this.props.teachers} 
                    />

                <NewTeacher
                    editMode={this.state.editMode}
                    id={this.state.editID}
                    fieldData={this.state.field}
                    teachers={this.props.teachers}
                    onListUpload={this.openFileDialog}
                    onTeacherEditted={this.teacherEditted}
                    onCancel={this.cancelEditMode} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teachers: state.teachers
    };
};

export default connect(mapStateToProps, { ...Actions })(Teachers);
