//import required modules 
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Export environment variables using ES Modules
export const environment = {
    PORT: process.env.PORT || 3000, // Default port as a fallback
    MONGOURI: process.env.MONGOURI
};