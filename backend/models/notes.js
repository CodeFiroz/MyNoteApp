// import mongoose module
import mongoose from "mongoose";

// Define the schema
const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Title must be at least 3 characters long.'],
        },
        slug: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            minlength: [5, 'Content must be at least 5 characters long.'],
        },
        background: {
            type: String,
            default: '#FAAC05',
        },
        isBin: {
            type: Boolean,
            default: false,
        },
        author: {
            type : mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

// Create the Note model
const Note = mongoose.model("Note", NoteSchema);

// Export the model as default
export default Note;
