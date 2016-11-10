/**
 * Created by Carmine on 01.11.2016.
 */
class Viewer {
    constructor() {
        this.name = "views";

    }

    doSomething() {
        console.log("I'm " + this.name );
    }

    templateZero(){
        this.insertMenu();
        document.getElementById("noteContent").innerHTML = "<h3></h3>";
    }

    templateDefault(){

        /* Menu */
        this.insertMenu();



        /* core */
        var serverID;
        var now = new Date();
        var notesList = "";
        var i;

        for (i = 0; i < app.model.notes.length; i++){
            serverID = i + 1;


            notesList += "<fieldset><p><b>TITLE: " + app.model.notes[i].title + "</b> Local id: " + i +
                " Server id: " + serverID + "</p><p>" + app.model.notes[i].content + "</p><br>" +
                "<small>Importance attribute: " + app.model.notes[i].importance + "</small><br>" +
                "<small>Created: " + app.model.notes[i].created + "</small><br><br>" +
                "Finished: <input onchange='app.ctrl.finishState(this.value)' type='checkbox'" +
                "value = '" + i + "' id='noteNumber" + i + "'>" +
                " Time left: " + Math.round(Math.abs(app.model.notes[i].dueDate - now) / 3600000) +
                " hours<br><br>"+
                "<p><button class='formButton' id='editNote' " + i +
                " onclick='app.ctrl.applyEditTemplate(" + i + ")'>Edit</button></p><p>" +
                "<form method='post' action='/remove' target='_blank'>" +
                "<input type='hidden' name='noteNummer' value="+ i + ">" +
                " <input type='submit' class='formButton' id='deleteNote' value='Delete' " + i +
                " onclick='app.ctrl.executeDeleteNote(" + i + ")'></form></p>" +
                "</fieldset>";

        }
        document.getElementById("noteContent").innerHTML = notesList;
        document.getElementById("edit").innerHTML = "";

    }

    editNoteTemplate(){
        //TODO this template is for editing a new note
        console.log("create note template has been activated");
        var createNoteFormString = "<div class='createNote' id='createNote'><form method='post' action='/add' id = 'editNoteForm' target='_blank'> <fieldset> <legend>Title</legend> <p>" +
            "<label for='title'>Title: </label> <input type='text'  required name='title' placeholder='title' id='title' ></p></fieldset><fieldset>" +
            "<legend>Content</legend><p><label for='inhalt'>Content: </label><textarea required name='inhalt' placeholder='content' id='inhalt' >" +
            "</textarea></p></fieldset><fieldset><legend>Importance</legend><p><label for='importance'>Importance: </label><select name='importance'" +
            " id='importance' class='formSelect'><option value='1'>Level 1: very low</option><option value='2'>Level 2: low</option>" +
            "<option value='3'>Level 3: medium</option>" +
            "<option value='4'>Level 4: high</option><option value='5'>Level 5: very high</option></select></p></fieldset><fieldset><legend>Due Date" +
            "</legend><p><label for='dueDate'>Due date: </label><input type='date' required name='dueDate' id='dueDate'></p></fieldset>" +
            "<p><input type='submit' class='formButton' id='sendData' onclick='app.ctrl.formValidate()'>" +
            " <button class='formButton' id='cancel' type='reset' value='Reset'>Reset</button></form></p></div>" ;

        document.getElementById("edit").innerHTML = createNoteFormString;


    }

    editTemplate(i){

        //var idServer = i+1;

        var editNoteFormString = "<div class='createNote' id='createNote'><form method='post' action='/edit' id = 'editNoteForm' target='_blank'> <fieldset> <legend>Title</legend> <p>" +
            "<label for='title'>Title: </label> <input type='text' required name='title' placeholder='title' id='title' ></p></fieldset><fieldset>" +
            "<legend>Content</legend><p><label for='inhalt'>Content: </label><textarea required name='inhalt' placeholder='content' id='inhalt' >" +
            "</textarea></p></fieldset><fieldset><legend>Importance</legend><p><label for='importance'>Importance: </label><select name='importance'" +
            " id='importance' class='formSelect'><option value='1'>Level 1: very low</option><option value='2'>Level 2: low</option>" +
            "<option value='3'>Level 3: medium</option>" +
            "<option value='4'>Level 4: high</option><option value='5'>Level 5: very high</option></select></p></fieldset><fieldset><legend>Due Date" +
            "</legend><p><label for='dueDate'>Due date: </label><input type='date' required name='dueDate' id='dueDate'></p></fieldset>" +
            "<input type='hidden' name='idLocal' value="+ i + ">" +
            "<p><input type='submit'  class='formButton' id='sendData' onclick='app.ctrl.editFormValidate(" + i + ")'>" +
            " <button class='formButton' id='cancel' type='reset' value='Reset'>Reset</button></form></p></div>" ;
        document.getElementById("edit").innerHTML = editNoteFormString;

        document.getElementById("title").value = app.model.notes[i].title;
        document.getElementById("inhalt").value = app.model.notes[i].content;
        document.getElementById("importance").value = app.model.notes[i].importance;

        var year = app.model.notes[i].dueDate.getFullYear();
        var month = app.model.notes[i].dueDate.getMonth()+1;
        var dayInteger = app.model.notes[i].dueDate.getDate();
        if (dayInteger < 10){
            dayInteger = "0" + dayInteger;
        }
        var dateString = year + "-" + month + "-" + dayInteger;
        document.getElementById("dueDate").value = dateString;

    }


