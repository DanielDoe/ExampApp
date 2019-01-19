import React from 'react';
import { RenderList } from './RenderList';
import { Row, Col } from 'antd';
import Allocations from './Allocations';
import AllocationList from './AllocationList';
import './allocation.css';

const DEFAULT_EDIT_CONFIG = {
    // Edit configuration
    editMode: false,    // Flag to indicate whether we are editting or adding
    editID: -1
};

export default class Allocation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...DEFAULT_EDIT_CONFIG,
            field: {},
            visible: false,
        };

        this.cancelEditMode = this.cancelEditMode.bind(this);
        this.allocationEditted = this.allocationEditted.bind(this);
        this.allocationRemoved = this.allocationRemoved.bind(this);
        this.triggerEditMode = this.triggerEditMode.bind(this);
    }

    componentWillMount() {
        document.title = 'allocations - Tertiary Timetable';

        // Check if the redux store is empty. If so, check in the database for data
        let { allocations } = this.props;

        // if (allocations.length === 0) {
        //     this.props.allocationsLoaded();
        // }
    }


    // Return from the Edit mode to the Add mode
    cancelEditMode() {
        this.setState({
            ...DEFAULT_EDIT_CONFIG,
            editMode: false
        });
    }

    // Edit (or add) a allocation
    allocationEditted(allocation: Object) {
        if (this.state.editMode === true && allocation.id !== -1) {
            // We are in edit mode. Find the allocation and splice the list
            // const doEditing = (array: Array<Object>) => {
            //     return array.map(element => (element.id === allocation.id) ? allocation : element);
            // };
            console.log(allocation);

            this.props.allocationEditted(allocation);
            // updateAllocation(allocation);
            this.cancelEditMode();

        } else {
            this.props.allocationAdded(allocation);
            // addAllocation(allocation);

        }

        this.cancelEditMode();
    }

    /**
     * Remove a allocation object from the list.
     * Called by clicking the delete button inside a allocation list
     *
     * @param {Object} allocation The object to remove
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

    allocationRemoved(allocation: Object) {
        return (
            confirm({
                title: `Do you want to delete ${allocation.name} allocation?`,
                content: `When the Yes button is clicked, ${allocation.name} allocation will be 
                deleted permanently with all data related to it.
                Please proceed with caution`,
                okText: 'Yes',
                visible: this.state.visible,
                okType: 'danger',
                cancelText: 'No',
                onOk: () => { 
                    this.props.allocationRemoved(allocation); 
                    this.handleOk(); 
                    // deleteAllocation(allocation);
                },
                onCancel: () => this.handleCancel()  
              })
        );
    }

    /**
     * Change the right panel from add to edit (Trigger the Edit mode)
     * Or Change the object being editted (in case a allocation object is already editting)
     *
     * @param {Object} allocation The allocation object to be editted
     */
    triggerEditMode(allocation: Object) {
        this.setState({
            editID: allocation.id,
            editMode: true,
            field: allocation
        });
    }


    render() {
        return ( 
            <div id="classroom-container" className="grid">
                <Row className="allocation-content-container">
                    <Col span={24} style={{ height: '50%' }}>
                        <Allocations />
                    </Col>
                    <Col span={24} style={{ height: '50%', marginTop: '1rem' }}> 
                        <div className="divider">
                            <AllocationList onDeleteClicked={() => console.log('Deleted')} onEditClicked={() => console.log('Deleted')} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
