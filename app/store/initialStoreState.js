import { getSelector, getAllocations } from '../features/_shared/services/dataService';   

export default {
    teachers: getSelector('personnel'),
    classes: getSelector('s_config'),
    courses: getAllocations(),
    colleges: getSelector('cash_item')
};
