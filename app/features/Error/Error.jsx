import React from 'react';
import {Row, Col} from 'antd';
import Computer from '../_shared/assets/computer.png';
import Payment from '../_shared/assets/payment.png';
import Test from '../_shared/assets/test.png';
import Classroom from '../_shared/assets/classroom.png';

import './error.css';

export default function Error() {
    return (
        <div className="grid">
            <img src={Computer} alt="" className="compter-img"/>
            <p className="p-header-text">Welcome to your Exams Invigilations & payment management help</p>
            <Row>
                <Col span={8}>
                    <Row>
                        <Col span={12}>
                            <img src={Classroom} alt="" className="img-features"/>
                        </Col>
                        <Col span={12}>
                            <p className="p-features-text">Staff management</p>
                        </Col>
                    </Row>  
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={12}>
                            <img src={Test} alt="" className="img-features"/>
                        </Col>
                        <Col span={12}>
                            <p className="p-features-text">Staff Allocations</p>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={12}>
                            <img src={Payment} alt="" className="img-features"/>
                        </Col>
                        <Col span={12}>
                            <p className="p-features-text" >Cash management</p>   
                        </Col>
                    </Row> 
                </Col>
            </Row>
            <Row>
                <p className="producers">© Daniel Doe & Clement Nartey</p>
            </Row>
        </div>
    );
}
