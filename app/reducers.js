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
import courses from './features/Courses/courseReducers';
import colleges from './features/Settings/CollegeDetails/collegeReducer';

export default combineReducers({ 
    router, 
    teachers, 
    classes, 
    courses, 
    colleges, 
});
