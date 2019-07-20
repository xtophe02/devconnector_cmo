const jwt = require('jsonwebtoken')
require('dotenv').config()

const getUserId = (request, requireAuth = true) => {
    const header = request.req ? request.req.headers.authorization : request.connection.context.Authorization
    // console.log(request.req.headers)
    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return {id: decoded.userId, email: decoded.email}
    }

    if (requireAuth) {
        throw new Error('Authentication required')
    } 
    
    return null
}

module.exports = getUserId