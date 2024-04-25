import User from "../modal/user.modal.js";
import errorHandler from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const signup = async(req, res, next) => {
    try{
        const { username, email, password } = req.body

        if(!username || !email || !password || username === "" || email === "" || password === ""){
            next(errorHandler(400, "All feilds are required"))
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = new User({
            username, 
            email,
            password: hashedPassword
        })

        await newUser.save()
        res.json("Signup successful")
    }
    catch(err){
        next(err)
    }
}

const signin = async (req, res, next) => {
    const { email, password: inputPassword } = req.body; // Renamed 'password' to 'inputPassword'

    if (!email || !inputPassword || email === "" || inputPassword === "") {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(inputPassword, validUser.password); // Changed 'password' to 'inputPassword'

        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.jwtSecret);

        res.cookie('access-token', token, {
            httpOnly: true
        });

        const { password, ...rest } = validUser._doc;
        res.status(200).json(rest);
    } catch (err) {
        next(err);
    }
};


export { signin, signup }