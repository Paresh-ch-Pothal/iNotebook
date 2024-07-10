const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');


//Route-1: used to Fetch all the notes using GET: /api/notes/fetchallnotes  ::: login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {  //req: request and res: response 
    //here i used fetchuser function so i get the all user information through the function and all that stored in req.user
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json([notes]);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error has been occured")
    }
})

//Route-2: used to add the notes using POST: /api/notes/addnote ::: login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title: ").isLength({ min: 5 }),
    body('description', "Description must be atleast 5 charaters").isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await notes.save();  //here it is used to add note and save using .save() function (it saves in the database)
        res.json(savednote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error has been occured")
    }

})

//Route-3: updating notes using PUT: /api/notes/updatenote ::: login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //create a newnote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updates and update it
        let note = await Notes.findById(req.params.id);

        if (!note) { //here we are checking that whether the note which is to be updated is exist or not
            return res.status(404).send("Not found");
        }
        if (note.user.toString() != req.user.id) {  //here we are checking that whether the id of user is equal to the id of the note
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })  //here it is used to update the notes by using the set method
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error has been occured")
    }
})


//Route-3: deleting an existng notes using DELETE: /api/notes/deletenote ::: login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // const { title, description, tag } = req.body;   : it is not required

        //to check whether the note to be deleted is present or not
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("The note is not found");
        }
        //allow only if the note is belongs to the same user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }

        //it is used to find the note and delete
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "The note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error has been occured")
    }

})

module.exports = router;