import React from 'react';
import { Alert } from 'antd';
import './timetable.css';


export default class ClassroomTT extends React.Component {
    
    renderContent() {
        return (
            <div className="content-container">
                <div>
                    <Alert
                        style={{ width: 450, margin: '50% auto' }}
                        message={'ClassroomTT Page is undercontruction'}
                        description="Waiting for the algorithm and UI concept to proceed"
                        type="info"
                        showIcon
                    />
                </div>
            </div>
        );
    }
    render() {
        return ( 
            <div id="classroom-container" className="grid">
                {this.renderContent()}
            </div>
        );
    }
}
