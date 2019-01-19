export const SQLiteSchema = [
	{
		name: 'Class',
		createQuery: `DROP TABLE IF EXISTS Class;
            CREATE TABLE Class (
                id integer NOT NULL,
                name text NOT NULL,
                classLevelId integer NOT NULL,
                nextClassId integer,
                isDeleted integer NOT NULL DEFAULT 0,
                PRIMARY KEY (id)
            )`
	},
	{
		name: 'ClassCourse',
		createQuery: `DROP TABLE IF EXISTS ClassCourse; 
            CREATE TABLE ClassCourse (
                classId integer NOT NULL,
                courseId integer NOT NULL,
                teacherId integer,
                credits integer,
                PRIMARY KEY (classId,courseId)
              )`
	},
	{
		name: 'ClassHasProgrammeOption',
		createQuery: `DROP TABLE IF EXISTS ClassHasProgrammeOption;
            CREATE TABLE ClassHasProgrammeOption (
                classId integer NOT NULL,
                programmeOptionId integer NOT NULL,
                PRIMARY KEY (classId,programmeOptionId)
            )`
	},
	{
		name: 'ClassLevel',
		createQuery: `DROP TABLE IF EXISTS ClassLevel; 
            CREATE TABLE ClassLevel (
                id integer NOT NULL,
                name text NOT NULL,
                rank integer,
                section text,
                isDeleted integer NOT NULL DEFAULT 0,
                PRIMARY KEY (id)
              )`
	},
	{
		name: 'Course',
		createQuery: `DROP TABLE IF EXISTS Course; 
            CREATE TABLE Course (
                id integer NOT NULL,
                name text NOT NULL,
                shortName text,
                isDeleted integer NOT NULL DEFAULT 0,
                type text NOT NULL,
                PRIMARY KEY (id)
              )`
	},
	{
		name: 'KeyValuePairs',
		createQuery: `DROP TABLE IF EXISTS KeyValuePairs; 
            CREATE TABLE KeyValuePairs (
                key text NOT NULL,
                value text,
                PRIMARY KEY (key)
            )`
	},
	{
		name: 'Programme',
		createQuery: `DROP TABLE IF EXISTS Programme; 
            CREATE TABLE Programme (
                id integer NOT NULL,
                name text NOT NULL,
                isDeleted integer,
                PRIMARY KEY (id)
            )`
	},
	{
		name: 'ProgrammeOption',
		createQuery: `DROP TABLE IF EXISTS ProgrammeOption; 
            CREATE TABLE IF NOT EXISTS ProgrammeOption
                (
                    id INTEGER NOT NULL PRIMARY KEY,
                    name TEXT NOT NULL,
                    programmeId INTEGER NOT NULL,
                    is_deleted INTEGER DEFAULT 0
				)`
	},
	{
		name: 'ProgrammeOptionHasCourse',
		createQuery: `DROP TABLE IF EXISTS ProgrammeOptionHasCourse; 
            CREATE TABLE ProgrammeOptionHasCourse (
                programmeOptionId integer NOT NULL,
                courseId integer NOT NULL,
                PRIMARY KEY (programmeOptionId,courseId)
              )`
	},
	{
		name: 'TimetableLesson',
		createQuery: `DROP TABLE IF EXISTS TimetableLesson; 
        CREATE TABLE TimetableLesson (
            id integer PRIMARY KEY NOT NULL,
            classId integer NOT NULL,
            courseId integer NOT NULL,
            courseName text NOT NULL,
            day integer NOT NULL,
            className text NOT NULL,
            teacherId integer NOT NULL,
            teacherName text,
            startTime integer NOT NULL,
            endTime integer NOT NULL,
            periodIndex integer NOT NULL,
            lessonType text
          )`
	},
	{
		name: 'TimetablePeriod',
		createQuery: `DROP TABLE IF EXISTS TimetablePeriod; 
            CREATE TABLE TimetablePeriod (
                periodIndex integer NOT NULL,
                startTime integer NOT NULL,
                endTime integer NOT NULL,
                PRIMARY KEY (periodIndex)
            )`
	}
];
