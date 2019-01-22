import Timetable from '../Timetable';
import Classes from '../Classes';
import Courses from '../Courses';
import ErrorComponent from '../Error';
import Teachers from '../Teachers';
import Settings from '../Settings';

export default [
    {
        title: 'Allocations',
        exact: true,
        path: '/',
        component: Timetable.ProgrammeTT
    },
    {
        title: 'Report',
        exact: true,
        path: '/timetable/teachers',
        component: Timetable.TeacherTT
    },
    {
        title: 'Staff members',
        exact: true,
        path: '/settings/teachers',
        component: Teachers
    },
    {
        title: 'Cash management',
        exact: true,
        path: '/settings/college',
        component: Settings.CollegeSettings
    }
];
