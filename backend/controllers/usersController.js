// import the note schema 
import User from '../models/usermodel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { environment } from '../config/environment.js'

// Controller to get all notes
export const getUsers = async (req, res) => {
    try {
        let allusers = await User.find().sort({ updatedAt: -1 });
        res.status(200).json(allusers);
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(401).send({ "message": `Error while fetching users :: ${error}` });
    }
};


// Controller to create a new note
export const registerUser = async (req, res) => {
    try {

        let { name, email, password } = req.body;

        let finduser = await User.findOne({ email });

        if(finduser){
            res.send({error: "User already exist", message: `${email} is already registred. Please log in`});
        }else{

        

        let hashPassword = await bcrypt.hash(password, 10)

        let newUser = new User({ "name": name, "email": email, "password": hashPassword });

        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, environment.JWTSECRET);
        res.send({ message: "Successfully create user", token });

    }

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).send({ message: 'Error creating user', error });
    }
};


export const loginUser = async (req, res) =>{
    try{
        let {email, password} = req.body;

        let finduser = await User.findOne({ email });

        if(!finduser){
            res.send({error: "Unknown user.", "message": `${email} is not registred.`})
        }else{

            const isPasswordValid = await bcrypt.compare(password, finduser.password);

            if(!isPasswordValid){
                res.send({error: "incorrect password", message: "Its seems like you entred wrong password"});
            }else{
                const token = jwt.sign({ id: finduser._id }, environment.JWTSECRET);
                res.send({ message: "Logged in!", token });
            }

        }


    }catch(error){
        res.send({error, "message" : "Error while perfoming task"});
    }
}

