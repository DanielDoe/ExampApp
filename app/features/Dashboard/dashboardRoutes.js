import Timetable from '../Timetable';
import Classes from '../Classes';
import Courses from '../Courses';
import Programmes from '../Programmes';
import Departments from '../Departments';
import Settings from '../Settings';
import Teachers from '../Teachers';
// import Allocation from '../CouseAllocation/CourseAllocation';

export default [
    {
        title: 'Allocations',
        exact: true,
        path: '/',
        component: Timetable.ProgrammeTT
    },
    // {
    //     title: 'Programme Timetable',
    //     exact: true,
    //     path: '/timetable/programmes',
    //     component: Timetable.ProgrammeTT
    // },
    {
        title: 'Report',
        exact: true,
        path: '/timetable/teachers',
        component: Timetable.TeacherTT
    },
    // {
    //     title: 'Classroom Timetable',
    //     exact: true,
    //     path: '/timetable/classrooms',
    //     component: Timetable.ClassroomTT
    // },
    // {
    //     title: 'Programmes',
    //     exact: true,
    //     path: '/settings/programmes',
    //     component: Programmes
    // },
    // {
    //     title: 'Departments',
    //     exact: true,
    //     path: '/settings/departments',
    //     component: Departments
    // },
    {
        title: 'Staff members',
        exact: true,
        path: '/settings/teachers',
        component: Teachers
    },
    // {
    //     title: 'Courses',
    //     exact: true,
    //     path: '/settings/courses',
    //     component: Courses
    // },
    // {
    //     title: 'Lecture Rooms',
    //     exact: true,
    //     path: '/settings/classes',
    //     component: Classes
    // },
    {
        title: 'Cash management',
        exact: true,
        path: '/settings/college',
        component: Settings.CollegeSettings
    },
    // {
    //     title: 'Lecture Settings',
    //     exact: true,
    //     path: '/settings/classSettings',
    //     component: Settings.ClassSettings
    // },
    // {
    //     title: 'Exam settings',
    //     exact: true,
    //     path: '/settings/examSettings',
    //     component: Settings.ExamSettings
    // },
    // {
    //     title: 'Course Allocation',
    //     exact: true,
    //     path: '/settings/courseAllocation',
    //     component: Settings.Allocation
    // }
];
