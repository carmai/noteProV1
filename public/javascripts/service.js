/**
 * Created by Carmine on 01.11.2016.
 */
class Service {
    constructor() {
        this.name = "model";
        this.notes = [];

    }

    doSomething() {
        console.log("I'm " + this.name + " notes are: " + this.notes +
            " my array length is: " + this.notes.length);
    }

    makeNote(title, content, importance, dueDate){

        this.notes.push(new Note(title, content, importance, dueDate));
        //this.saveData(); // TODO edit function saveData()
    }

    editNote(i, title, content, importance, dueDate){
        console.log("I model have received the message to edit a note with the id: " + i);
        this.notes[i].title = title;
        this.notes[i].content = content;
        this.notes[i].importance = importance;
        this.notes[i].dueDate = dueDate;
        // updating affected variables
        this.notes[i].created = new Date();
        console.log("diese note heisst: " + this.notes[i].name);
        // TODO save data to server


    }

    deleteNote(i){
        console.log("I model am deleting the note. The actual array is" + this.notes);
        var notes1 = [];
        var k;
        for (k = 0; k < app.model.notes.length; k++){
            if (k != i) {
                notes1.push(this.notes[k]);

            }
        }
        this.notes = notes1;
        console.log("I have deleted the note. The actual array is" + this.notes);
        // TODO savedata to server

    }

    sortByImportance() {
    this.notes.sort(function(a, b){return b.importance - a.importance});
    app.ctrl.applyTemplate();
}

    sortByFinishDate() {
        //this.notes.sort(function(a, b){return a.dueDate - b.dueDate});
        this.notes.sort(function(a,b){
            return new Date(b.dueDate) - new Date(a.dueDate);
        });
        app.ctrl.applyTemplate();
    }

    sortByCreatedDate(){
        this.notes.sort(function(a, b){return a.created - b.created});
        app.ctrl.applyTemplate();
    }


    modifyFinishState(noteNumber, finishedCheck){
        if (finishedCheck == true){
            console.log("set finished code 1");
            this.notes[noteNumber].done = 1;
            console.log("Note number: " + noteNumber + " Code has been set to " + this.notes[noteNumber].done);
            } else {
            console.log("set not finished code 0");
            this.notes[noteNumber].done = 0;
            console.log("Note number: " + noteNumber + " Code has been set to " + this.notes[noteNumber].done);
        }
        // TODO start saveData()
    }


/*
    saveData(){
        // TODO call services to save data

    }
*/
    // test
    makeJson(){
        /* works
        var jsonNotes = JSON.stringify(this.notes);
        console.log(jsonNotes);

        var arrayNotes = JSON.parse(jsonNotes);
        console.log(arrayNotes);
        console.log(this.notes);
        this.notes = arrayNotes;
        app.model.makeNote("note 3", "testen", 5, "2016-11-06");
        app.ctrl.applyTemplate();
*/
    }

}