// import mongoose module
import mongoose from "mongoose";

// Define the schema
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
);

// Create the user model
const User = mongoose.model("User", UserSchema);

// Export the model as default
export default User;
