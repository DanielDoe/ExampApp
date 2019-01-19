import React from 'react';
import { Alert } from 'antd';
import { HeaderComponent } from '../Dashboard/header';
import Courses from '../Courses';

export default class ProgrammeTT extends React.Component {
   
    
    render() {
        return ( 
            <div id="program-container" className="grid">
                <Courses />
            </div>
        );
    }
}
