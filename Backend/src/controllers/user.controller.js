import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false });
    return { accessToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong while genarating access and refresh token"
    );
  }
};

const register = asyncHandler(async (req, res) => {
  //  getting the data from the frontend
  const { fullName, email, username, password } = req.body;

  // all fields are required for registering
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All fields are required");
  }

  // finding if the user exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new apiError(409, "User already exists");
  }
  // creating the user
  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
  });

  //   removing the password from the database to secure
  const createdUser = await User.findById(user._id).select("-password ");
  if (!createdUser) {
    throw new apiError(
      500,
      (message = "Something went wrong while creating the user")
    );
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All fields are required");
  }
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new apiError(400, "User does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(401, "Password incorrect");
  }

  const { accessToken } = await generateAccessAndRefreshTokens(user._id);
  const loggedInUser = await User.findById(user._id).select("-password ");

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken },
        "user logged in successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: false,
    path: "/",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new apiResponse(200, {}, "user logged out successfully"));
});
export { register, login, logout };
