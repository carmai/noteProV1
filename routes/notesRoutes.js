var express = require('express');
var router = express.Router();

var commands = require('../controller/notesController.js');

// Server Memory Array Routers

router.post("/add", commands.addNote);
router.post("/edit", commands.editOneNote);
router.post("/remove", commands.removeOneNote);
router.post("/sortImportance", commands.sortImportance);
router.post("/sortCreation", commands.sortCreation);
router.post("/sortFinishDate", commands.sortFinishDate);


// Database Routers

router.post("/deleteOne", commands.deleteNoteOnServer);
router.post("/saveDataOnServer", commands.deleteNoteOnServer);

// testrauter
//router.post("/showAll", commands.zeigeAlles);

//router.get("/", commands.showIndex);
//router.get("/orders", commands.createOrder);
//router.get("/orders/:id/", commands.showOrder);
//router.delete("/orders/:id/", commands.deleteOrder);

module.exports = router;