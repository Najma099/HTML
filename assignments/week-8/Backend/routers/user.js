import express from "express";
import { Zodmiddleware } from "../middleware/Zodmiddleware";
import { UserSchema, SignInSchema,updateSchema} from "../ZodSchema/userSchema";
import { User } from "../models/User";
import { accessToken,refreshedToken } from "../utils/token";
import { Authmiddleware } from "../middleware/Authmiddleware";
const router = express.Router();


router.post('/signUp', Zodmiddleware(UserSchema), async(req, res) => {
  try{
    const find = await User.find({ username:res.body.username });
    if(find) {
      return res.status(400).send({
        ok: false,
        message: 'Username already exists. Please Enter a different username!'
      });
    }
    const hashedPassword = await bcrypt.hash(res.body.password,10)
    const createdUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    
    const newUser = await User.findById(createdUser._id).select("-password -_id");
    if (!newUser) {
      return res.status(500).json({
        ok: false,
        message: "User was not created",
      });
    }
    res.status().send({
      ok: true,
      message: 'User is created successfully!',
      newUser
    })
  }
  catch(err) {
    console.error("Signup Error:", err);
    return res.status(500).send({
      ok: false,
      message: 'Internal Server Error'
    });
  }
});

router.post('/signin', Zodmiddleware(SignInSchema), async (req, res) => {
  try {
    const existUser = await User.findOne({ username: req.body.username });
    if (!existUser) {
      return res.status(401).send({
        ok: false,
        message: "Invalid credential. Username doesn't exits."
      });
    };
    
    const checkPass = await existUser.checkPassword(req.body.password);
    if (!checkPass) {
      return res.status(401).send({
        ok: false,
        message: "Invalid credential.Incorrect Password."
      });
    };
    
    const accessTokens = accessToken({
      id: existUser._id,
      username: existUser.username
    });
    const refreshedTokens = refreshedToken({
      id: existUser._id,
      username: existUser.username
    });
    existUser.refreshedToken = refreshedTokens;
    await existUser.save();
    
    const options = ({
      httpOnly: true,
      secure: true
    });
    
    res
      .status(200)
      .cookie("accessTokens", accessTokens, options)
      .cookie("refreshedTokens", refreshedTokens, options)
      .send({
        ok: true,
        message: `${existUser.username} logged in successfully`,
        accessToken: accessTokens,
        refreshedToken: refreshedTokens
      })
  }
  catch (err) {
    console.log(`Error in signing up ${err}`)
    res.status(500).send({
      ok: false,
      message: err?.message || "Unexpected error during signin",
      err
    });
  };
});

router.put('/', Authmiddleware, async (req, res) => {
  try {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).send({
        ok: false,
        message: "Invalid input data",
        errors: parsed.error.errors,
      });
    }

    const updatedUser = await User.updateOne(
      { _id: req.user._id },
      { $set: parsed.data }
    );

    if (updatedUser.modifiedCount === 0) {
      return res.status(400).send({
        ok: false,
        message: "No changes were made to the user data",
      });
    }

    res.status(200).send({
      ok: true,
      message: "User data updated successfully!",
    });

  } 
  catch (err) {
    console.error(`Error while updating user info: ${err}`);
    res.status(500).send({
      ok: false,
      message: err.message || "Unexpected error during user update",
    });
  }
});

router.get('/bulk', Authmiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = User.find({
      $or: [
        {
          firstName: {
            "$regex": filter,
            $options: "i"
          }
        },
        {
          secondName: {
            "$regex": filter,
            $options: "i"
          }
        }
      ]
    });
    if (!users) {
      users = await User.find({}).select("username, firstName, lastName");
      
    }
    res.status().json({
      users: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
      }))
    });
  }
  catch (err) {
    
  }
});

