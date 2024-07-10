const mongoose=require('mongoose');  //here importing mongoose to the User,js
const { Schema } = mongoose;
 
//using a proper format to store data in a database of mongoDB
const UserSchema = new Schema({
    name: {
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
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now //Date.now is a function
    }
  });

  const User=mongoose.model('user', UserSchema); //used to create a model for storing data in a database of mongoDB
//   User.createIndexes(); //it is used to create indexes in the database of mongoDB
  module.exports=User; //used to exports a module (called User)
