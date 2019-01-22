import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Modal, Icon } from 'antd';
import { addCashItem, updateCashItem, deleteCashItem } from '../../_shared/services/dataService'; 
import NewCollege from './NewCollege';
import Classes from '../../Classes';
import * as Actions from './collegeActions';
import classImage from '../../_shared/assets/classroom.png';
import CollegeList from './CollegeList';
import '../settings.css';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
  }

const confirm = Modal.confirm;  
const DEFAULT_EDIT_CONFIG = {
    // Edit configuration
    editMode: false,    // Flag to indicate whether we are editting or adding
    editID: -1,
};

class CollegeSettings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...DEFAULT_EDIT_CONFIG,
            field: {},
            visible: false,
        };

        this.cancelEditMode = this.cancelEditMode.bind(this);
        this.collegeEditted = this.collegeEditted.bind(this);
        this.collegeRemoved = this.collegeRemoved.bind(this);
        this.triggerEditMode = this.triggerEditMode.bind(this);
    }

    componentWillMount() {
        document.title = 'Cash Management';

        // Check if the redux store is empty. If so, check in the database for data
        
    }

    // Return from the Edit mode to the Add mode
    cancelEditMode() {
        this.setState({
            ...DEFAULT_EDIT_CONFIG,
            editMode: false
        });
    }

    // Edit (or add) a college
    collegeEditted(college: Object) {
        if (this.state.editMode === true && college.id !== -1) {
            // We are in edit mode. Find the college and splice the list
            // const doEditing = (array: Array<Object>) => {
            //     return array.map(element => (element.id === college.id) ? college : element);
            // };

            this.props.collegeEditted(college);
            updateCashItem(college);
            this.cancelEditMode();

        } else {
            this.props.collegeAdded(college);
            addCashItem(college);
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

    collegeRemoved(college: Object) {
        return (
            confirm({
                title: `Do you want to delete ${college.iten} item?`,
                content: `When the Yes button is clicked, ${college.iten} item will be 
                deleted permanently with all data related to it.
                Please proceed with caution`,
                okText: 'Yes',
                visible: this.state.visible,
                okType: 'danger',
                cancelText: 'No',
                onOk: () => { 
                    this.props.collegeRemoved(college);  
                    this.handleOk(); 
                    deleteCashItem(college);
                },
                onCancel: () => this.handleCancel()  
              })
        );  
    }

    triggerEditMode(college: Object) {
        this.setState({
            editID: college.id,
            editMode: true,
            field: college
        });
    }
    
    renderCashItems(){
        return (
            <div style={{ height: '80%', width: '100%' }}>
            <Row className="college-Row">
                <Col span={14} style={{ height: '100%' }}>    
                    <NewCollege 
                        editMode={this.state.editMode}
                        id={this.state.editID}
                        fieldData={this.state.field}
                        onCollegeEditted={this.collegeEditted}
                        onCancel={this.cancelEditMode}
                    />
                </Col>  
                <div className="college-content-separater" />
                <Col span={10}>
                <CollegeList 
                        onEditClicked={this.triggerEditMode}
                        onDeleteClicked={this.collegeRemoved}
                        dataSource={this.props.colleges}
                    />
                </Col>  
            </Row>
            </div>  
        );
    }

    renderSconfig(){
        return <Classes />;
    }

    renderContent = () => {
        return (
            <Tabs defaultActiveKey="1" onChange={callback} className="config-tab">
                <TabPane tab="Cash Config" key="1">{this.renderCashItems()}</TabPane>
                <TabPane tab="Meals" key="2">{this.renderSconfig()}</TabPane>
            </Tabs>
        );
    }

    render(){
        return (
            <div className="class-container">
                <div className="class-container-element">
                    {this.renderContent()}
                </div>
            </div>     
        );
    }
}

const mapStateToProps = state => {
    return {
        colleges: state.colleges
    };
};

export default connect(mapStateToProps, { ...Actions })(CollegeSettings);

