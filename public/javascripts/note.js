/**
 * Created by Carmine on 01.11.2016.
 */
class Note {
    constructor(title, content, importance, dueDate) {
        this.title = title;
        this.content = content;
        this.importance = importance;
        this.dueDate = new Date(dueDate);

        this.name = "note";
        this.created = new Date();
        //this.hoursLeft = Math.abs(this.dueDate - this.created) / 3600000;
        this.done = 0; // 0 = not finished (TODO remember to change into boolean)

    }

    doSomething() {

        console.log("I'm " + this.name + " with title: " + this.title +
            " content is: " + this.content + " and importance is: " + this.importance +
            ". My due date is: " + this.dueDate + " I was created: "
            + this.created );
    }
}