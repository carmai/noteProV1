var Datastore = require('nedb');
//var db = new Datastore({ filename: './data/order.db', autoload: true });
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(id, title, content, importance, dueDate)
{
    this.id = id;
    this.title = title;
    this.content = content;
    this.importance = importance;
    this.dueDate = dueDate;
    this.created = JSON.stringify(new Date());

}


function publicAddNote(id, title, content, importance, dueDate, callback)
{
    var note = new Note(id, title, content, importance, dueDate);
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemoveOne(id) {

    // remove all

    /*

    db.remove({  }, { multi: true }, function (err, numRemoved) {
        // numRemoved = 3
        // All planets from the solar system were removed
    });

    */

// Remove multiple documents
    /*   db.remove({ orderedBy: 'unkown' }, { multi: true }, function (err, numRemoved) {
        // numRemoved = 3
        // All planets from the solar system were removed
    });


    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, doc) {
        publicGet(id,callback);
    });
    */


}

function publicGetOne(id, callback)
{   db.findOne({ id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicFindAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNote, delete : publicRemoveOne, get : publicGetOne, all : publicFindAll};