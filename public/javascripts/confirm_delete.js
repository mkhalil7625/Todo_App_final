// this will target the delete button in the main form id=delete-button
var deleteButtons=document.querySelectorAll('.delete-button');
deleteButtons.forEach(function (button) {
    //add event listener on click each time on the delete button
    button.addEventListener('click',function(ev){
        //show a confirm dialog
        var okToDelete=confirm("Delete task - are you sure?");
        //if user presses no, prevent the form submit
        if (!okToDelete){
            ev.preventDefault(); // prevent the click event propagation
        }
    })
});
//same as above
var deleteButtonCompleteTasks=document.querySelectorAll(".all-delete-button");
deleteButtonCompleteTasks.forEach(function (button) {
    button.addEventListener('click',function (ev) {
        var okToDeleteAllTasks=confirm("Delete all task?");
        if (!okToDeleteAllTasks){
            ev.preventDefault();
        }
    })
})