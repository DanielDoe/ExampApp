// import reduce from 'lodash/reduce';
// import size from 'lodash/size';
import { runSelectQuery, runQuery } from '../services/storageService';
import { Constants } from '../../../constants';

let query;
const types = Constants.dbActions;

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

  // this is a global funtion to return table ids 👊
  export const getElementName = (name, table) => {
    query = `SELECT p_id FROM ${table} WHERE name = "${name}"`;
    return runSelectQuery(query);
  };

  export const getAllocations = () => {
    query = `SELECT session_id, personnel.p_id, name, date, start, end, duration_mins, period from personnel join session on personnel.p_id = session.p_id `;
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


  export const addAllocations = elem => {
    query = `INSERT INTO session (period, start, end, date, p_id, duration_mins)
    VALUES ("${elem.period}", "${elem.start}", "${elem.end}", "${elem.date}", ${elem.p_id}, ${elem.duration_mins})`;
    runQuery(query);

    //query to get the id of the last session entered
    let session_id_query = `SELECT session_id from session 
    WHERE p_id = ${elem.p_id} 
    AND period = "${elem.period}" 
    AND start = "${elem.start}" 
    AND end = "${elem.end}" 
    AND date = "${elem.date}" 
    AND duration_mins = ${elem.duration_mins}`;
    return runSelectQuery(session_id_query)[0].session_id;
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
        case "Senior Member":
            rate_type = "rate_senior";
            break;

        case "Non-senior Member":
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
        WHERE p_id = ${elem.p_id}
        AND date = "${elem.date}"`;
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
    sum(duration_total) as duration_total,
    status,
    rate_hr,
    round((sum(duration_total)*round(rate_min,4)),2) as amount,
    round(((SELECT item_amount from cash_item WHERE item = lower("tax"))*sum(duration_total)*round(rate_min,4)),2) as tax,
    round(((sum(duration_total)*round(rate_min,4))*(1 - (SELECT item_amount from cash_item WHERE item = lower("tax") ))),2) as amount_due
    FROM personnel
    JOIN invigilation_allowances 
    ON personnel.p_id = invigilation_allowances.p_id
    group by personnel.p_id`;
    return runSelectQuery(query);
  };

  export const SnackCalculation = () => {
    query = `SELECT 
    personnel.name,
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
    sum(duration_total) as duration_total,
    status,
    rate_hr,
    round((sum(duration_total)*rate_min),2) as amount,
    round(((SELECT item_amount from cash_item WHERE item = lower("tax"))*sum(duration_total)*rate_min),2) as tax,
    round(((sum(duration_total)*rate_min)*(1 - (SELECT item_amount from cash_item WHERE item = lower("tax") ))),2) as amount_due,
    (
      SELECT
      sum(amount)
      FROM personnel
      JOIN snack_allowances
      ON personnel.p_id = snack_allowances.p_id
      JOIN s_config
      ON s_config.s_config_id = snack_allowances.s_config_id
        WHERE personnel.name = "${name}"
        AND snack_allowances.date = invigilation_allowances.date
      group by snack_allowances.date
    ) as snack_allowance,
    (
      round(((sum(duration_total)*rate_min)*(1 - (SELECT item_amount from cash_item WHERE item = lower("tax") ))),2) 
      + 
      (
        SELECT
        sum(amount)
        FROM personnel
        JOIN snack_allowances
        ON personnel.p_id = snack_allowances.p_id
        JOIN s_config
        ON s_config.s_config_id = snack_allowances.s_config_id
        WHERE personnel.name = "${name}"
        AND snack_allowances.date = invigilation_allowances.date
        group by snack_allowances.date
      )
    ) as day_total
    FROM personnel
    JOIN invigilation_allowances 
    ON personnel.p_id = invigilation_allowances.p_id
    WHERE personnel.name = "${name}"
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
    query = `UPDATE s_config SET snack_count = "${pack.snack_count}", session_count = ${pack.session_count}`;
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

  export const updateAllocation = session => {
    // get the number of sessions so far
    const first_session_query = `SELECT count(*) as s_count, status FROM session JOIN personnel ON session.p_id = personnel.p_id 
    WHERE session.p_id = ${session.p_id} AND date = "${session.date}"`;

    let s_count = runSelectQuery(first_session_query)[0].s_count;

    query = `UPDATE session SET period = "${session.period}", start = "${session.start}", 
    end = "${session.end}", date = "${session.date}", p_id = ${session.p_id}, duration_mins = ${session.duration_mins} 
    WHERE session_id = ${session.session_id}`;
    runQuery(query);

    let iQuery = `UPDATE invigilation_allowances SET 
    session_count =  (SELECT count(*) FROM session WHERE p_id = ${session.p_id} AND date = "${session.date}"),
    duration_total = (SELECT sum(duration_mins) FROM session WHERE p_id = ${session.p_id} AND date = "${session.date}")
    WHERE date = "${session.date}" and p_id = ${session.p_id}`;
    runQuery(iQuery);

    let sQuery = `UPDATE snack_allowances SET 
    s_config_id= (SELECT s_config_id FROM s_config where session_count = ${s_count})
    WHERE p_id = ${session.p_id} AND date = "${session.date}"`;
    runQuery(sQuery);
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
    console.log(item);
    query = `DELETE FROM session WHERE session_id = "${item.session_id}"`;
    runQuery(query);

    //query to reduce the number of sessions in the invigilation table
    let invigilation_session_reduction_query = `UPDATE invigilation_allowances SET 
    session_count = ((SELECT session_count from invigilation_allowances WHERE date = "${item.date}" AND p_id = ${item.p_id}) - 1),
    duration_total = ((SELECT duration_total from invigilation_allowances WHERE date = "${item.date}" AND p_id = ${item.p_id}) - ${item.duration_mins})
    WHERE p_id = ${item.p_id} AND date = "${item.date}"`;
    runQuery(invigilation_session_reduction_query);

    //query to reduce the number of sessions in the snack allowances table
    let snack_session_reduction_query = `UPDATE snack_allowances SET 
    s_config_id = ((SELECT s_config_id from snack_allowances WHERE date = "${item.date}" AND p_id = ${item.p_id}) - 1)
    WHERE p_id = ${item.p_id} AND date = "${item.date}"`;
    runQuery(snack_session_reduction_query);
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