    activeOnlyTemplate(){

        /* Menu */
        this.insertMenu();

        /* core */
        var now = new Date();
        var notesList = "";
        var i;

        for (i = 0; i < app.model.notes.length; i++){

            if (app.model.notes[i].done == 0) {

            notesList += "<fieldset><b>" + app.model.notes[i].title + "</b> id = " + i + "<p>" + app.model.notes[i].content + "</p><br>" +
                "<small>Importance attribute: " + app.model.notes[i].importance + "</small><br>" +
                "<small>Created: " + app.model.notes[i].created + "</small><br><br>" +
                "Finished: <input onchange='app.ctrl.finishState(this.value)' type='checkbox'" +
                "value = '" + i + "' id='noteNumber" + i + "'>" +
                " Time left: " + Math.round(Math.abs(app.model.notes[i].dueDate - now) / 3600000) +
                " hours<br><br><button class='formButton' id='editNote' " + i +
                " onclick='app.ctrl.applyEditTemplate(" + i + ")'>Edit</button>" +
                " <button class='formButton' id='deleteNote' " + i + " onclick='app.ctrl.executeDeleteNote(" + i + ")'>Delete</button>" +
                "<br><br></fieldset>";
            }
        }
        document.getElementById("noteContent").innerHTML = notesList;
        document.getElementById("edit").innerHTML = "";

    }



    insertMenu(){
        document.getElementById("navLeft").innerHTML =
            "<button class='button' id='createNote' onclick='app.ctrl.applyEditNoteTemplate()'>Create new note</button>";
       /* document.getElementById("navRight").innerHTML =
            "<select class='selectStyle' id='styleSwitcher' onchange='myFunction()'>" +
            "<option class='selectStyle' value='default'>Default Style</option>" +
            "<option class='selectStyle' value='fancy'>Fancy Style</option></select>" ; */
        document.getElementById("leftMenu").innerHTML =
            "<select class='selectStyle' id='styleSwitcher' onchange='app.ctrl.applyChangeCSS()'>" +
            "<option class='selectStyle' value='0'>CSS 1</option>" +
            "<option class='selectStyle' value='1'>CSS 2</option></select></br></br>" +
            "<button class='buttonl' id='showAll' onclick='app.ctrl.applyTemplate()'>Show all items</button></br>" +
            "<button class='buttonl' id='hideFinished' onclick='app.ctrl.applyActiveOnlyTemplate()'>Hide finished</button>" +
        "<form method='post' action='/sortImportance' target='_blank'>" +
        " <input type='submit' class='buttonl' id='sortImportance' value='Sort by importance' onclick='app.ctrl.executesortByImportance()'></form>" +
            "<form method='post' action='/sortCreation' target='_blank'>" +
            "<input type='submit' class='button1' id='sortCreatedDate' value='Sort by created date' onclick='app.ctrl.executeSortByCreatedDate()'></form>" +
            "<form method='post' action='/sortFinishDate' target='_blank'>" +
            "<input type='submit' class='button1' id='sortFinishDate' value='Sort by finished date' onclick='app.ctrl.executeSortByFinishDate()'></form>";

        /*save button*/
        this.insertSaveDataButton();

    }

    changeCSS(cssFile, cssLinkIndex){

        var link0 = document.getElementsByTagName("link").item(cssLinkIndex);

        var link1 = document.createElement("link");
        link1.setAttribute("rel", "stylesheet");
        link1.setAttribute("type", "text/css");
        link1.setAttribute("href", cssFile);

        document.getElementsByTagName("head").item(0).replaceChild(link1, link0);

    }

    insertSaveDataButton(){

        var saveButton =
        "<input type='submit' class='button' id='saveDataButton' value='Save Data and close' onclick='app.ctrl.applyShowDataForm()'>";

    //<button class='formButton' id='deleteNote' " + i + " onclick='app.ctrl.executeDeleteNote(" + i + ")'>Delete</button>

        document.getElementById("footer").innerHTML = "<center>"+saveButton+"</center>";

    }

    showDataForm(){
        var formHeader = "<form method='post' action='/saveDataOnServer' >";
        var inputButton = "<input type='submit' class='button' id='saveDataButton' value='Save Data and close' onclick='app.ctrl.closeApp()'></form>";
        var formString = "";

        for (var i = 0; i < app.model.notes.length; i++){

            formString += "<fieldset> <legend>ID</legend> <p>" +
            "<label for='id'>ID: </label> <input type='text' name="+ i + " id='id' value =" + i +
            "></p></fieldset>"+"<fieldset> <legend>Title</legend> <p>" +
            "<label for='title'>Title: </label> <input type='text' name=" + app.model.notes[i].title +
            " id='title' value =" + app.model.notes[i].title +
            "></p></fieldset><fieldset>" +
            "<legend>Content</legend><p>" +
             "<label for='content'>Content: </label><input type='text' name="+ app.model.notes[i].content +" id='inhalt'" +
             "value =" + app.model.notes[i].content +" >" +
            "</p></fieldset><fieldset><legend>Importance</legend><p><label for='importance'>Importance: </label>"+
            "<<input type='text' name="+ app.model.notes[i].importance +" id='importance' value ="+ app.model.notes[i].importance +"></p>" +
            " </input></p></fieldset><fieldset><legend>Due Date" +
            "</legend><p><label for='dueDate'>Due date: </label><input type='text' name="+app.model.notes[i].dueDate.toJSON()+" id='dueDate'"+
            " value = "+app.model.notes[i].dueDate.toJSON()+"></p></fieldset>";
        }

        var total = formHeader + formString + inputButton;
        document.getElementById("noteContent").innerHTML = total;

    }

}