import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-icons-kit';
import {cogs} from 'react-icons-kit/fa/cogs';
import {check} from 'react-icons-kit/entypo/check';
import NoExams from './NoExams';
import { addExamSessions, updateExamSessions, deleteExamSession } from '../../_shared/services/dataService.js';
import { Modal, Card, TimePicker, Col, Row, Form, Input, Button } from 'antd';
import GeneratedPeriods from './GeneratedPeriods';
import GeneratePeriods from './GeneratePeriods';
import GenerateDuration from './GenerateDuration';
import * as Actions from './examActions';
import examImage from '../../_shared/assets/notepad.png';
// import ExceptionList from './ExceptionList';
import './exams.css';
import '../settings.css';

const DEFAULT_EDIT_CONFIG = {
    // Edit configuration
    editMode: false,    // Flag to indicate whether we are editting or adding
    editID: -1,
};

const confirm = Modal.confirm;

class ExamSettings extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            ...DEFAULT_EDIT_CONFIG,
            exceptionData: [],
            visible: false,
            field: {}
        };

        this.cancelEditMode = this.cancelEditMode.bind(this);
        this.sessionEditted = this.sessionEditted.bind(this);
        this.sessionRemoved = this.sessionRemoved.bind(this);
        this.triggerEditMode = this.triggerEditMode.bind(this);
	}
	
	componentWillMount() {
        document.title = 'exceptions - Tertiary Timetable';

        // Check if the redux store is empty. If so, check in the database for data
        
	}
	
	// Return from the Edit mode to the Add mode
    cancelEditMode() {
        this.setState({
            ...DEFAULT_EDIT_CONFIG,
            editMode: false
        });
	}
	
	// Edit (or add) a exception
    sessionEditted(session: Object) {
        if (this.state.editMode === true && session.id !== -1) {
            // We are in edit mode. Find the exception and splice the list
            // const doEditing = (array: Array<Object>) => {
            //     return array.map(element => (element.id === exception.id) ? exception : element);
            // };

            this.props.examSessionEditted(session);
            updateExamSessions(session);
            this.cancelEditMode();

        } else {
            this.props.examSessionAdded(session);
            addExamSessions(session);
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

    sessionRemoved(session: Object) {
        return (
            confirm({
                title: `Do you want to delete ${session.name} session?`,
                content: `Clicking the Yes button, will ensure that ${session.name} session is 
                deleted from your sessions. Please proceed with caution`,
                okText: 'Yes',
                visible: this.state.visible,
                okType: 'danger',
                cancelText: 'No',
                onOk: () => { 
                    this.props.examSessionRemoved(session);
                    this.handleOk(); 
                    deleteExamSession(session);
                },
                onCancel: () => this.handleCancel()  
              })
        );    
    }

    triggerEditMode(session: Object) {
        this.setState({
            editID: session.id,
            editMode: true,
            field: session
        });
    }


    renderContent = () => {
        return (
            <div className="exam-container">
                <div className="exam-period-container">
                    <div className="period-container">
                        <GeneratedPeriods 
                            onEditClicked={this.triggerEditMode}
                            onDeleteClicked={this.sessionRemoved}
                            dataSource={this.props.examSettings}
                        />
                        <GeneratePeriods 
                            editMode={this.state.editMode}
                            id={this.state.editID}
                            fieldData={this.state.field}
                            sessions={this.props.examSettings}
                            onSessionEditted={this.sessionEditted}
                            onCancel={this.cancelEditMode}
                            />  
                        <p className="session-h2" style={{marginTop: '1rem'}}>Exams Duration</p>
                        <div>
                            <GenerateDuration 
                                editMode={this.state.editMode}
                                id={this.state.editID}
                                // ondurationEditted={this.exceptionEditted}
                                // onCancel={this.cancelEditMode}
                            />
                        </div>    
                    </div>
                </div>  
            </div> 
        );
    }


	render() {

		return (
			<div className="exam-container">
				<div className="exam-container-element">
                    <Row>
                        <Col span={6}>
                            <div className="side-image-container">
                                <img src={examImage} alt="exams image" className="exam-image-container"/>
                                <h5 className="exam-header-text"><Icon icon={cogs} size={15} style={{ paddingRight: '0.5rem' }} />Add Exam Config</h5>
                                <div className="exam-sub-header"><Icon icon={check} size={15} style={{ paddingRight: '0.2rem' }} />
                                    This option will help us set up a more accurate exam timetable 
                                    for you.
                                </div> 
                                <div className="exam-sub-header"><Icon icon={check} size={15} style={{ paddingRight: '0.2rem' }} />
                                    Add sessions with their time and exceptions to get ready
                                </div>
                            </div>
                        </Col>
                        <div className="setting-content-separater" />
                            <Col span={18}>
                                {this.renderContent()}
                            </Col>
                    </Row>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        // sessions: state.sessions,
        examSettings: state.examSettings
    };
};

export default connect(mapStateToProps, { ...Actions })(ExamSettings);