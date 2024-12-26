// import the note schema 
import Note from "../models/notes.js"; 


// Controller to get all notes
export const getAllNotes = async (req, res) => {
    try {
        let mynotes = await Note.find({isBin: false}).sort({ updatedAt: -1 });
        res.status(200).json(mynotes);
    } catch (error) {
        console.error("Error while fetching notes:", error);
        res.status(401).send({ "message": `Error while fetching users :: ${error}` });
    }
};

// Controller to get all notes
export const getBinNotes = async (req, res) => {
    try {
        let mynotes = await Note.find({isBin: true}).sort({ updatedAt: -1 });
        res.status(200).json(mynotes);
    } catch (error) {
        console.error("Error while fetching notes:", error);
        res.status(401).send({ "message": `Error while fetching users :: ${error}` });
    }
};

// Controller to get all notes
export const GetOneNote = async (req, res) => {
    try {
        let slug = req.params.slug;
        let mynotes = await Note.findOne({slug: slug});
        res.status(200).json(mynotes);
    } catch (error) {
        console.error("Error while fetching notes:", error);
        res.status(401).send({ "message": `Error while fetching users :: ${error}` });
    }
};


// Controller to create a new note
export const createNote = async (req, res) => {
    try {
        let { title, content, background } = req.body;

        let slug = title.split(' ').join('-').toLowerCase();

        let newNote = new Note({ title, content, slug, background });

        await newNote.save();
        res.status(201).send({ "message": "Successfully Inserted Data" });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(400).send({ message: 'Error inserting data', error });
    }
};

// Controller to delete a note
export const deleteNote = async (req, res) => {
    try {
        let noteId = req.params.id;
        let noteToDelete = await Note.findByIdAndDelete(noteId);

        if (!noteToDelete) {
            return res.status(404).send({ message: 'Note not found' });
        }

        res.status(200).send({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error Deleting note:', error);
        res.status(400).send({ message: 'Error deleting data', error });
    }
};

// Controller to delete a note
export const updateNote = async (req, res) => {
    try {

        const noteId = req.params.id;  // Use params.id from the route parameter
        const { title, content, background } = req.body;

        let slug = title.split(' ').join('-').toLowerCase();

        let updatedNote = await Note.findByIdAndUpdate(noteId, { title, content, background, slug }, { new: true });

        if (!updatedNote) {
            return res.status(404).send({ message: 'Note not found or could not be updated' });
        }
    
        res.status(200).json({ message: 'Note updated successfully', updatedNote });
     

    } catch (error) {
        console.error('Error updating note:', error);
        res.status(400).send({ message: 'Error updating note', error });
    }
};


// Controller to delete a note
export const MoveToBin = async (req, res) => {
    try {

        const noteId = req.params.id;  // Use params.id from the route parameter
        let isBin = true;

        let MoveToBin = await Note.findByIdAndUpdate(noteId, { isBin }, { new: true });

        if (!MoveToBin) {
            return res.status(404).send({ message: 'Error' });
        }
    
        res.status(200).json({ message: 'Note in bin', MoveToBin });
     

    } catch (error) {
        console.error('Error bin note:', error);
        res.status(400).send({ message: 'Error bin note', error });
    }
};

// Controller to delete a note
export const RestoreNote = async (req, res) => {
    try {

        const noteId = req.params.id;  // Use params.id from the route parameter
        let isBin = false;

        let MoveToBin = await Note.findByIdAndUpdate(noteId, { isBin }, { new: true });

        if (!MoveToBin) {
            return res.status(404).send({ message: 'Error' });
        }
    
        res.status(200).json({ message: 'Restore NOte', MoveToBin });
     

    } catch (error) {
        console.error('Error Restore :', error);
        res.status(400).send({ message: 'Error in Restore', error });
    }
};
