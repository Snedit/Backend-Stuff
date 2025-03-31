import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const userSchema = new Schema({

    username : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // this will optimise searching
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // url will be stored (cloudinary)
        required: true,
        
        
        
    },
    coverimage: {
        type: String, // url will be stored (cloudinary)
            
    },
    watchHistory: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ], // url will be stored (cloudinary)
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
     refreshToken:{
        type: String
     }
}, {
    timestamps: true
})
// mongoose hook
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next() // if password is not modified, then move to the next middleware
    }
    this.password = await bcrypt.hash(this.password, 10);
    next()
})//hash password before saving

//check if password is correct
userSchema.methods.isPassCorrect = async function (password){   
    return await bcrypt.compare(password, this.password);
}



// jwt is a bearer token, it is used to authenticate a user. Like a lock and key
/*
    jwt.sign(payload, secret, options)
    payload: data to be signed
    secret: key to sign the data
    options: additional options like expiresIn, algorithm
*/

userSchema.methods.generateAccessToken = function (){
return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname,  
},
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
}
)
} // access token is used to access protected routes

userSchema.methods.generateRefreshToken = function (){
return jwt.sign(

{
    _id: this._id,
      
},
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
}

)


} // refresh token is used to get a new access token when the current one expires


export const User = mongoose.model("User", userSchema);
