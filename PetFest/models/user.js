const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


// const savedConnection = new Schema({
//     key: {
//         type: Schema.Types.ObjectId,
//         ref: 'connection'
//     },
//     val: {
//         type: String,
//         required: true
//     }

// })

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    // savedConnection: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'connection'
    //     // default: []
    // }]
    // savedConnection: [savedConnection]
    savedConnection: [{
        _id: false,
        key: {
            type: Schema.Types.ObjectId,
            ref: 'connection'
        },
         val: {
             type: String,
            required: true
        }
    }
        ]
});




userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        }).catch(err => {
            console.log('error in the password');
            next();
        })
});



userSchema.methods.comparePassword = function(inputPassword){
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;