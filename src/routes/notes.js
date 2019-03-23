const express = require("express");
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

//LIST ALL NOTES
router.get('/', isAuthenticated, async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/all-notes', {notes});
});

//EDIT ONE NOTE
router.get('/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note});
});

//UPDATE ONE NOTE
router.put('/edit-note/:id', isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
});

//DELETE ONE NOTE
router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
});

//SHOW FORM ADD NOTE
router.get('/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

//SAVE FORM SEND
router.post('/new-note', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    const errors = [];

    if ( !title ){
        errors.push({text: 'Please Write a Title'});
    }

    if ( !description){
        errors.push({text: 'Please Write a Description'});
    }

    if (errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newTask = new Note({title, description});
        newTask.user = req.user.id;
        console.log(newTask);
        await newTask.save();
        req.flash('success_msg', 'Note Added Successfully');
        res.redirect('/notes');
    }

    // console.log(req.body);

});

//ESPORT ROUTES
module.exports = router;