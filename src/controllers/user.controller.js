import { json } from 'express';
import {asyncHandler} from '../utils/asyncHandler.js';
import {APIerror} from './../utils/APIerror.js';
import {APIresponse} from './../utils/APIresponse.js';
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { userInfo } from 'os';
    const registerUser = asyncHandler(async (req, res) => {
      
      // 1. get user details from frontend
      // [except refreshtoken, history we take all the details]
      // 2. validation of the details, not empty
      // 3. check if the user is already registered: check using username/email

      // 4.a check if avatar is present
      // 4.b upload them to cloudinary
      // check if avatar is uploaded successfully on cloudinary
      // 5. create user object - create entry in DB
      //6. remove password and refresh token from response 
      // 7. check for user creation
      // 8. return the response properly
      // 9. handle errors

      const {username, email, fullname, password} = req.body
      console.log('email: ', email)
      
      if(
        [username, email, fullname, password]
        .some((field)=>
        field?.trim() === "")
      ){
        throw new APIerror(400, "All fields are required")
      } //validation check 
      if(email.includes("@") === false){
        throw new APIerror(400, "Invalid email")
      }

      const existedUser = User.findOne({
        $or:[
          {username},
          {email}
        ]})
        //check if user already exists
        if(existedUser){
          throw new APIerror(409, "Username/email already exists")
        }
        //take the avatar and cover image from the
      const avatarLocalPath = req.files?.avatar[0]?.path;
      const coverImageLocalPath = req.files?.coverImage[0]?.path;

      if(!avatarLocalPath){
        throw new APIerror(400, "Avatar is required")
      }

      //upload the avatar and cover image to cloudinary
      const avatar = await uploadOnCloudinary(avatarLocalPath);
      const coverImage = await uploadOnCloudinary(coverImageLocalPath);

      if(!avatar ){
        throw new APIerror(500, "Avatar file not found.")
      }

      // create user object
     const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        
      });
      // extra DB call
      const createdUser = await User.findById(user._id)
      .select("-password -refreshToken"
    ) // by default all the fields are returned, so we need to remove password and refresh token
    if(!createdUser){
      throw new APIerror(500, "User not created. Error during registration.")
    }

// sending the response
return res.status(201).json(
  new APIresponse(200, createdUser, "User registered successfully")
);
// successfully implemented the registration algorithm

  })
    export {registerUser};