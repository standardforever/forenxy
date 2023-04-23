const mysql = require('mysql2/promise')
require("dotenv").config();


/**
 * Database - Base class for database
 * @host: url host
 * @user : database user name
 * @password : database password
 * @database : the database to use
 * @pool : total number of connection pool
 */


class Database {
    constructor(host, user, password, database, pool = 10) {
        this.connection = mysql.createPool({
            connectionLimit: pool,
            host: host,
            user: user,
            password: password,
            database: database
        })
    }

    // it query the database depending on the args and sql query passed
    async query(sql, args) {
        try {
            const [rows, fields] = await this.connection.query(sql, args);
            return rows;
        } catch (err) {
            console.error(err)
        }
    }
    // Create tables
    async createTable(table) {
        await this.query(table)
    }

    // Get one instance in the database
    async getOne(table, by, params) {
        const sql = `SELECT * FROM \`${table}\` WHERE \`${by}\` = ?`;
        const rows = await this.query(sql, [params]);
        return rows[0];

    }

    // Get All instance in the database
    async getALl() {

    }

    // Create record in the database
    async create(table, values) {
        const cols = Object.keys(values);
        const placeholders = cols.map(() => '?').join(',');
        const sql = `INSERT INTO \`${table}\` (${cols.join(',')}) VALUES (${placeholders})`;
        const result = await this.query(sql, Object.values(values));
        console.log(result)
        return result
    }

    // Update record in the database
    async updadte(table, id, values) {
        const sets = [];
        const args = [];
        for (const col in values) {
            sets.push(`\`${col}\` = ?`);
            args.push(values[col]);
        }
        args.push(id);
        const sql = `UPDATE \`${table}\` SET ${sets.join(',')} WHERE id = ?`;
        const result = await this.query(sql, args);
        return result;
    }

    // Delete reocrd in the database
    async delete() {

    }
}

const db = new Database(process.env.DATABASE_URL,
                        process.env.DATABASE_USER,
                        process.env.DATABASE_PASSWORD,
                        process.env.DATABASE);

module.exports = { db };

