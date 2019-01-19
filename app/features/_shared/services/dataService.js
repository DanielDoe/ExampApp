// import reduce from 'lodash/reduce';
// import size from 'lodash/size';
import { runSelectQuery, runQuery } from '../services/storageService';
import { Constants } from '../../../constants';

let query;
const types = Constants.dbActions;

// export function getProgrammes() {
//     query = 'SELECT * FROM Programme';

//     return runSelectQuery(query);

// }

// export function getDepartment() {
//     query = 'SELECT * FROM Department';

//     return runSelectQuery(query);

// }

// export function getvenues() {
//     query = 'SELECT * FROM Class';

//     return runSelectQuery(query);
// }

// export function getTeacher() {
//     query = 'SELECT * FROM lecturer';

//     return runSelectQuery(query);
// }

// export const programID = student => {
//     query = `SELECT id FROM program WHERE name = "${student.program}"`;
//     return runSelectQuery(query);
// };

// export const addClass = classe => {
//     query = `INSERT INTO classe (level, program) VALUES (${classe.level}, ${
//       classe.program
//     })`;
//     runQuery(query);
// };

// export const getLecturerById = lecturer => {
//     query = `SELECT * FROM user WHERE id = ${lecturer}`;
//     return runSelectQuery(query);
// };
  
// export const getClasseId = year => {
//     query = `SELECT id FROM classe WHERE level = ${year}`;
//     return runSelectQuery(query);
// };

// export const getDepartmentId = name => {
//     query = `SELECT id FROM department WHERE name = "${name}"`;
//     return runSelectQuery(query);
// };

// export const getLecturerId = name => {
//   query = `SELECT id FROM lecturer WHERE surname = "${name.split(' ')[0]}" AND othername = "${name.split(' ')[1]}"`;
//   return runSelectQuery(query);
// };

// export const lecturerQuery = (type, lecturer) => {
  
//     switch (type) {
//       case types.INSERT:
//         query = `INSERT INTO lecturer (surname, othername, title) VALUES 
//         ("${lecturer.surname}", "${lecturer.othername}", "${lecturer.title}")`;
//         runQuery(query);
//         break;
  
//       case types.SELECT:
//         query = 'SELECT * FROM lecturer ORDER BY surname ASC';
//         return runSelectQuery(query);
  
//       case types.UPDATE:
//         query = `UPDATE lecturer SET name = "${lecturer.name}", othername = "${
//           lecturer.othername
//         }", 
//               title = "${lecturer.title}" WHERE surname = "${lecturer.surname}" AND othername = "${lecturer.othername}"`;
//         runQuery(query);
//         break;
  
//       case types.DELETE:
//         query = `DELETE FROM lecturer WHERE surname = "${lecturer.surname}" AND "${lecturer.othername}"`;
//         runQuery(query);
//         break;
  
//       default:
//         return null;
//     }
//   };

//   export const courseQuery = (type, course) => {
 
//     switch (type) {
//       case types.INSERT:
//         query = `INSERT INTO course (code, name, department, lecturer) VALUES ("${course.code}", 
//               "${course.name}", ${getDepartmentId(course.department)[0].id}, ${getLecturerId(course.lecturer)[0].id})`;
//         runQuery(query);
  
//         // AddCourseClass(course);
//         break;
  
//       case types.SELECT:
//         query = 'SELECT * FROM course';
//         return runSelectQuery(query);
  
//       case types.UPDATE:
//         query = `UPDATE course SET name = "${course.name}", username = "${
//           course.username
//         }", 
//               title = "${course.title}" WHERE username = "${course.username}"`;
//         runQuery(query);
//         break;
  
//       case types.DELETE:
//         query = `DELETE FROM course WHERE id = ${course.id}`;
//         runQuery(query);
//         break;
  
//       default:
//         return null;
//     }
//   };

//   export const departmentQuery = (type, department) => {
 
//     switch (type) {
//       case types.INSERT:
//         query = `INSERT INTO department (name) VALUES ("${department.name}")`;
//         runQuery(query);
  
