import { getSelector, getAllocations } from '../features/_shared/services/dataService';   

export default {
    teachers: getSelector('personnel'),
    classes: getSelector('s_config'),
    courses: getAllocations(),
    // programmes: getSelector('program'), 
    // departments: getSelector('department'),
    // classSettings: getSelector('class_period'),
    // examSettings: getSelector('exam'),
    colleges: getSelector('cash_item'),
    allocations: []
};
