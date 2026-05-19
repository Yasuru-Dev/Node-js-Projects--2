const express = require("express");
//const brypt = require("bcrypt");
const Note = require("../models/note");//import Note model from models folder
const router = express.Router();//create mini route manger

//create 
router.post("/notes", async(req,res)=>{
    try{
       const {title,content} = req.body;
       const newNote = new Note({title,content});
        await newNote.save();
        res.send('Note created successfully');
    }catch(error){
        res.status(500).send("Error creating note");
    };
    
});

//get all notes
router.get("/notes", async(req,res)=>{
    const notes = await Note.find();
    res.json(notes);
});

//get single note
router.get("/notes/:id", async(req,res)=>{
    const note = await Note.findById(req.params.id);

    if(!note){
        return res.status(404).send("Note not found");
    }
    res.json(note);
}
);

//delete note
router.delete("/notes/:id", async(req,res)=> {
    await Note.findByIdAndDelete(req.parms.id);
    res.send("Note deleted");
});

module.exports = router;
