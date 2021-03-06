const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Encrypt User Password
UserSchema.methods.hashPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}


UserSchema.methods.comparePassword = password => {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)