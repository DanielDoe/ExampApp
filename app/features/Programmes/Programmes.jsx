import React from 'react';
import { connect } from 'react-redux';
import { Icon, Modal } from 'antd';
import './programmes.css';
import ProgrammeList from './ProgrammeList';
import { updateProgramme, addProgramme, deleteProgramme } from '../_shared/services/dataService';
import { NewProgramme } from './NewProgramme';
import * as Actions from './programmeActions';

const DEFAULT_EDIT_CONFIG = {
    // Edit configuration
    editMode: false,    // Flag to indicate whether we are editting or adding
    editID: -1,
};

const confirm = Modal.confirm;

class Programmes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...DEFAULT_EDIT_CONFIG,
            programmeData: [],
            field: {},
            visible: false,
            start: null,
            end: null,
            selected_program: []
        };

        this.cancelEditMode = this.cancelEditMode.bind(this);
        this.programmeEditted = this.programmeEditted.bind(this);
        this.programmeRemoved = this.programmeRemoved.bind(this);
        this.triggerEditMode = this.triggerEditMode.bind(this);
    }

    componentWillMount() {
        document.title = 'Programmes - Tertiary Timetable';

        // Check if the redux store is empty. If so, check in the database for data
        let { programmes } = this.props;

        if (programmes.length === 0) {
            this.props.programmesLoaded();
        }
    }

    // Return from the Edit mode to the Add mode
    cancelEditMode() {
        this.setState({
            ...DEFAULT_EDIT_CONFIG,
            editMode: false
        });
    }

    // Edit (or add) a programme
    programmeEditted(programme: Object) {
        if (this.state.editMode === true && programme.id !== -1) {
            // We are in edit mode. Find the programme and splice the list
            // const doEditing = (array: Array<Object>) => {
            //     return array.map(element => (element.id === programme.id) ? programme : element);
            // };
            console.log(programme.id);
            this.props.programmeEditted(programme);
            updateProgramme(programme);
            
            this.cancelEditMode();

        } else {
            this.props.programmeAdded(programme);
            addProgramme(programme);
            this.setState({
                start: programme.start,
                end: programme.end
            });
            
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
     * Remove a programme object from the list.
     * Called by clicking the delete button inside a programme list
     *
     * @param {Object} programme The object to remove
     */
    programmeRemoved(program: Object) {
        return (
            confirm({
                title: `Do you want to delete ${program.name} programme?`,
                content: `When the Yes button is clicked, ${program.name} programme will be 
                deleted permanently with all data related to it.
                Please proceed with caution`,
                okText: 'Yes',
                visible: this.state.visible,
                okType: 'danger',
                cancelText: 'No',
                onOk: () => { this.props.programmeRemoved(program); this.handleOk(); deleteProgramme(program); },
                onCancel: () => this.handleCancel  
              })
        );  
    }

    /**
     * Change the right panel from add to edit (Trigger the Edit mode)
     * Or Change the object being editted (in case a programme object is already editting)
     *
     * @param {Object} programme The programme object to be editted
     */
    triggerEditMode(programme: Object) {
        console.log(programme);
        this.setState({
            editID: programme.id,
            editMode: true,
            field: programme
        });
    }

    render() {
        return (
            <div id="programmes" className="grid">
                <ProgrammeList
                    onEditClicked={this.triggerEditMode}
                    onDeleteClicked={this.programmeRemoved}
                    dataSource={this.props.programmes} 
                    />

                <NewProgramme
                    editMode={this.state.editMode}
                    id={this.state.editID}
                    start={this.state.start}
                    fieldData={this.state.field}
                    programmes={this.props.programmes}
                    onProgrammeEditted={this.programmeEditted}
                    onCancel={this.cancelEditMode} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        programmes: state.programmes
    };
};

export default connect(mapStateToProps, { ...Actions })(Programmes);
