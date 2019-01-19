import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon } from 'antd';
import { addDepartment, updateDepartment, deleteDepartment } from '../_shared/services/dataService';
import './departments.css';

import DepartmentList from './DepartmentList';
import { NewDepartment } from './NewDepartment';
import * as Actions from './departmentActions';
import { HeaderComponent } from '../Dashboard/header';

const DEFAULT_EDIT_CONFIG = {
    // Edit configuration
    editMode: false,    // Flag to indicate whether we are editting or adding
    editID: -1
};


const confirm = Modal.confirm;

class Departments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...DEFAULT_EDIT_CONFIG,
            field: {},
            visible: false,
            selected_department: [] 
        };

        this.cancelEditMode = this.cancelEditMode.bind(this);
        this.departmentEditted = this.departmentEditted.bind(this);
        this.departmentRemoved = this.departmentRemoved.bind(this);
        this.triggerEditMode = this.triggerEditMode.bind(this);
    }

    componentWillMount() {
        document.title = 'Departments - Tertiary Timetable';

        // Check if the redux store is empty. If so, check in the database for data
        let { departments } = this.props;

        if (departments.length === 0) {
            this.props.departmentsLoaded();
        }
    }


    // Return from the Edit mode to the Add mode
    cancelEditMode() {
        this.setState({
            ...DEFAULT_EDIT_CONFIG,
            editMode: false
        });
    }

    // Edit (or add) a department
    departmentEditted(department: Object) {
        if (this.state.editMode === true && department.id !== -1) {
            // We are in edit mode. Find the department and splice the list
            // const doEditing = (array: Array<Object>) => {
            //     return array.map(element => (element.id === department.id) ? department : element);
            // };
            console.log(department);

            this.props.departmentEditted(department);
            updateDepartment(department);
            this.cancelEditMode();

        } else {
            this.props.departmentAdded(department);
            addDepartment(department);

        }

        this.cancelEditMode();
    }

    /**
     * Remove a department object from the list.
     * Called by clicking the delete button inside a department list
     *
     * @param {Object} department The object to remove
     */

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

    departmentRemoved(department: Object) {
        return (
            confirm({
                title: `Do you want to delete ${department.name} department?`,
                content: `When the Yes button is clicked, ${department.name} department will be 
                deleted permanently with all data related to it.
                Please proceed with caution`,
                okText: 'Yes',
                visible: this.state.visible,
                okType: 'danger',
                cancelText: 'No',
                onOk: () => { 
                    this.props.departmentRemoved(department); 
                    this.handleOk(); 
                    deleteDepartment(department);
                },
                onCancel: () => this.handleCancel()  
              })
        );
    }

    /**
     * Change the right panel from add to edit (Trigger the Edit mode)
     * Or Change the object being editted (in case a department object is already editting)
     *
     * @param {Object} department The department object to be editted
     */
    triggerEditMode(department: Object) {
        this.setState({
            editID: department.id,
            editMode: true,
            field: department
        });
    }

    render() {
        return (
            <div id="departments" className="grid">
                <DepartmentList
                    onEditClicked={this.triggerEditMode}
                    onDeleteClicked={this.departmentRemoved}
                    dataSource={this.props.departments} 
                    />

                <NewDepartment
                    editMode={this.state.editMode}
                    id={this.state.editID}
                    fieldData={this.state.field}
                    departments={this.props.departments}
                    onDepartmentEditted={this.departmentEditted}
                    onCancel={this.cancelEditMode} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        departments: state.departments
    };
};

export default connect(mapStateToProps, { ...Actions })(Departments);