//         // AddCourseClass(course);
//         break;
  
//       case types.SELECT:
//         query = 'SELECT * FROM department';
//         return runSelectQuery(query);
  
//       case types.UPDATE:
//         query = `UPDATE department SET name = "${department.name}" WHERE name = "${department.username}"`;
//         runQuery(query);
//         break;
  
//       case types.DELETE:
//         query = `DELETE FROM course WHERE id = ${department.id}`;
//         runQuery(query);
//         break;
  
//       default:
//         return null;
//     }
//   };

//   export const programQuery = (type, program) => {
 
//     switch (type) {
//       case types.INSERT:
//         query = `INSERT INTO program (name, department) VALUES ("${program.name}", ${getDepartmentId(program.department)[0].id})`;
//         // console.log(query);
//         runQuery(query);
//         // AddCourseClass(course);
//         break;
  
//       case types.SELECT:
//         query = 'SELECT * FROM program';
//         return runSelectQuery(query);
  
//       case types.UPDATE:
//         query = `UPDATE program SET name = "${program.name}", department = "${program.department}"  WHERE name = "${program.name}"`;
//         runQuery(query);
//         break;
  
//       case types.DELETE:
//         query = `DELETE FROM progeam WHERE id = ${program.id}`;
//         runQuery(query);
//         break;
  
//       default:
//         return null;
//     }
//   };

//   export const classeQuery = (type, classe) => {
  
//     switch (type) {
//       case types.INSERT:
//         query = `INSERT INTO classe (name, examCapacity, classCapacity) VALUES 
//         ("${classe.name}", "${classe.examCapacity}", "${classe.classCapacity}")`;
//         runQuery(query);
//         break;
  
//       case types.SELECT:
//         query = 'SELECT * FROM classe';
//         return runSelectQuery(query);
  
//       case types.UPDATE:
//         query = `UPDATE classe SET name = "${classe.name}" WHERE name = "${classe.name}"`;
//         runQuery(query);
//         break;
  
//       case types.DELETE:
//         query = `DELETE FROM classe WHERE name = "${classe.name}"`;
//         runQuery(query);
//         break;
  
