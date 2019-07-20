const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
    if (password.length < 5) {
        throw new Error('Password must be 5 characters or longer.')
    }

    return bcrypt.hash(password, 10)
}

module.exports = hashPassword