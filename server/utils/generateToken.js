const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = ({userId, email}) => {
    
    return jwt.sign({ userId, email }, process.env.JWT_SECRET, { expiresIn: '3 hours' })
}

module.exports = generateToken