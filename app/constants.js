export const ActionTypes = {
    teachers: {
        TEACHERS_ADDED: 'TEACHERS_ADDED',
        TEACHER_ADDED: 'TEACHER_ADDED',
        TEACHER_EDITTED: 'TEACHER_EDITTED', 
        TEACHER_REMOVED: 'TEACHER_REMOVED'
    },
    classes: {
        CLASSES_ADDED: 'CLASSES_ADDED',
        CLASS_ADDED: 'CLASS_ADDED',
        CLASS_EDITTED: 'CLASS_EDITTED', 
        CLASS_REMOVED: 'CLASS_REMOVED'
    },
    courses: {
        COURSES_ADDED: 'COURSES_ADDED',
        COURSE_ADDED: 'COURSE_ADDED',
        COURSE_EDITTED: 'COURSE_EDITTED', 
        COURSE_REMOVED: 'COURSE_REMOVED'
    },
    departments: {
        DEPARTMENTS_ADDED: 'DEPARTMENTS_ADDED',
        DEPARTMENT_ADDED: 'DEPARTMENT_ADDED',
        DEPARTMENT_EDITTED: 'DEPARTMENT_EDITTED', 
        DEPARTMENT_REMOVED: 'DEPARTMENT_REMOVED'
    },
    programmes: {
        PROGRAMMES_ADDED: 'PROGRAMMES_ADDED',
        PROGRAMME_ADDED: 'PROGRAMME_ADDED',
        PROGRAMME_EDITTED: 'PROGRAMME_EDITTED', 
        PROGRAMME_REMOVED: 'PROGRAMME_REMOVED'
    },
    classPeriods: {
        SESSIONS_ADDED: 'SESSIONS_ADDED',
        SESSION_ADDED: 'SESSION_ADDED',
        SESSION_EDITTED: 'SESSION_EDITTED', 
        SESSION_REMOVED: 'SESSION_REMOVED'
    },
    exam_session: {
        EXAM_SESSIONS_ADDED: 'EXAM_SESSIONS_ADDED',
        EXAM_SESSION_ADDED: 'EXAM_SESSION_ADDED',
        EXAM_SESSION_EDITTED: 'EXAM_SESSION_EDITTED', 
        EXAM_SESSION_REMOVED: 'EXAM_SESSION_REMOVED'
    },
    colleges: {
        COLLEGES_ADDED: 'COLLEGES_ADDED',
        COLLEGE_ADDED: 'COLLEGE_ADDED',
        COLLEGE_EDITTED: 'COLLEGE_EDITTED', 
        COLLEGE_REMOVED: 'COLLEGE_REMOVED'
    },
    allocations: {
        ALLOCATIONS_ADDED: 'ALLOCATIONS_ADDED',
        ALLOCATION_ADDED: 'ALLOCATION_ADDED',
        ALLOCATION_EDITTED: 'ALLOCATION_EDITTED', 
        ALLOCATION_REMOVED: 'ALLOCATION_REMOVED'
    }

};

export const Constants = {
    misc: {
      SQL_RETURN_MODE_ITERATOR: 'sql_return_iterator',
      SQL_RETURN_MODE_ALL: 'sql_return_all'
    },
    memType: {
        SENIOR: 'Senior',
        MEMBER: 'Member'
    },
    dbActions: {
        INSERT: 'add',
        SELECT: 'select',
        UPDATE: 'update',
        DELETE: 'delete',
        PROGRAMSEARCH: 'psearch'
      }
};    
