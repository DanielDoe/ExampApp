/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-12-27 08:59:22 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 09:00:04
 */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import teachers from './features/Teachers/teacherReducer';
import classes from './features/Classes/classReducer';
// import departments from './features/Departments/departmentReducers';
// import programmes from './features/Programmes/programmeReducers';
import courses from './features/Courses/courseReducers';
// import classSettings from './features/Settings/ClassSettings/classReducers';
// import examSettings from './features/Settings/ExamSettings/examReducer';
import colleges from './features/Settings/CollegeDetails/collegeReducer';
import allocations from './features/CouseAllocation/allocationReducer';

export default combineReducers({ 
    router, 
    teachers, 
    classes, 
    // departments, 
    // programmes, 
    courses, 
    // examSettings,
    // classSettings,
    colleges,
    allocations 
});
