var store = require("../services/notesStore.js");

/*

var notes = [
    {id: 1, title: "note1", content: "hallo", importance: 4, dueDate: "2016-11-10"},
    {id: 2, title: "note2", content: "hallo", importance: 3, dueDate: "2016-11-10"}
];

*/

// TODO Array must be populated at start with data from DB
var notes = [
   // {}
];

module.exports.editOneNote = function(req, res)
{
    var j = parseInt(req.body.idLocal);
    var idServer = j+1;

    var toEditNote = {
        id: idServer || '',
        title: req.body.title || '',
        content: req.body.inhalt || '',
        importance: req.body.importance || '',
        dueDate: req.body.dueDate || ''
    };

    notes[j] = toEditNote;
    var editedNote = notes[j];

    /* suche die Note und setze die neuen werte rein
    for ( var i = 0; i < notes.length; i++){
        if(notes[i].id == toEditNote.id) {
            notes[i].id = toEditNote.id;
            notes[i].title = toEditNote.title;
            notes[i].content = toEditNote.content;
            notes[i].importance = toEditNote.importance;
            notes[i].dueDate = toEditNote.dueDate;
            editedNote = notes[i];
        }

    }
    */

    res.json(editedNote || {});


};

module.exports.removeOneNote = function(req, res)
{
    var noteNummer = parseInt(req.body.noteNummer);

    var notesReference = notes;
    var notes1 = [];
    var k;

    for (k = 0; k < notes.length; k++){
        if (k != noteNummer) {
            notes1.push(notes[k]);

        }
    }


    notes = notes1;

    //res.json(notesReference[noteNummer] || {});

    res.type('text/html');
    res.write("<html>");
    res.write("<p>i ist:" + noteNummer +"</p>");
    res.write("<p>Titel:" + notesReference[noteNummer].title +"</p>");
    res.end("</html>");









};

module.exports.addNote = function(req, res)
{


    var newNote = {
        id: notes.length + 1,
        title: req.body.title || '',
        content: req.body.inhalt || '',
        importance: req.body.importance || '',
        dueDate: req.body.dueDate || ''
    };
    notes.push(newNote);
    res.json(newNote);

//res.sendfile('/index.html', {root: 'C:/Users/Carmine/noteProV1/' + '/public' })
/*
    var fs = require('fs');
    res.set('content-type','text/html');
    res.status(200);
    //res.redirect('C:/Users/Carmine/noteProV1/' + '/public');
    res.send(fs.readFileSync('C:/Users/Carmine/noteProV1/' + '/public'+'/index.html','utf8'));
    res.end();
*/
};






module.exports.sortImportance =  function (req, res)
{

    if (notes.length != 0) {

        notes.sort(function(a, b){return b.importance - a.importance});
    }

    res.type('text/html');
    res.write("<html>");
    res.write("<p>Data sorted</p>");
    res.end("</html>");
    /*  -- Test
    res.write("<p>"+ notes[0].importance + "</p>");
    res.write("<p>"+ notes[1].importance + "</p>");
    res.write("<p>"+ notes[2].importance + "</p>");
    */


};

module.exports.sortCreation =  function (req, res)
{

    if (notes.length != 0) {

        notes.sort(function(a, b){return a.id - b.id});
    }

    res.type('text/html');
    res.write("<html>");
    res.write("<p>Data sorted</p>");
    res.end("</html>");
    /*  -- Test
     res.write("<p>"+ notes[0].importance + "</p>");
     res.write("<p>"+ notes[1].importance + "</p>");
     res.write("<p>"+ notes[2].importance + "</p>");
     */


};

module.exports.sortFinishDate =  function (req, res)
{

    if (notes.length != 0) {

        //notes.sort(function(a, b){return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()});
        //notes.sort(function(a, b){return (a.dueDate) - (b.dueDate)});
        notes.sort(function(a,b){
            return new Date(b.dueDate) - new Date(a.dueDate);
        });
    }

    res.type('text/html');
    res.write("<html>");
    res.write("<p>Data sorted</p>");
    res.end("</html>");
    /*  -- Test
     res.write("<p>"+ notes[0].dueDate + "</p>");
     res.write("<p>"+ notes[1].dueDate + "</p>");
     res.write("<p>"+ notes[2].dueDate + "</p>");
     */


};

/*
* Do not include this code from the lecture examples
*
* */

// Umbauen:
module.exports.showOrder = function(req, res)
{
    store.get(req.params.id, function(err, note) {
        res.type('text/html');
        res.write("<html>");
        if (note) {
            res.write("<p>Order-Number: " + note._id + "</p>");
            res.write("<p>Status: " + note.state + "</p>");
            if (note.state == "OK") {
                res.write("<form action='/orders/" + note._id + "' method='post'><input type='hidden' name='_method'  value='delete'><input type='submit' value='Delete order'></form>");
            }
        }
        res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
        res.end("</html>");
    });
};


module.exports.deleteNoteOnServer =  function (req, res)
{

    store.delete(req.body.name); // function call publicRemoveOne

        res.type('text/html');
        res.write("<html>");
        res.write("<p>Status: Note deleted</p>");
        res.end("</html>");

    /*
    store.delete(  req.params.id , function(err, order) {
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Order-Number: " + order._id + "</p>");
        res.write("<p>Status: " + order.state + "</p>");
        res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
        res.end("</html>");
    });
    */


};


module.exports.saveData =  function (req, res)
{


    res.type('text/html');
    res.write("<html>");
    res.write("<p>Data sorted</p>");
    res.end("</html>");



};
