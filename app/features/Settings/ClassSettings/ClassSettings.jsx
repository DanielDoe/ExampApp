import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, notification } from 'antd';
import NoLectures from './NoLectures';
import ClassPeriods from './ClassPeriods';
import * as Actions from './classActions';
import classImage from '../../_shared/assets/classroom.png';
import { addClassPeriod, getSelector} from '../../_shared/services/dataService';
import Icon from 'react-icons-kit';
import {cogs} from 'react-icons-kit/fa/cogs';
import {check} from 'react-icons-kit/entypo/check';
import '../settings.css';

const DEFAULT_EDIT_CONFIG = {
    // Edit configuration
    editMode: false,    // Flag to indicate whether we are editting or adding
    editID: -1,
};

class ClassSettings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...DEFAULT_EDIT_CONFIG,
            classPeriodData: []
        };

        // this.cancelEditMode = this.cancelEditMode.bind(this);
        this.classPeriodEditted = this.classPeriodEditted.bind(this);
        // this.triggerEditMode = this.triggerEditMode.bind(this);
    }

    componentWillMount() {
        document.title = 'classPeriods - Tertiary Timetable';

        // Check if the redux store is empty. If so, check in the database for data
        
    }

    // Edit (or add) a classPeriod
    classPeriodEditted(period: Object) {           
            const duration = period.days.map((day, id) => {
                return {
                    day,
                    start: period.start[id],
                    end: period.end[id]
                };
            });

            if (getSelector('class_period').length !== 0) {
                duration.map(element => addClassPeriod(element, 'update'));
                 notification['success']({
                    message: `Duration updated successfully`,
                    description: `Your exams duration has been updated successfully.`,
                  });
                //  this.openNotificationWithIcon('Success', 'updated');
            } else {
                duration.map(element => addClassPeriod(element, 'add'));
                notification['success']({
                    message: `Duration added successfully`,
                    description: `Your exams duration has been added successfully.`,
                  });
                // this.openNotificationWithIcon('Success', 'added');
            }
        }

    // triggerEditMode(period: Object) {
    //     this.setState({
    //         editID: period.id,
    //         editMode: true
    //     });
    // }

    renderContent = () => {
        return (
            <div >
                <ClassPeriods 
                    fieldData={this.state.field}
                    onPeriodsAdded={this.classPeriodEditted}
                />    
            </div>
        );
    }

    render(){
        return (
            <div className="class-container">
                <div className="class-container-element">
                    <Row>
                        <Col span={6}>
                            <div className="side-image-container">
                                <img src={classImage} alt="exams image" className="exam-image-container" />
                                <h5 className="class-header-text"><Icon icon={cogs} size={15} style={{ paddingRight: '0.5rem' }} />Add lecture Config</h5>
                                <div className="exam-sub-header"><Icon icon={check} size={15} style={{ paddingRight: '0.2rem' }} />
                                    This option will help determine the suitable time placements for your timle table. 
                                    Hence, give you a more accurate class timetable.
                                </div> 
                                <div className="exam-sub-header"><Icon icon={check} size={15} style={{ paddingRight: '0.2rem' }} />
                                    Add days with their time and classPeriods to get started.
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
        classSettings: state.classSettings
    };
};

export default connect(mapStateToProps, { ...Actions })(ClassSettings);

