require('dotenv').config()
const bcrypt = require('bcrypt')

const salt_round = process.env.SALT_ROUND;

const hashPassword = async (password) => {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10)
  
      // Hash password
      return await bcrypt.hash(password, salt)
    } catch (error) {
      console.log(error)
    }
  
    // Return null if error
    return null
  }


  const comparePassword = async (password, hash) => {
    try {
      // Compare password
      return await bcrypt.compare(password, hash)
    } catch (error) {
      console.log(error)
    }
  
    // Return false if error
    return false
  }



module.exports = {
    hashPassword,
    comparePassword
}