//require mongoose library
var mongoose=require('mongoose');
//define Schema as mongoose schema
var Schema=mongoose.Schema;
//define a schema and name it taskSchema- what fields will a task document have?
var taskSchema=new Schema({
    text:String,
    completed:Boolean
});
//compile a taskSchema descritption into mongoose model
//with the name Task
var Task = mongoose.model('Task', taskSchema);
//export Task to the application
module.exports=Task;