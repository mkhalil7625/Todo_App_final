var express = require('express');
var router = express.Router();
// require the new Task model
var Task=require('../models/task');

/* GET home page. List of incomplete tasks*/
router.get('/', function(req, res, next) {
  //go to the task model and fetch all the documents(records)that are not completed
  Task.find({completed:false})
      .then((docs)=>{
        //send the response to the home page using the index view, reference the title and tasks placeholders
        res.render('index',{title:'Incomplete tasks', tasks:docs});
      })
      //forward to error handler
      .catch((err)=>{
        next(err);
      });
});
//create a new POST route to handle a post request to the /add
router.post('/add',function (req, res, next) {
  //check if something was entered in the text input
    if (req.body.text) {
        //create a new task
        //goto the form(req.body), fetch the text in the text box whose name is text and set as incompleted
        var t = Task({text: req.body.text, completed: false})
        //save the task as newTask and redirect to homepage if successful
        t.save().then((newTask) => {
            console.log("the new task is " + newTask);
            res.redirect('/');//creates a get request to the home page
        })
            .catch(() => {
                next(err);//forward error to error handler
            });
    }else {
      res.redirect('/')//else ignore and redierect to the home
    }
});
//post to mark a task as done. /done
router.post('/done', function (req, res, next) {
    //find the tasks by the id(_id)set as complete
    Task.findByIdAndUpdate(req.body._id,{completed:true})
    //name it originalTask. original task has a value if a document with this _id was found
        .then((originalTask)=>{
          if(originalTask){
            res.redirect('/'); //after pressing the button redirect to the incomplete list of tasks
          }else {
            //report task not found with 404 status
            var err=new Error('Not Found');
            err.status=404;
            next(err);
          }
        }).catch((err)=>{
          next(err);//redierct to error handler
    });
});
//GET completed tasks. will require a completed view
//the same as GET'/' but set the completed as true to get the completed tasks
router.get('/completed', function (req, res, next) {
    Task.find({completed:true})
        //name them docs
        .then((docs)=>{
          //redierect them to completed_tasks view and update the tasks placeholder in the view with docs
          res.render('completed_tasks', {tasks:docs});
        })
        .catch((err)=>{
          next(err);
        });
});
//post to /delete(activate the delete button)
router.post('/delete', function (req, res, next) {
  //what ever sent to the /delete url will be removed
Task.findByIdAndRemove(req.body._id)
    //name as deletedTask
    .then((deletedTask)=>{
      if (deletedTask){//if true redierct to home page after deleting the task
        res.redirect('/');
      }else{//else report task not found with 404 status
        var error=new Error('Task not found')
          error.status=404;
        next(error);
      }
    }).catch((err)=>{
      next(err);
});
});
//Post mark all tasks as done. use update many
router.post('/alldone',function (req, res, next) {
    //update all tasks from in-completed to completed
    Task.updateMany({completed:false},{completed:true})
        .then(()=>{
          res.redirect('/');
        }).catch((err)=>{
          next(err);
    });
});
//get details about each task. one route handler to handle all _ids
//use :_id is a wildcard to match any route with the same pattern
router.get('/task/:_id', function (req, res, next) {
    //'/task/:_id = /task/anything, whatever anything was will be in req.params._id
  //find all params with_id
    Task.findById(req.params._id)
        //each param save as doc
        .then((doc)=>{
          if (doc){
              //update the task view
            res.render('task', {task:doc});
          }else {
            next();
          }
        }).catch((err)=>{
          next(err);
    });
});
//Post delete all tasks . use delete many
router.post('/deleteDone',function (req, res, next) {
    //delete all tasks where complete:true
    Task.deleteMany({completed:true})
        .then(()=>{
            res.redirect('/');
        }).catch((err)=>{
        next(err);
    });
});
module.exports = router;