//       default:
//         return null;
//     }
//   };


  /**
   * Rewriting all the queries for the 😋 database
   *
   */

  
  // this is a global select function
  export const getSelector = (table) => {
    query = `SELECT * FROM ${table}`;
    return runSelectQuery(query);
  };

  // this is a global funtion to return table ids 👊
  export const getElementId = (name, table) => {
    query = `SELECT p_id FROM ${table} WHERE name = "${name}"`;
    return runSelectQuery(query);
  };

  export const getLecturerId = (data, table) => {
    query = `SELECT id FROM ${table} WHERE surname = "${data[1]}" AND othername = "${data[2]}"`;
    return runSelectQuery(query);
  };

  export const getProgramByDepartment = department => {
    query = `SELECT name FROM program WHERE department = ${department}`;
    // console.log(query);
    return runSelectQuery(query);
  };

  // this option will help get names by id 
  export const getNameById = (id, table) => {
    query = `SELECT name FROM ${table} WHERE p_id = ${id}`;
    return runSelectQuery(query);
  };

  // This will help add new college
  export const addCollege = college => {
    query = `INSERT INTO college (name) VALUES ("${college.name}")`;
    runQuery(query);
  };


  // function to add the various table data 🙋
  export const addDepartment = department => {
    query = `INSERT INTO department (name, college_id) VALUES ("${department.name}", ${department.college_id})`;
    runQuery(query);
  };

  export const addCashItem = item => {
    query = `INSERT INTO cash_item (item, item_amount) VALUES ("${item.item}", ${item.item_amount})`;
    runQuery(query);
  };

  export const addProgramme = program => {
    query = `INSERT INTO program (name, code, department) 
            VALUES ("${program.name}", "${program.code}", ${program.department})`;
    runQuery(query);
  };

  export const addPackage = pack => {
    query = `INSERT INTO s_config(
      snack_count, 
      lunch_count, 
      amount, 
      session_count
  ) VALUES (${pack.snack_count},${pack.lunch_count},((${pack.snack_count} * (SELECT item_amount FROM cash_item WHERE item = "Snack")) + (${pack.lunch_count} * (SELECT item_amount FROM cash_item WHERE item = "Lunch"))),${pack.session_count});`;
    runQuery(query);
  };

  export const addLecturer = lecturer => {
    query = `INSERT INTO lecturer (title, surname, othername, department) 
    VALUES ("${lecturer.title}", "${lecturer.surname}", "${lecturer.othername}", ${lecturer.department})`;
    runQuery(query);
  }; 

  export const addStaff = staff => {
    query = `INSERT INTO personnel (name, member, status) 
    VALUES ("${staff.name}", "${staff.member}", "${staff.status}")`;
    runQuery(query);
  };

  export const Sconfig = sconf => {
    query = `INSERT INTO s_config (name, p_type, status) 
    VALUES ("${sconf.name}", "${sconf.member}", "${sconf.status}")`;
    runQuery(query);
  };

  export const addProgramHasCourse = (program, course) => {
    query = `INSERT INTO program_has_course (program_id, course_id) VALUES (${program}, ${course})`;
    runQuery(query);
  };

  export const addCourse = course => {
    query = `INSERT INTO course (name, code, level, semester, hasLab)
    VALUES ("${course.name}", "${course.code}", ${course.level}, ${course.semester}, ${course.hasLab})`;
    runQuery(query);
  };

  export const addAllocations = elem => {
    query = `INSERT INTO session (period, start, end, date, p_id, duration_mins)
    VALUES ("${elem.period}", "${elem.start}", "${elem.end}", "${elem.date}", ${elem.p_id}, ${elem.duration_mins})`;
    runQuery(query);
  };

  export const addInvigilationAllawa = (elem) => {
    const first_session_query = `SELECT count(*) as s_count, status FROM session JOIN personnel ON session.p_id = personnel.p_id WHERE session.p_id = ${elem.p_id} AND date = "${elem.date}"`;
    // runSelectQuery(first_session_query);
    let q_result = runSelectQuery(first_session_query)[0];
    let s_count = q_result.s_count;
    let status = q_result.status;
    if (s_count === 1){
      let rate_type = "";

      switch (status) {
        case "Senior member":
            rate_type = "rate_senior";
            break;

        case "Non-senior member":
            rate_type = "rate_non_senior";
            break;
      }
      query = `INSERT INTO invigilation_allowances(
        date,
        p_id,
        session_count, 
        duration_total,
        rate_min,
        rate_hr
    ) 
        SELECT date,p_id,count(*),sum(duration_mins),
        (SELECT round((item_amount/60.0),6) FROM cash_item WHERE item = "${rate_type}"),
        (SELECT item_amount FROM cash_item WHERE item = "${rate_type}")
        FROM session
        WHERE p_id = ${elem.p_id} 
        AND date = "${elem.date}"`;
      runQuery(query);
      
      let sQuery = `INSERT INTO snack_allowances(
        s_config_id, 
          p_id, 
          date
      ) 
        SELECT s_config_id, p_id, date 
        FROM s_config
        JOIN invigilation_allowances ON s_config.session_count = invigilation_allowances.session_count
        WHERE p_id = ${elem.p_id}`;
        runQuery(sQuery);

    } else {
      query = `UPDATE invigilation_allowances SET 
      session_count =  (SELECT count(*) FROM session WHERE p_id = ${elem.p_id} AND date = "${elem.date}"),
      duration_total = (SELECT sum(duration_mins) FROM session WHERE p_id = ${elem.p_id} AND date = "${elem.date}")
      WHERE date = "${elem.date}" and p_id = ${elem.p_id}`;
      runQuery(query);

      let sQuery = `UPDATE snack_allowances SET 
      s_config_id= (SELECT s_config_id FROM s_config where session_count = ${s_count})
      WHERE p_id = ${elem.p_id} AND date = "${elem.date}"`;
      runQuery(sQuery);
    }
    
  };

  export const generateInvigilation = () => {
    query = `SELECT 
    name,
    (sum(duration_total)/60) as hours,
    status,
    rate_hr,
    round((sum(duration_total)*round(rate_min,4)),2) as amount,
    round(((SELECT item_amount from cash_item WHERE item = lower("Tax"))*sum(duration_total)*round(rate_min,4)),2) as Tax,
    round(((sum(duration_total)*round(rate_min,4))*(1 - (SELECT item_amount from cash_item WHERE item = lower("Tax") ))),2) as amount_due
    FROM personnel
    JOIN invigilation_allowances 
    ON personnel.p_id = invigilation_allowances.p_id
    group by personnel.p_id`;
    return runSelectQuery(query);
  };

  export const SnackCalculation = () => {
    query = `SELECT 
    name,
    sum(amount) as amount,
    sum(session_count) as sessions
    FROM personnel
    JOIN snack_allowances
    ON personnel.p_id = snack_allowances.p_id
    JOIN s_config
    ON s_config.s_config_id = snack_allowances.s_config_id
    group by snack_allowances.p_id`;
    return runSelectQuery(query);
  };
  
  export const PersonalInvigilation = (name) => {
    query = `SELECT 
    name,
    date,
    round((sum(duration_total)/60),2) as hours,
    status,
    rate_hr,
    round((sum(duration_total)*rate_min),2) as amount,
    round(((SELECT item_amount from cash_item WHERE item = lower("Tax"))*sum(duration_total)*rate_min),2) as Tax,
    round(((sum(duration_total)*rate_min)*(1 - (SELECT item_amount from cash_item WHERE item = lower("Tax") ))),2) as amount_due,
    (
      SELECT
      sum(amount)
      FROM personnel
      JOIN snack_allowances
      ON personnel.p_id = snack_allowances.p_id
      JOIN s_config
      ON s_config.s_config_id = snack_allowances.s_config_id
        WHERE name = "${name}"
        AND snack_allowances.date = invigilation_allowances.date
      group by snack_allowances.date
    ) as snack_allowance,
    (
      round(((sum(duration_total)*rate_min)*(1 - (SELECT item_amount from cash_item WHERE item = lower("Tax") ))),2) 
      + 
      (
        SELECT
        sum(amount)
        FROM personnel
        JOIN snack_allowances
        ON personnel.p_id = snack_allowances.p_id
        JOIN s_config
        ON s_config.s_config_id = snack_allowances.s_config_id
        WHERE name = "${name}"
        AND snack_allowances.date = invigilation_allowances.date
        group by snack_allowances.date
      )
    ) as day_total
    FROM personnel
    JOIN invigilation_allowances 
    ON personnel.p_id = invigilation_allowances.p_id
    WHERE name = "${name}"
    group by invigilation_allowances.date`;

    return runSelectQuery(query);
  };


  export const addVenue = venue => {
    query = `INSERT INTO venue (name, examCapacity, classCapacity) VALUES 
            ("${venue.name}", ${venue.examCapacity}, ${venue.classCapacity})`;
    runQuery(query);         
  };

  export const addExamSessions = exam => {
    query = `INSERT INTO exam (session, start, end) VALUES 
            ("${exam.session}", "${exam.start}", "${exam.end}")`;
    // console.log(query);        
    runQuery(query);         
  };

  export const addExamPeriod = (period, type) => {
    if (type === 'add'){
      query = `INSERT INTO exam_period (start, end) VALUES 
      ("${period.start}", "${period.end}")`;
    } if (type === 'update'){
        query = `UPDATE exam_period SET start = "${period.start}", end = "${period.end}" WHERE id = 1`;
    }
    // console.log(query); 
    runQuery(query); 
  }; 

  export const addClassPeriod = (period, type) => {
    if (type === 'add'){
      query = `INSERT INTO class_period (day,start, end) VALUES 
      ("${period.day}", "${period.start}", "${period.end}")`;
    } if (type === 'update'){
        query = `UPDATE exam_period SET start = "${period.start}", end = "${period.end}" WHERE id = 1`;
    }
    // console.log(query); 
    runQuery(query); 
  };


  // function to update the various tables 🙋
  export const updateDepartment = department => {
    query = `UPDATE department SET name = "${department.name}",  college_id = ${department.college_id} WHERE id = ${department.id}`;
    runQuery(query);
  };

  export const updatePackage = pack => {
    query = `UPDATE s_config SET snack_count = "${pack.snack_count}", session_count = ${pack.session_count}, lunch_count = ${pack.lunch_count} WHERE session_count = ${pack.session_count}`;
    runQuery(query);
  };

  export const updateCashItem = item => {
    query = `UPDATE cash_item SET item = "${item.item}",  item_amount = ${item.item_amount} WHERE item = "${item.item}"`;
    runQuery(query);
  };

  export const updateProgramme = program => {
    query = `UPDATE program SET name = "${program.name}",  code = "${program.code}", 
    department = ${program.department} WHERE id = ${program.id}`;
    runQuery(query);
  };

  export const updateSession = sec => {
    query = `UPDATE session SET session_count = ${sec.session},  snack_count = ${sec.snack}, 
    lunch_count = ${sec.lunch}, amount = ${sec.amount} WHERE id = ${sec.id}`;
    runQuery(query);
  };
  

  export const updateLecturer = lecturer => {
    query = `UPDATE lecturer SET title = "${lecturer.title}",  surname = "${lecturer.surname}", 
    othername = "${lecturer.othername}", department = ${lecturer.department} WHERE id = ${lecturer.id}`;
    runQuery(query);
  };

  export const updateStaff = staff => {
    query = `UPDATE personnel SET name = "${staff.name}",  member = "${staff.member}", 
    status = "${staff.status}" WHERE name = "${staff.name}"`;
    runQuery(query);
  };

  export const updateCourse = course => {
    query = `UPDATE course SET name = "${course.name}", code = "${course.code}", level = ${course.level} , semester = ${course.semester}, 
    hasLab = ${course.hasLab}) WHERE id = ${course.id}`;
    runQuery(query);
  };

  export const updateVenue = venue => {
    query = `UPDATE venue SET name = "${venue.name}", examCapacity = ${venue.examCapacity}, classCapacity = ${venue.classCapacity}  WHERE id = ${venue.id}`; 
    runQuery(query);
  };

  export const updateExamSessions = exam => {
    query = `UPDATE exam SET session = "${exam.session}", start = "${exam.start}", end = "${exam.end}" WHERE id = ${exam.id}`; 
    runQuery(query);
  };


  // function to delete the various tables 🙋
  export const deleteDepartment = department => {
    query = `DELETE FROM department WHERE id = "${department.id}"`;
    runQuery(query);
  };

  export const deleteCashItem = item => {
    query = `DELETE FROM cash_item WHERE item = "${item.item}"`;
    runQuery(query);
  };

  export const deleteAllocation = item => {
    query = `DELETE FROM session WHERE session_id = "${item.session_id}"`;
    runQuery(query);
  };

  export const deletePackage = item => {
    // console.log(item);
    query = `DELETE FROM s_config WHERE session_count = ${item.session_count}`;
    // console.log(query);
    runQuery(query);
  };

  export const deleteProgramme = program => {
    query = `DELETE FROM program WHERE id = "${program.id}"`;
    runQuery(query);
  };

  export const deleteSession = sec => {
    query = `DELETE FROM session WHERE id = "${sec.id}"`;
    runQuery(query);
  };

  export const deleteLecturer = lecturer => {
    query = `DELETE FROM lecturer WHERE id = ${lecturer.id}`;
    runQuery(query);
  };
  
  export const deleteStaff = staff => {
    query = `DELETE FROM personnel WHERE name = "${staff.name}"`;
    runQuery(query);
  };

  export const deleteVenue = venue => {
    query = `DELETE FROM venue WHERE id = ${venue.id}`;
    runQuery(query);
  };

  export const deleteExamSession = exam => {
    query = `DELETE FROM exam WHERE id = ${exam.id}`;
    runQuery(query);
  };
