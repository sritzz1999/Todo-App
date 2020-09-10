// required library
const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required: false
    },
    due_date:{
        type:Date,
        // default:Date
        required:true
    },
});

const todo=mongoose.model('todo',todoSchema);
module.exports=todo; 