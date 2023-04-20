// const { Sequelize } = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('forenxy', 'forenxy_user', 'forenxy_pwd', {
  host: 'localhost',
  dialect: 'mysql'
});

syncDatabase();

// Define a model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
// Sync the model with the database
async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing database: ', error);
  }
}










// class MySqlClient {
//     constructor(host, user, password, database, pool = 10) {
//         this.connection = mysql.createPool({
//             connectionLimit: pool,
//             host: host,
//             user: user,
//             password: password,
//             database: database
//         })
//     }

//     // Create tables
//     async create_table(table) {
//         this.connection.getConnection((err, connection) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             } // not connected!
//             else {
//                 console.log(connection);
//             }

//             // Creating the table with the connection
//             this.connection.query(table, (err, results, fields) => {
//                 if (err) {
//                     console.error(err);
//                     return;
//                 }
//                 else {
//                     console.log('Users table created')
//                     connection.release();
//                 }

//             })
//         });
//     }

//     // Get one instance in the database
//     async getOne() {

//     }

//     // Get All instance in the database
//     async getALl() {

//     }

//     // Create record in the database
//     async create() {

//     }

//     // Update record in the database
//     async updadte() {

//     }

//     // Delete reocrd in the database
//     async delete() {

//     }
// }

// const mySqlClient = new MySqlClient('localhost', 'forenxy_user', 'forenxy_pwd', 'forenxy')
// module.exports = { mySqlClient };

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'forenxy_user',
//     password: 'forenxy_pwd',
//     database: 'forenxy'
// })
// let conn = 'mysql://localhost:3306/sakila'

// const connection = async () => (await mysql.createConnection({
//     host: 'localhost',

//     user: 'forenxy_user',
//     password: 'forenxy_pwd',
//     database: 'forenxy'
// }))



// async () =>  (await connection.connect((err) => {
//     if(err){
//       console.error(err);
//       return;
//     }
//     console.log('Connection established');
//   }))