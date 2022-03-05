const {Schema, model} = require("mongoose")

const User = new Schema({
    telegram: {type: String, required: true, index:true},
    email: {type: String, required: true, unique: true, index:true},
    skills: {type: String, required: true, index:true}
})

module.exports = model('User', User);