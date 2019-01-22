import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

import './sidemenu.css';

const SubMenu = Menu.SubMenu;

export default function Sidemenu(props) {

    function renderTitle(title: string, icon: string) {
        if (title !== 'Settings') {
            return (
                <span>
                    <Icon type={icon} />
                    <span>{title}</span>
                </span>
            );
        }
        return (
            <span>
                <Icon type={icon} />
                <span>{title}</span>
            </span>
        );
    }

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[props.selectedPath]}
            defaultOpenKeys={['timetable']}
            className="sidemenu"
            onClick={clicked => props.onPathChanged(clicked.key)}>

            <SubMenu key="timetable" title={renderTitle('Exam config', 'calendar')}>
                <Menu.Item key="/">Allocate Staff</Menu.Item>
                <Menu.Item key="/timetable/teachers">Generate Report</Menu.Item>
                {/* <Menu.Item key="/timetable/classrooms">Classrooms</Menu.Item> */}
            </SubMenu>
            <SubMenu key="settings" title={renderTitle('Settings', 'tool')}>
                {/* <Menu.Item key="/settings/departments">
                    <Icon type="bank" />
                    <span>Department</span>
                </Menu.Item> */}
                
                {/* <Menu.Item key="/settings/programmes">
                    <Icon type="switcher" />
                    <span>Programmes</span>
                </Menu.Item> */}

                {/* <Menu.Item key="/settings/error">
                    <Icon type="team" />
                    <span>Error page</span>
                </Menu.Item> */}

                <Menu.Item key="/settings/teachers">
                    <Icon type="team" />
                    <span>Add staff</span>
                </Menu.Item>

                {/* <Menu.Item key="/settings/courses">
                    <Icon type="book" />
                    <span>Courses</span>
                </Menu.Item>

                <Menu.Item key="/settings/classes">
                    <Icon type="home" />
                    <span>Lecture Rooms</span>
                </Menu.Item>
                <Menu.Item key="/settings/courseAllocation">
                    <Icon type="copy" />
                    Allocate Courses
                </Menu.Item>
                <Menu.Item key="/settings/examSettings">
                    <Icon type="file-text" />
                    Exams Config
                </Menu.Item>
                <Menu.Item key="/settings/classSettings">
                    <Icon type="book" />
                    Lectures Config
                </Menu.Item> */}
                <Menu.Item key="/settings/college">
                    <Icon type="global" />
                    Cash Managment
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
}

Sidemenu.propTypes = {
    selectedPath: PropTypes.string.isRequired,
    onPathChanged: PropTypes.func.isRequired
};
