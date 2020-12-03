const mongoose = require('mongoose');
  const Schema  = mongoose.Schema;


var schemaRes = new Schema({
    connectionName: {
        type: String,
        required:true
    },
    dateTime: {
        type: Number,
        required:true
    },
    startTime: {
        type: Number,
        required:true
    },
    endTime: {
        type: Number,
        required:true
    },
    connectionTopic: {
        type: String,
        required:true
    },
    details: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    hostName: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    image: {
        type: String,
        default:'/breed/Golden_Retriever.png'
    }
},{ timestamps: true});

const Connection = mongoose.model('connection', schemaRes);

module.exports = Connection;