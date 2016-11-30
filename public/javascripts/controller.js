/**
 * Created by Carmine on 31.10.2016.
 */
class Controller {
    constructor() {
        this.name = "controller";


    }

    doSomething() {
        console.log("I'm " + this.name);
    }



    applyTemplate(){
       // app.service.doSomething();
        if (app.model.notes.length == 0) {
            app.view.templateZero();
        } else {
            app.view.templateDefault();
        }

    }

    applyEditNoteTemplate(){
        app.view.editNoteTemplate();
    }

    applyEditTemplate(i){
        console.log("i in applyedittemplate ist gleich: " + i);
        app.view.editTemplate(i)
    }

    applyActiveOnlyTemplate(){
        app.view.activeOnlyTemplate();
    }


    formValidate(){
        // Validation of data for new notes
        console.log("I am validating");



        var d = new Date();
        var dDay = d.getDay();
        var dMonth = d.getMonth();
        var dYear = d.getFullYear();

        var title = document.getElementById("title").value;
        console.log(title);

        var content = document.getElementById("inhalt").value;
        console.log(content);

        var importance = document.getElementById("importance").value;
        console.log(importance);

        var dueDateString = document.getElementById("dueDate").value;
        console.log(dueDateString);



        if (title == "") {
            alert("Invalid data\nTitle must be filled out");
        } else if (content == "") {
            alert("Invalid data\nContent must be filled out");
        } else if (dueDateString == "") {
            alert("Invalid data\nDue date must be provided");
        } else {

            var dueDate = new Date(dueDateString);

            //app.model.makeNote(title, content, importance, dueDate);
            this.executeMakeNote(title, content, importance, dueDate);
            app.ctrl.applyTemplate();
        }

    }


    executeMakeNote(title, content, importance, dueDate){
        app.model.makeNote(title, content, importance, dueDate);
    }


    editFormValidate(i){
        // Validation of data for new notes
        console.log("I am validating");



        var d = new Date();
        var dDay = d.getDay();
        var dMonth = d.getMonth();
        var dYear = d.getFullYear();

        var title = document.getElementById("title").value;
        console.log(title);

        var content = document.getElementById("inhalt").value;
        console.log(content);

        var importance = document.getElementById("importance").value;
        console.log(importance);

        var dueDateString = document.getElementById("dueDate").value;
        console.log(dueDateString);



        if (title == "") {
            alert("Invalid data\nTitle must be filled out");
        } else if (content == "") {
            alert("Invalid data\nContent must be filled out");
        } else if (dueDateString == "") {
            alert("Invalid data\nDue date must be provided");
        } else {

            var dueDate = new Date(dueDateString);

            //app.model.makeNote(title, content, importance, dueDate);
            this.executeEditNote(i, title, content, importance, dueDate);
            app.ctrl.applyTemplate();
        }
    }

    executeEditNote(i, title, content, importance, dueDate){
        // calls function in model to edit the note
        console.log("I am sending the request to the model to edit the note");
        app.model.editNote(i, title, content, importance, dueDate);

    }

    executeDeleteNote(i){
        console.log("I am going to call model to delete note " + i);
        app.model.deleteNote(i);
        app.ctrl.applyTemplate();

    }

    executesortByImportance(){
        app.model.sortByImportance();
    }

    executeSortByFinishDate(){
        app.model.sortByFinishDate();
    }

    executeSortByCreatedDate(){
        app.model.sortByCreatedDate();
    }


    finishState(i){

        var noteNumber = document.getElementById("noteNumber" + i).value;
        //console.log("Notenumber is: " + noteNumber);
        var finishedCheck = document.getElementById("noteNumber" + i).checked;
        //console.log("finished is: " + finishedCheck);

        app.model.modifyFinishState(noteNumber, finishedCheck);

    }

    applyChangeCSS(){

        var styleValue = document.getElementById("styleSwitcher").value;
        console.log(styleValue);

        if (styleValue == 0){
            app.view.changeCSS("../stylesheets/style.css", 0);
        } else {
            app.view.changeCSS("../stylesheets/style1.css", 0);
        }


    }

    applyShowDataForm(){
        app.view.showDataForm();
    }

    closeApp(){

    }

    submitFunction(){
        document.editNoteForm.onsubmit = function () { return app.service.makeData(this.title.value, this.inhalt.value, this.importance.value, this.dueDate.value); };
    }

    onCreatedNote(response) {
        // call view to render & update
        app.view.displayOutput(response);
    }


}
