//import required modules 
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const MONGODATABASE = process.env.MONGODATABASE;
const MONGOUSERNAME = process.env.MONGOUSERNAME;
const MONGOPASSWORD = process.env.MONGOPASSWORD;

// Export environment variables using ES Modules
export const environment = {
    PORT: process.env.PORT || 3000, // Default port as a fallback
    MONGOURI: `mongodb+srv://${MONGOUSERNAME}:${MONGOPASSWORD}@cluster0.becr9.mongodb.net/${MONGODATABASE}?retryWrites=true&w=majority&appName=Cluster0`
};