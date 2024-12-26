// import require packages
import express from 'express';
import cors from 'cors'
import { environment } from './config/environment.js';
import connectDB from './config/db.js';
import { getAllNotes, createNote, deleteNote, updateNote, MoveToBin, RestoreNote, GetOneNote, getBinNotes } from './controllers/notesController.js';
import { getUsers, loginUser, registerUser } from './controllers/usersController.js';

// initializing the app
const app = express();

// Allow all origins
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
  }));

// Define port from environment variables 
const PORT = environment.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();


// home route 
app.get('/', (req, res)=>{
    res.status(200).send("Hi Server");
})

// user Routes setup
app.get('/users', getUsers);  // Fetch all users
app.post('/register', registerUser);  // Register Users
app.post('/login', loginUser);  // Login into account user


// Notes Routes setup
app.get('/getBinNotes', getBinNotes);  // Fetch all notes
app.get('/notes', getAllNotes);  // Fetch all notes
app.post('/create', createNote);  // Create a new note
app.delete('/delete/:id', deleteNote);  // Delete note 
app.post('/update/:id', updateNote); // Updating a note
app.post('/bin/:id', MoveToBin); // Updating a note
app.post('/restore/:id', RestoreNote); // Updating a note
app.get('/note/:slug', GetOneNote); // Updating a note

// Start the server
app.listen(PORT, (error)=>{
    if(error){
        console.error("Error while using server :: " + error);
    }else{
        console.log(`Server is running on - http://localhost:${PORT} `);
    }
});

