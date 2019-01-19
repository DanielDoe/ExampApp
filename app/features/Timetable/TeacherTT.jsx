import React from 'react';
import Snack from './snack&lunch';
import Invigilation from './invigilations';
import Personal from './personal';
import { Alert, Row, Col, Tabs, Icon } from 'antd';

const TabPane = Tabs.TabPane;

export default class TeacherTT extends React.Component {
    render(){
        return ( 
            <div id="teachers-container" className="grid">
                <div className="generate-tabs">
                    <Tabs defaultActiveKey="1" className="" style={{height: '100%', width:'100%'}}>
                        <TabPane tab={<span><Icon type="gift" />Snack & Lunch </span>} key="1">
                            <Snack />
                        </TabPane>
                        <TabPane tab={<span><Icon type="solution" />Invigilation</span>} key="2">
                            <Invigilation />
                        </TabPane>
                        <TabPane tab={<span><Icon type="user" />Individual</span>} key="3">
                            <Personal />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
