import {
    asyncHandler
} from "../utils/asyncHandler.js";
import {
    ApiError
} from "../utils/ApiError.js";
import {
    User
} from "../models/user.model.js";
import {
    uploadOnCloudinary
} from "../utils/cloudinary.js";
import {
    ApiResponse
} from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async (requestAnimationFrame, res) => {
    // get user details from frontend
    // validation in backend - not empty
    // check if the user already exists: username ,email
    // check for images ,check for avatar
    // upload them to cloudinary,avatar
    // create user object - create entry in db
    //remove password and refresh token field from response
    // return response

    // get user details from frontend
    const {
        fullname,
        email,
        username,
        password
    } = req.body;
    console.log("Email : ", email);

    // validation in backend - not empty
    if ([fullname, email, username, password].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required.");
    }

    // check if the user already exists: username ,email
    const existedUser = User.findOne({
        $or: [{
                username,
            },
            {
                email,
            },
        ],
    });
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // check for images ,check for avatar
    console.log(req.files);
    const avatarLocalPath = req.files && req.files.avatar && req.files.avatar[0] ? req.files.avatar[0].path : undefined;
    const coverImageLocalPath = req.files && req.files.coverImage && req.files.coverImage[0] ? req.files.coverImage[0].path : undefined;

    if (!avatarLocalPath) {
        throw ApiError(400, "Avatar file is required.")
    }

    // upload them to cloudinary,avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw ApiError(400, "Avatar file is required.")
    }

    // create user object - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage ? coverImage.url : "",
        email,
        password,
        username: username.toLowerCase()
    })

    //remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw ApiError(500, "Something went wrong while registering the user.")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


});

export {
    registerUser
};