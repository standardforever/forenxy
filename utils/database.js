const mysql = require('mysql')
// const { User } = require('../models/user')

class MySqlClient {
    constructor(host, user, password, database, pool = 10) {
        this.connection = mysql.createPool({
            connectionLimit: pool,
            host: host,
            user: user,
            password: password,
            database: database
        })
    }

    // Create tables
    async create_table(table) {
        this.connection.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                return;
            } // not connected!
            else {
                console.log(connection);
            }

            // Creating the table with the connection
            this.connection.query(table, (err, results, fields) => {
                if (err) {
                    console.error(err);
                    return;
                }
                else {
                    console.log('Users table created')
                    connection.release();
                }

            })
        });
    }

    // Get one instance in the database
    async getOne() {

    }

    // Get All instance in the database
    async getALl() {

    }

    // Create record in the database
    async create() {

    }

    // Update record in the database
    async updadte() {

    }

    // Delete reocrd in the database
    async delete() {

    }
}

const mySqlClient = new MySqlClient('localhost', 'forenxy_user', 'forenxy_pwd', 'forenxy')
// mySqlClient.create_table(User)
module.exports = { mySqlClient };