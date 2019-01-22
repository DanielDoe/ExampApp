export const SQLiteSchema = [
	{
		name: 'cash_item',
		createQuery: `
            CREATE TABLE IF NOT EXISTS  cash_item (
                item_id integer NOT NULL,
                item text,
                item_amount integer,
                PRIMARY KEY (item_id)
            )`
	},
	{
		name: 'invigilation_allowances',
		createQuery: `
            CREATE TABLE IF NOT EXISTS  invigilation_allowances (
                ia_id integer NOT NULL,
                date text,
                session_count integer,
                duration_total integer,
                p_id integer,
                rate_min integer,
                rate_hr integer,
                PRIMARY KEY (ia_id)
              )`
	},
	{
		name: 'personnel',
		createQuery: `
            CREATE TABLE IF NOT EXISTS  personnel (
                p_id integer NOT NULL,
                name text,
                member text,
                status text,
                PRIMARY KEY (p_id)
            )`
	},
	{
		name: 's_config',
		createQuery: ` 
            CREATE TABLE IF NOT EXISTS  s_config (
                s_config_id integer NOT NULL,
                name text,
                snack_count integer,
                lunch_count integer,
                amount integer,
                session_count integer,
                PRIMARY KEY (s_config_id)
              )`
	},
	{
		name: 'session',
		createQuery: ` 
            CREATE TABLE IF NOT EXISTS  session (
                session_id integer NOT NULL,
                period text,
                start text,
                end text,
                date text,
                p_id intger,
                duration_mins intger,
                PRIMARY KEY (session_id)
              )`
	},
	{
		name: 'snack_allowances',
		createQuery: `
            CREATE TABLE IF NOT EXISTS  snack_allowances (
                sa_id integer NOT NULL,
                s_config_id integer,
                p_id integer,
                date text,
                PRIMARY KEY (sa_id)
            )`
	},
	{
		name: 'staff',
		createQuery: `
            CREATE TABLE IF NOT EXISTS  staff (
                s_id integer NOT NULL,
                status text,
                p_id integer,
                PRIMARY KEY (s_id)
            )`
    },
    {
        name: 'init',
        createQuery: `
            CREATE TABLE IF NOT EXISTS init(
                id integer AUTO_INCREMENT PRIMARY KEY,
                status integer NOT NULL
            )
        `
    }
];

export const cash_items = [
    {name: "meal", amount: 10},  
    {name: "tax", amount: 0.1}, 
    {name: "rate_senior", amount: 10}, 
    {name: "rate_non_senior", amount: 5}
];

export const configs = [
    {snack: 1, lunch: 0, amount: 10, session: 1}, 
    {snack: 2, lunch: 1, amount: 20, session: 2}, 
    {snack: 3, lunch: 1, amount: 30, session: 3},  
]
