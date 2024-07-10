const mongoose=require('mongoose'); //here we importing the mongoose module and then we are creating a schema object from the mongoose module.
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //ye kya karega na kya ki sabhi user ka apna apna store karne me help karega
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
  });
  module.exports=mongoose.model('notes',NotesSchema);